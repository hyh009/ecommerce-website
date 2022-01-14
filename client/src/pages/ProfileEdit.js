import { useState, useRef, useEffect } from "react";
import { tabletBig } from "../responsive";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUser } from "../redux/apiCall";
import UserInfo from "../components/UserInfo";
import { Upload } from "@mui/icons-material";
import UserService from "../services/user.service";
import { Helmet } from "react-helmet";

const Container = styled.div`
  grid-column: 2/6;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  ${tabletBig({ gridColumn: "1/2", gridTemplateColumns: "repeat(1,1fr)" })}
`;

const EditContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const EditPicContainer = styled.form`
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  border-radius: 5px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  input[type="file"] {
    display: none;
  }
`;
const PicTitle = styled.h4`
  letter-spacing: 2px;
  border-bottom: 1px solid lightgray;
  padding: 10px 0;
`;

const PicMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const PicLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  letter-spacing: 2px;
  color: #545454;
  width: max-content;
`;
const PreviewContainer = styled.div`
  width: 100%;
  border: 1px solid lightgray;
  overflow: hidden;
  margin: 10px 0;
  border-radius: 10px;
  position: relative;
  &::after {
    content: "請稍候";
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    color: white;
    display: ${(props) => (props.updatingPic ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    letter-spacing: 2px;
    font-size: 5vmin;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const Preview = styled.img`
  width: 100%;
  object-fit: cover;
`;
const EditInfoContainer = styled.form`
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  border-radius: 5px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  border-bottom: 2px dashed lightgray;
  padding: 10px 0;
  margin-bottom: 10px;
`;
const EditTitle = styled.span`
  letter-spacing: 2px;
  font-weight: bold;
`;
const Subtitle = styled.ul`
  color: gray;
  padding: 0;
  font-size: 14px;
  padding: 5px;
  letter-spacing: 2px;
  background-color: #fff9e8;
  border-radius: 5px;
  margin: 5px 0;
  color: black;
`;
const ListItem = styled.li`
  list-style-type: none;
  font-size: 14px;
  padding: 10px 0;
  display: grid;
  grid-template-columns: 1fr 4fr;
  align-items: center;
  letter-spacing: 1px;
  border-bottom: 1px dotted lightgray;
  gap: 5px;
  svg {
    font-size: 20px;
    path {
      color: black;
    }
  }
`;
const Label = styled.label`
  width: 100%;
`;
const Input = styled.input`
  border: none;
  padding: 5px 2px;
  width: 100%;
`;
const Error = styled.span`
  font-size: 2.5vmin;
  color: red;
  background-color: lightpink;
  padding: 2px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;
`;
const Submit = styled.button`
  background-color: #ffa122;
  height: max-content;
  padding: 2px 5px;
  border: none;
  border-radius: 10px;
  letter-spacing: 2px;
  cursor: pointer;
  margin: 10px 0;
  align-self: flex-end;
`;

const ProfileEdit = () => {
  const user = useSelector((state) => state.user.currentUser);
  const userIsFetching = useSelector((state) => state.user.isFetching);
  const accessToken = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();

  const editRef = useRef(null);

  const [joiError, setJoiError] = useState("");
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [updatingPic, setUpdatingPic] = useState(false);

  const handlePreview = (e) => {
    const acceptFileTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!acceptFileTypes.includes(e.target.files[0].type)) {
      return window.alert("不支援此檔案格式。(可上傳.png .jpg .jepg檔)");
    }
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener("loadend", () => {
      const fileSize = (e.target.files[0].size / (1024 * 1024)).toFixed(4);

      if (fileSize > 10) {
        return window.alert("照片不能超過100mb");
        //or resize image
      } else {
        setUploadImage({
          name: e.target.files[0].name,
          type: e.target.files[0].type,
          size: e.target.files[0].size,
          src: reader.result,
        });
      }
    });
  };

  const handleUploadPic = async (e) => {
    e.preventDefault();
    setUpdatingPic(true);
    try {
      const res = await UserService.uploadImage(
        uploadImage.src,
        user._id,
        accessToken
      );
      const newImg = { _id: user._id, img: res.data };
      const newUser = await updateUser(dispatch, newImg, accessToken);
      if (newUser[0]) {
        setUpdatingPic(false);
        setUploadImage(null);
        window.scrollTo(0, 0);
        window.alert("照片更新成功");
      }
    } catch (err) {
      setUploadImage(null);
      setUpdatingPic(false);
      window.alert("照片上傳失敗，請稍後再試");
      console.log(err);
    }
  };
  useEffect(() => {
    if (showEditInfo && editRef?.current) {
      editRef.current.scrollIntoView();
    } else if (!showEditInfo) {
      window.scrollTo(0, 0);
    }
  }, [showEditInfo]);

  // use hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // submit form => updateduser function return [data, err]
  const onSubmit = async (input) => {
    const updateduser = await updateUser(
      dispatch,
      { _id: user._id, ...input },
      accessToken
    );
    if (updateduser[0]) {
      window.alert("用戶資訊更新成功");
      setJoiError("");
      window.scrollTo(0, 0);
      setShowEditInfo(false);
    } else {
      if (updateduser[1]) {
        setJoiError(updateduser[1]);
      } else {
        window.alert("資訊尚未更新，請稍後再試");
        reset();
        setShowEditInfo(false);
      }
    }
  };

  return (
    <Container>
      <Helmet>
        <title>{`編輯用戶資訊 | 墊一店`}</title>
        <meta name="description" content="用戶頁面，查看用戶資訊。"></meta>
      </Helmet>
      <UserInfo
        edit={true}
        showEditInfo={showEditInfo}
        setShowEditInfo={setShowEditInfo}
      />
      <EditContainer>
        <EditPicContainer style={{ display: showEditInfo ? "none" : "flex" }}>
          <PicTitle>上傳用戶照片</PicTitle>
          <PicMain>
            {uploadImage ? (
              <>
                <PreviewContainer updatingPic={updatingPic}>
                  <Preview src={uploadImage?.src} alt={uploadImage?.name} />
                </PreviewContainer>
                <ButtonContainer>
                  <Submit
                    disabled={userIsFetching}
                    onClick={(e) => {
                      e.preventDefault();
                      setUploadImage(null);
                    }}
                  >
                    取消上傳
                  </Submit>
                  <Submit disabled={userIsFetching} onClick={handleUploadPic}>
                    {userIsFetching ? "上傳中" : "確定上傳"}
                  </Submit>
                </ButtonContainer>
              </>
            ) : (
              <PreviewContainer>
                <Preview
                  src="https://res.cloudinary.com/dh2splieo/image/upload/v1641917614/shop_website/imgs/undraw_photograph_re_up3b_1_vgvzxk.svg"
                  alt="上傳變更用戶圖片"
                />
              </PreviewContainer>
            )}
            <PicLabel
              style={{ display: uploadImage ? "none" : "flex" }}
              htmlfor="photo"
            >
              <Upload />
              點擊上傳
              <input
                type="file"
                name="photo"
                id="photo"
                onChange={handlePreview}
              />
            </PicLabel>
          </PicMain>
        </EditPicContainer>
        <EditInfoContainer
          style={{ display: showEditInfo ? "flex" : "none" }}
          onSubmit={handleSubmit(onSubmit)}
          ref={editRef}
        >
          <Header>
            <EditTitle>編輯</EditTitle>
          </Header>
          <Subtitle>用戶資訊</Subtitle>
          {joiError && <Error>{joiError}</Error>}
          {errors.username && <Error>{errors.username.message}</Error>}
          <ListItem>
            <Label>用戶名稱：</Label>
            <Input
              name="username"
              defaultValue={user.username}
              placeholder={user.username}
              {...register("username", {
                required: "請填入用戶名稱",
                maxLength: { value: 20, message: "用戶名稱不能超過20字" },
                minLength: { value: 2, message: "用戶名稱必須大於2個字" },
              })}
            />
          </ListItem>
          {errors.name && <Error>{errors.name.message}</Error>}
          <ListItem>
            <Label>姓名：</Label>
            <Input
              name="name"
              defaultValue={user.name}
              placeholder={user.name}
              {...register("name", {
                required: "請填入姓名",
                maxLength: { value: 20, message: "姓名不能超過20字" },
                minLength: { value: 2, message: "姓名必須大於2個字" },
              })}
            />
          </ListItem>
          {errors.gender && <Error>{errors.gender.message}</Error>}
          <ListItem>
            <Label>性別：</Label>
            <Input
              name="gender"
              defaultValue={user.gender}
              placeholder={user.gender}
              {...register("gender", {
                required: "請選澤性別",
              })}
            />
          </ListItem>
          <Subtitle>聯絡資訊</Subtitle>
          <ListItem>
            <Label>電話：</Label>
            <Input
              name="phone"
              defaultValue={user.phone || "未填寫"}
              placeholder="09xx-xxx-xxx"
              {...register("phone")}
            />
          </ListItem>
          {errors.email && <Error>{errors.email.message}</Error>}
          <ListItem>
            <Label>電子郵件：</Label>
            <Input
              name="email"
              defaultValue={user.email}
              placeholder={user.email}
              {...register("email", {
                required: "請填入電子郵件",
              })}
            />
          </ListItem>
          <ListItem>
            <Label>地址：</Label>
            <Input
              name="address"
              defaultValue={user.address || "未填寫"}
              placeholder={user.address || "未填寫"}
              {...register("address")}
            />
          </ListItem>
          <ButtonContainer>
            <Submit
              type="reset"
              onClick={(e) => {
                setJoiError("");
                setShowEditInfo(false);
              }}
            >
              取消更改
            </Submit>
            <Submit type="submit">確定更改</Submit>
          </ButtonContainer>
        </EditInfoContainer>
      </EditContainer>
    </Container>
  );
};

export default ProfileEdit;
