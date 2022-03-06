import { useState, useEffect } from "react";
import styled from "styled-components";
import { tabletBig, mobile } from "../responsive";
import { ClearTwoTone } from "@mui/icons-material";
import ImageDropzone from "../components/ImageDropzone";
import ProductService from "../services/product.service";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 20px;
  grid-column: 2/6;
  display: flex;
  flex-direction: column;
  gap: 20px;
  ${tabletBig({
    minHeight: "calc(100vh - 80px)",
    gridColumn: "1/2",
    marginTop: "10px",
  })}
`;

const PageTitle = styled.h3`
  font-size: 1.375rem;
  letter-spacing: 2px;
  color: black;
`;

const ProductInfo = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  ${mobile({
    gridTemplateColumns: "repeat(1,1fr)",
    gap: "5px",
  })}
`;

const Session = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  margin: 5px 0;
  flex-direction: column;
  gap: 10px;
`;

const SmallInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-size: 0.875rem;

  &.required:: after {
    content: "*";
    color: red;
  }
`;

const TextArea = styled.textarea`
  resize: none;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  padding: 2px 5px;
  :hover {
    background-color: #eee;
  }
`;

const Input = styled.input`
  padding: 7px 5px;
  letter-spacing: 1px;
  border-radius: 5px;
  border: 1px solid gray;
  width: 80%;
`;

const SmallInput = styled.input`
  padding: 5px;
  letter-spacing: 1px;
  border-radius: 5px;
  border: 1px solid gray;
  width: 50%;
`;

const Select = styled.select`
  padding: 7px 5px;
  letter-spacing: 1px;
  border-radius: 5px;
  border: 1px solid gray;
  background-color: white;
  cursor: pointer;
`;
const Color = styled.div`
  background-color: ${(props) => props.color || "black"};
  padding: 5px 10px;
  font-size: 0.875rem;
  border-radius: 10px;
  border: 1px solid lightgray;
  color: white;
  text-shadow: 0px 0px 3px #000000;
  margin: 5px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    font-size: 0.875rem;
    border-radius: 50%;
    cursor: pointer;
    background-color: white;
  }
`;

const Block = styled.div`
  display: flex;
  gap: 10px;
  font-size: 1rem;
  flex-wrap: wrap;
`;

const Counter = styled.span`
  font-size: 0.75rem;
  color: gray;
  height: 100%;
  margin: 0 5px;
`;

const AddBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: teal;
  letter-spacing: 1px;
  border-radius: 10px;
  padding: 2px 5px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 2.5vmin;
  ${tabletBig({ fontSize: "2vmin" })}
  ${mobile({ fontSize: "4.5vmin" })}
`;
const CustomClearTwoTone = styled(ClearTwoTone)`
  color: gray;
  cursor: pointer;
`;

const Error = styled.span`
  font-size: 2.5vmin;
  color: red;
  background-color: lightpink;
  padding: 2px;
  width: max-content;
`;

const SubTitle = styled.h3`
  font-size: 3vmin;
  letter-spacing: 2px;
  color: black;
  ${mobile({ fontSize: "5vmin" })}
`;

const PreviewContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const ImgContainer = styled.div`
  width: calc(100%);
  overflow: hidden;
  display: flex;
  position: relative;
  padding: 2px;
`;

const PreviewImg = styled.img`
  object-fit: cover;
  width: 100%;
  align-self: center;
`;
const ExText = styled.span`
  color: gray;
  font-size: 2vmin;
  margin: 0 5px;
  ${mobile({ fontSize: "3vmin" })}
`;
const CreateButton = styled.button`
  border: none;
  padding: 5px;
  width: 15vw;
  border-radius: 10px;
  letter-spacing: 2px;
  color: white;
  background-color: teal;
  cursor: pointer;
  align-self: flex-end;
  box-shadow: 1px 5px 0 lightgray;
  &:active {
    box-shadow: 3px 5px 0 white;
    transform: translateY(5px);
  }
  ${mobile({
    width: "100%",
  })}
