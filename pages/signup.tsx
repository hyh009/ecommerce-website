import {useState,ReactElement,Dispatch, SetStateAction} from "react";
import { SignupForm } from "../components/Form";
import type { NextLayoutComponentType } from 'next';
import Head from 'next/head'
import {useRouter} from "next/router";
import { createUser } from "../utils/authAction";
import styled from "styled-components";
import { devices } from "../styles/responsive";
import { PAGE_DESC, PAGE_TITLE } from '../utils/headContent';
import { SignupInputsState } from "../types";
import ErrorModal from "../components/Common/Modal/ErrorModal";


export type SignupSubmitHandler = (e:React.FormEvent<HTMLFormElement>, 
                      inputData:SignupInputsState,
                      setLoading:Dispatch<SetStateAction<boolean>>
                      )=>Promise<void>;


const Signup: NextLayoutComponentType = () => {
  const [errorMsg, setErrorMsg] = useState<string|null>(null);
  const router = useRouter();
  const submitHandler:SignupSubmitHandler = async(e, inputData, setLoading):Promise<void>=>{
    e.preventDefault();
    setLoading(true);
    const {success, message} = await createUser(inputData);
    if(success){
      //toasttype notification here
      router.push("/login");
    }else{
      setErrorMsg(message);
    }
    setLoading(false);
  }
  
    return (
      <>
        <Head>
          <title>{PAGE_TITLE.SIGNUP}</title>
          <meta name="description" content={PAGE_DESC.SIGNUP}></meta>
        </Head>
        {errorMsg &&　<ErrorModal errorMsg={errorMsg as string} setErrorMsg={setErrorMsg}/>}
        <Container>
          <SignupForm submitHandler={submitHandler}/>
        </Container>
      </>
    )
  }

export default Signup;

Signup.getLayout = function PageLayout(page:ReactElement) {
  return <>{page}</>;
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(122, 122, 122, 0.5)
    ),
    url("https://res.cloudinary.com/dh2splieo/image/upload/v1640706201/shop_website/imgs/cover/cover4_rgq8mt.jpg");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position-y: 50%;
  @media ${devices.tabletL}{
    background-position:center;
  }
`; 