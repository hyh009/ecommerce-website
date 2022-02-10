import { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Upload,
  ClearTwoTone,
  DeleteOutlineTwoTone,
  Title,
  Description,
  Category,
  CircleNotifications,
  Palette,
  ImagesearchRoller,
  Sell,
  SettingsBackupRestoreTwoTone,
  Inventory2,
  ImageSearch,
} from "@mui/icons-material";
import {
  AdminProductEditA,
  AdminProductEditB,
  AdminChart,
} from "../components";
import OrderService from "../services/order.service.js";
import ProductService from "../services/product.service.js";
import { updatePartialProduct } from "../redux/apiCall.js";
import { tabletBig } from "../responsive";

const Container = styled.div`
  grid-column: 2/6;
  padding: 20px;
  ${tabletBig({
    minHeight: "calc(100vh - 80px)",
    gridColumn: "1/2",
    marginTop: "10px",
  })}
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PageTitle = styled.h3`
  font-size: 22px;
  letter-spacing: 2px;
  color: black;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  ${tabletBig({
    flexDirection: "column",
  })}
`;
const InfoContainer = styled.div`
  flex: 1;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  padding: 20px;
  border-radius: 5px;
`;

const ProductInfo = styled.div``;
const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Sub = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const EditButton = styled.button`
  background-color: teal;
  border: none;
  color: white;
  font-size: 14px;
  padding: 2px 5px;
  border-radius: 5px;
  cursor: pointer;
  letter-spacing: 2px;
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const ProductImg = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 10px;
`;
const ProductName = styled.span`
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 16px;
`;
const CreatedDate = styled.span`
  color: gray;
  font-size: 14px;
`;
const Subtitle = styled.ul`
  color: gray;
  padding: 0;
  font-size: 14px;
  padding: 10px 0;
  letter-spacing: 1px;
