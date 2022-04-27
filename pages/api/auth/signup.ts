import db from "../../../utilsServer/dbConnect";
import User from "../../../models/User";
import {signupValidation} from "../../../utilsServer/validations";
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcrypt";
import axios from "axios";

async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method==="POST"){
        try {
            // validation
            const {error} = signupValidation(req.body);
            if(error) return res.status(400).json({message:error.details[0].message});

            await db.connect();
            const {name, email, username, gender, password} = req.body;
            // check if email is unique
            const emailExist = await User.findOne({ email: email });
            if (emailExist) return res.status(400).json({message:"此Email已註冊帳號。"});

            const newUser = new User({
                name,
                username,
                email,
                password:bcrypt.hashSync(password,10),
            });
            if(gender) newUser.gender = gender;

                await newUser.save();
                await db.disconnect();
                res.status(201).json({message:"User created"});
        } 
        catch (error) {
            if(axios.isAxiosError(error)){
                await db.disconnect();
                return res.status(500).json({message:error.response?.data});
            }
            res.status(500).json({message:"Server error"});
        }
    }
}

export default handler;