`;

const AdminNewProduct = () => {
  const initInputs = {
    name: "",
    title: "",
    desc: "",
    categories: "",
    price: null,
    colors: [],
    patterns: [],
    notice: [],
    inStock: true,
    imagePath: "",
  };
  const accessToken = useSelector((state) => state.user.accessToken);
  const [addError, setAddError] = useState("");
  const [inputs, setInputs] = useState(initInputs);
  const [inputColor, setInputColor] = useState({ code: "#FFFFFF", name: "" });
  const [pattern, setPattern] = useState("");
  const [notice, setNotice] = useState([]);
  const [images, setImages] = useState([]);
  const [updatingPic, setUpdatingPic] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    //clear error message after 5 seconds
    let timer = setTimeout(() => setAddError(""), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [addError]);
  // add change to inputs
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // add change to temporary place before clicking add button (colors, patterns, notice)
  const handleNotice = (e) => {
    setNotice(e.target.value);
  };

  const handlePattern = (e) => {
    setPattern(e.target.value);
  };

  const handleColor = (e) => {
    setInputColor({ ...inputColor, [e.target.name]: e.target.value });
  };

  // when click the add button (colors, patterns, notice)
  const handleAdd = (e, col) => {
    if (col === "colors") {
      if (!inputColor.name || !inputColor.code)
        return window.alert("請完整填入顏色資訊(顏色名稱&色號選擇)");
      setInputs((prev) => ({ ...prev, colors: [...prev?.colors, inputColor] }));
      setInputColor({ code: "", name: "" });
    } else if (col === "patterns") {
      if (!pattern) return window.alert("樣式名稱不能為空白");
      setInputs((prev) => ({
        ...prev,
        patterns: [...prev?.patterns, pattern],
      }));
      setPattern("");
    } else if (col === "notice") {
      if (!notice) return window.alert("注意事項不能為空白");
      if (inputs.notice?.length >= 5) return window.alert("注意事項最多5項");
      setInputs((prev) => ({ ...prev, notice: [...prev?.notice, notice] }));
      setNotice("");
    }
  };
  // delete object (colors, patterns, notice, imgs)
  const handleDelTempData = (e, index, colName) => {
    if (colName === "img") {
      setImages((prev) => prev.filter((img, i) => i !== index));
    } else {
      // when colName = patterns, colors, notice
      setInputs((prev) => ({
        ...prev,
        [colName]: prev[colName].filter((item, i) => i !== index),
      }));
    }
  };

  // click add product button
  const handleSubmit = (e) => {
    e.preventDefault();
    // simple validation
    if (
      !inputs.title ||
      !inputs.desc ||
      !inputs.name ||
      !inputs.categories ||
      !inputs.imagePath ||
      !inputs.inStock
    ) {
      return window.alert("請完整填寫產品資訊");
    }
    // update images to cloudinary
    setUpdatingPic(true);

    const promises = [];

    for (let i = 0; i < images.length; i++) {
      promises.push(
        ProductService.uploadImage(
          images[i].src,
          inputs.imagePath,
          images[i].name,
          accessToken
        )
      );
    }

    Promise.all(promises)
      .then((arrOfResults) => {
        // get images url successfully
        setUpdating(true);
        setUpdatingPic(false);
        // create new product to DB
        return ProductService.create(
          {
            ...inputs,
            imgs: arrOfResults.map((result) => ({ src: result.data })),
          },
          accessToken
        );
      })
      .then((data) => {
        console.log(data);
        setInputs(initInputs);
        setUpdating(false);
        setImages([]);
        window.alert("產品新增成功");
      })
      .catch((err) => {
        if (err.response?.data) {
          window.alert("產品上傳失敗，請稍候再試");
          setAddError(err.response.data);
          setUpdating(false);
          console.log(err);
        }
      });
  };
  return (
    <Container>
      <PageTitle>新增產品</PageTitle>
      {addError && <Error>{addError}</Error>}
      <ProductInfo>
        <Session>
          <InputContainer>
            <Label htmlFor="name" className="required">
              產品名稱<Counter>{`${inputs?.name?.length || 0}/20`}</Counter>
            </Label>
            <TextArea
              id="name"
              name="name"
              maxLength="20"
              placeholder="輸入產品名稱"
              onChange={handleChange}
              value={inputs.name}
            ></TextArea>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="title" className="required">
              產品標題<Counter>{`${inputs?.title?.length || 0}/30`}</Counter>
            </Label>
            <TextArea
              id="title"
              name="title"
              maxLength="30"
              placeholder="輸入產品標題"
              onChange={handleChange}
              value={inputs.title}
            ></TextArea>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="desc" className="required">
              產品描述<Counter>{`${inputs?.desc?.length || 0}/150`}</Counter>
            </Label>
            <TextArea
              id="desc"
              name="desc"
              maxLength="150"
              placeholder="輸入產品描述"
              onChange={handleChange}
              value={inputs.desc}
            ></TextArea>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="categories" className="required">
              產品分類
            </Label>
            <Select
              id="categories"
              name="categories"
              onChange={handleChange}
              value={inputs.categories}
            >
              <option value="">選擇分類</option>
              <option>隨你配吸管</option>
              <option>矽膠小餐墊</option>
              <option>蜂巢靠座墊</option>
              <option>環保無痕窗貼</option>
              <option>不倒翁門擋</option>
              <option>矽膠鍋墊</option>
            </Select>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="inStock" className="required">
              產品庫存
            </Label>
            <Select
              id="inStock"
              name="inStock"
              defaultValue={inputs.inStock}
              onChange={handleChange}
            >
              <option value={true}>有</option>
              <option value={false}>無</option>
            </Select>
          </InputContainer>
        </Session>
        <Session>
          <InputContainer>
            <Label htmlFor="price" className="required">
              價格
            </Label>
            <SmallInput
              id="price"
              type="number"
              name="price"
              placeholder="輸入價格"
              onChange={handleChange}
              value={inputs.price}
            />
          </InputContainer>
          <InputContainer>
            <Label>
              顏色<ExText>選填</ExText>
            </Label>
            <SmallInputContainer>
              <SmallInput
                type="text"
                name="name"
                placeholder="輸入顏色名稱"
                onChange={handleColor}
                value={inputColor?.name}
              />
              <input
                type="color"
                name="code"
                style={{ height: "90%", padding: "2px 0px" }}
                onChange={handleColor}
                value={inputColor?.code}
              />
              <AddBtn
                onClick={(e) => {
                  handleAdd(e, "colors");
                }}
              >
                新增
              </AddBtn>
            </SmallInputContainer>
            <Block>
              {inputs.colors?.length > 0 &&
                inputs.colors.map((color, index) => (
                  <Color key={index} color={color.code}>
                    {color.name}
                    <CustomClearTwoTone
                      name="colors"
                      onClick={(e) => {
                        handleDelTempData(e, index, "colors");
                      }}
                    />
                  </Color>
                ))}
            </Block>
          </InputContainer>
          <InputContainer>
            <Label>
              樣式<ExText>選填</ExText>
            </Label>
            <SmallInputContainer>
              <SmallInput
                type="text"
                name="pattern"
                placeholder="輸入樣式名稱"
                onChange={handlePattern}
                value={pattern}
              />
              <AddBtn
                onClick={(e) => {
                  handleAdd(e, "patterns");
                }}
              >
                新增
              </AddBtn>
            </SmallInputContainer>
            <Block>
              {inputs.patterns?.length > 0 &&
                inputs.patterns.map((pattern, index) => (
                  <Color key={index}>
                    {pattern}
                    <CustomClearTwoTone
                      name="colors"
                      onClick={(e) => {
                        handleDelTempData(e, index, "patterns");
                      }}
                    />
                  </Color>
                ))}
            </Block>
          </InputContainer>
          <InputContainer>
            <Label>
              注意事項
              <ExText>選填，最多5項</ExText>
              <Counter>{`${notice?.length || 0}/35`}</Counter>
            </Label>
            <SmallInputContainer>
              <Input
                onChange={handleNotice}
                type="text"
                name="notice"
                placeholder="輸入注意事項 最多5項"
                value={notice}
                maxLength="35"
              />
              <AddBtn
                onClick={(e) => {
                  handleAdd(e, "notice");
                }}
              >
                新增
              </AddBtn>
            </SmallInputContainer>
            <Block>
              {inputs.notice?.length > 0 &&
                inputs.notice.map((n, index) => (
                  <Color key={index}>
                    {n}
                    <CustomClearTwoTone
                      name="colors"
                      onClick={(e) => {
                        handleDelTempData(e, index, "notice");
                      }}
                    />
                  </Color>
                ))}
            </Block>
          </InputContainer>
        </Session>
      </ProductInfo>
      <SubTitle>上傳產品照片</SubTitle>
      {images.length < 6 && (
        <ImageDropzone images={images} setImages={setImages} />
      )}
      <PreviewContainer>
        {images?.map((image, index) => (
          <ImgContainer key={index}>
            <CustomClearTwoTone
              style={{ position: "absolute", top: "0", right: "0" }}
              onClick={(e) => {
                handleDelTempData(e, index, "img");
              }}
            />
            <PreviewImg src={image.src} alt={image.name} />
          </ImgContainer>
        ))}
      </PreviewContainer>
      <InputContainer>
        <Label htmlFor="imagePath" className="required">
          圖片儲存路徑
        </Label>
        <ExText>{"格式：shop_website/imgs/{category}/{productName}/"}</ExText>
        <Input
          id="imagePath"
          name="imagePath"
          placeholder="shop_website/imgs/placemat/food/"
          onChange={handleChange}
          style={{ width: "100%" }}
          value={inputs.imagePath}
        />
      </InputContainer>
      <CreateButton onClick={handleSubmit}>
        {updatingPic ? "上傳照片中" : updating ? "資訊上傳中" : "新增產品"}
      </CreateButton>
    </Container>
  );
};

export default AdminNewProduct;