`;
const ListItem = styled.li`
  list-style-type: none;
  font-size: 14px;
  padding: 10px 0;
  display: flex;
  align-items: flex-start;
  letter-spacing: 1px;
  svg {
    font-size: 20px;
    path {
      color: black;
    }
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Content = styled.span`
  margin-left: 10px;
`;

const EditContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const ImageContainer = styled.div`
  padding: 20px;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: 1fr;
  ${tabletBig({
    gridTemplateColumns: "repeat(2, 1fr)",
  })}
`;
const SingleImgContainer = styled.div`
  background-color: #eee;
  display: flex;
  align-items: center;
  border-radius: 10px;
  position: relative;
`;

const DelIconContainer = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border: none;
  padding: 0;

  cursor: pointer;
  svg {
    background-color: black;
    path {
      color: white;
    }
  }
`;

const GalleryImg = styled.img`
  object-fit: cover;
  overflow: hidden;
  width: calc(100%);
  border-radius: 10px;
`;

const DelFilter = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  letter-spacing: 2px;
`;

const ImageTitle = styled.h4`
  letter-spacing: 2px;
  font-weight: normal;
  font-size: 16px;
`;
const ImageIconContainer = styled.div`
  display: flex;
  align-items: center;
`;
const LabelFile = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  input[type="file"] {
    display: none;
  }
`;
const FileContainer = styled.div`
  display: flex;
  margin-left: 10px;
  align-items: center;
  svg {
    font-size: 20px;
    cursor: pointer;
  }
`;

const PreviewImg = styled.img`
  width: 35px;
  aspect-ratio: 4/3;
  object-fit: "cover";
  overflow: "hidden";
  margin-right: 10px;
`;

const AdminProduct = () => {
  const [popA, setPopA] = useState(false);
  const [popB, setPopB] = useState(false);
  const [pStats, setPStats] = useState([]);
  const [enableDelImg, setEnableDelImg] = useState(false);
  const [file, setFile] = useState(null);
  const [previewFile, setPreviewFile] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const imgRef = useRef(null);
  const editARef = useRef(null);
  const editBRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const [year, setYear] = useState(new Date().getFullYear());
  const productId = location.pathname.split("/")[3];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const accessToken = useSelector((state) => state.user.accessToken);
  const acceptFileTypes = ["image/jpg", "image/jpeg", "image/png"];
  const initTepDel = () => {
    const result = Array(6).fill(false);
    return result;
  };

  const [tepDelImg, setTepDelImg] = useState(initTepDel()); // true false
  const [delImg, setDelImg] = useState([]); // img _id
  const MONTHS = useMemo(
    () =>
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ].map((month) => ({
        name: month,
      })),
    []
  );

  useEffect(() => {
    const getPStats = async () => {
      try {
        const res = await OrderService.getSales(product._id, year, accessToken);
        if (res.data.length > 0) {
          res.data.map((item) =>
            setPStats(() =>
              MONTHS.map(
                (row, index) =>
                  (item._id - 1 === index &&
                    Object.assign(row, { Sales: item.total })) ||
                  Object.assign(row, { Sales: 0 })
              )
            )
          );
        } else {
          setPStats(() =>
            MONTHS.map((name) => Object.assign(name, { Sales: 0 }))
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    getPStats();
  }, [MONTHS, product, year]);

  const handleTepDel = (e, index, mode) => {
    if (mode === "del") {
      let newArr = [...tepDelImg];
      newArr[index] = true;
      setTepDelImg(newArr);
    } else if (mode === "recov") {
      let newArr = [...tepDelImg];
      newArr[index] = false;
      setTepDelImg(newArr);
    }
  };
  const fileUpload = (e) => {
    if (!acceptFileTypes.includes(e.target.files[0].type)) {
      return window.alert("不支援此檔案格式。(可上傳.png .jpg .jepg檔)");
    }
    if (product.imgs.length >= 6) {
      return window.alert("圖片已達上限");
    } else {
      const uploadFile = e.target.files[0];
      setFile(uploadFile);
      createPreview(uploadFile);
    }
  };

  const createPreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewFile(reader.result);
    };
  };

  const handleUploadImg = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    const fileName = file.name;
    const res = await ProductService.uploadImage(
      previewFile,
      product.imagePath,
      fileName,
      accessToken
    );
    const newImgs = [
      ...product.imgs,
      { src: res.data, desc: fileName.split("-")[0] },
    ];
    updatePartialProduct(productId, { imgs: newImgs }, dispatch, accessToken);
    setIsFetching(false);
    setFile();
    setPreviewFile("");
  };

  const handleDeleteImg = () => {
    setIsFetching(true);
    const newImgs = product.imgs.filter((img) => !delImg.includes(img._id));
    window.confirm("確定要刪除照片嗎？") &&
      updatePartialProduct(productId, { imgs: newImgs }, dispatch, accessToken);
    setEnableDelImg(false);
    setTepDelImg(initTepDel());
    setIsFetching(false);
  };

  return (
    <Container>
      <TopContainer>
        <PageTitle>編輯產品</PageTitle>
      </TopContainer>
      <Wrapper>
        <InfoContainer>
          <ProductInfo>
            <Header>
              <ProductImg src={product.imgs[0]?.src} />
              <Detail>
                <ProductName>{product.name}</ProductName>
                <CreatedDate>
                  創建日期：{product.createdAt.split("T")[0]}
                  <br />
                  上次更新：{product.updatedAt?.split("T")[0] || "no data"}
                </CreatedDate>
              </Detail>
            </Header>
            <Sub>
              <Subtitle>產品資訊</Subtitle>
              <EditButton
                onClick={() => {
                  if (popB) {
                    if (window.confirm("更新尚未儲存，是否關閉？")) {
                      setPopB(() => false);
                    } else {
                      return;
                    }
                  }
                  setPopA(() => true);
                }}
              >
                編輯
              </EditButton>
            </Sub>
            <ListItem>
              <Title />
              <Content>{product.title}</Content>
            </ListItem>
            <ListItem>
              <Description />
              <Content>{product.desc}</Content>
            </ListItem>
            <ListItem>
              <Category />
              <Content>{product.categories}</Content>
            </ListItem>
            <Subtitle>產品管理</Subtitle>
            <ListItem>
              <Inventory2 />
              <Content>{product.inStock ? "有" : "無"}</Content>
            </ListItem>
            <ListItem>
              <ImageSearch />
              <Content>{product.imagePath}</Content>
            </ListItem>

            <Sub>
              <Subtitle>產品規格</Subtitle>
              <EditButton
                onClick={() => {
                  if (popA) {
                    if (window.confirm("更新尚未儲存，是否關閉？")) {
                      setPopA(() => false);
                    } else {
                      return;
                    }
                  }
                  setPopB(() => true);
                }}
              >
                編輯
              </EditButton>
            </Sub>
            <ListItem>
              <Palette />
              <Content>
                {product.colors.map((color) => color.name).join("、") || "無"}
              </Content>
            </ListItem>
            <ListItem>
              <ImagesearchRoller />
              <Content>{product.patterns.join("、") || "無"}</Content>
            </ListItem>
            <ListItem>
              <Sell />
              <Content>{product.price}</Content>
            </ListItem>
            <ListItem>
              <CircleNotifications />
              <Column>
                {product.notice.length > 0 &&
                  product.notice.map((notice, index) => (
                    <Content key={index}>
                      {`${(index + 1).toString()}.${notice}`}
                    </Content>
                  ))}
              </Column>
            </ListItem>
          </ProductInfo>
        </InfoContainer>

        <EditContainer>
          <AdminProductEditA
            product={product}
            pop={popA}
            setPop={setPopA}
            productId={productId}
            editRef={editARef}
          />
          <AdminProductEditB
            product={product}
            pop={popB}
            setPop={setPopB}
            productId={productId}
            editRef={editBRef}
          />
          <AdminChart
            data={pStats}
            title="年度銷售狀況"
            dataKey="Sales"
            margin="0"
            year={year}
            setYear={setYear}
          />
          <ImageContainer>
            <Sub>
              <ImageTitle>產品照片</ImageTitle>
              <ImageIconContainer>
                <EditButton
                  style={{
                    display: enableDelImg ? "inline-block" : "none",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setEnableDelImg((prev) => !prev);
                    setTepDelImg(() => initTepDel());
                    setDelImg([]);
                  }}
                >
                  取消刪除
                </EditButton>
                <EditButton
                  style={{
                    display: enableDelImg ? "inline-block" : "none",
                    marginLeft: "10px",
                  }}
                  onClick={handleDeleteImg}
                  disabled={isFetching}
                >
                  {isFetching ? "刪除中" : "確定刪除"}
                </EditButton>

                <DeleteOutlineTwoTone
                  style={{
                    cursor: "pointer",
                    display: enableDelImg
                      ? "none"
                      : Boolean(file)
                      ? "none"
                      : "inline-block",
                  }}
                  onClick={() => setEnableDelImg((prev) => !prev)}
                />
                <LabelFile>
                  <input
                    type="file"
                    onChange={(e) => {
                      fileUpload(e);
                    }}
                    disabled={enableDelImg}
                  />
                  <Upload
                    style={{
                      cursor: "pointer",
                      marginLeft: "10px",
                      display: file
                        ? "none"
                        : enableDelImg
                        ? "none"
                        : "inline-block",
                    }}
                  />
                </LabelFile>
                <FileContainer>
                  {previewFile && <PreviewImg src={previewFile} alt="upload" />}
                  <span style={{ fontSize: "14px" }}>{file?.name}</span>
                  <ClearTwoTone
                    style={{
                      display: Boolean(file) ? "inline-block" : "none",
                    }}
                    onClick={() => {
                      setFile();
                      setPreviewFile("");
                    }}
                  />
                </FileContainer>
                <EditButton
                  style={{
                    display: Boolean(file) ? "inline-block" : "none",
                    marginLeft: "10px",
                  }}
                  onClick={handleUploadImg}
                  disabled={isFetching}
                >
                  {isFetching ? "上傳中" : "上傳圖片"}
                </EditButton>
              </ImageIconContainer>
            </Sub>
            <GalleryContainer ref={imgRef}>
              {product?.imgs?.map((img, index) => (
                <SingleImgContainer key={img._id} id={img._id}>
                  <GalleryImg
                    src={img.src}
                    alt={img.desc}
                    style={{
                      filter: enableDelImg ? "brightness(80%)" : "none",
                    }}
                  />
                  <DelFilter
                    style={{ display: tepDelImg[index] ? "flex" : "none" }}
                  >
                    已選擇
                  </DelFilter>
                  <DelIconContainer
                    style={{
                      display: enableDelImg ? "inline-block" : "none",
                    }}
                    index={index}
                  >
                    <ClearTwoTone
                      onClick={(e) => {
                        handleTepDel(e, index, "del");
                        setDelImg((prev) => [...prev, img._id]);
                      }}
                      style={{
                        display: tepDelImg[index] ? "none" : "inline-block",
                      }}
                    />
                    <SettingsBackupRestoreTwoTone
                      onClick={(e) => {
                        handleTepDel(e, index, "recov");
                        setDelImg(() =>
                          delImg.filter((imgId) => imgId !== img._id)
                        );
                      }}
                      style={{
                        display: tepDelImg[index] ? "inline-block" : "none",
                      }}
                    />
                  </DelIconContainer>
                </SingleImgContainer>
              ))}
            </GalleryContainer>
          </ImageContainer>
        </EditContainer>
      </Wrapper>
    </Container>
  );
};

export default AdminProduct;
