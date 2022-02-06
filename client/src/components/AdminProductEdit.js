import {
  Title,
  Description,
  Category,
  CircleNotifications,
  Palette,
  ImagesearchRoller,
  Sell,
  Add,
  AbcTwoTone,
  ClearTwoTone,
  SettingsBackupRestoreTwoTone,
} from "@mui/icons-material";
import styled from "styled-components";
import {
  AdminColorInput,
  AdminPatternInput,
  AdminNoticeInput,
} from "./AdminExtraInput.js";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePartialProduct } from "../redux/apiCall";

const PopContainer = styled.div`
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  padding: 20px;
  border-radius: 5px;
  display: ${(props) => (props.pop === "show" && "flex") || "none"};
  flex-direction: column;
  position: absolute;
  top: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: ${(props) =>
    (props.update === "true" && "black") || "white"};
`;

const EditTitle = styled.h4`
  letter-spacing: 2px;
  margin-bottom: 10px;
`;

const EditArea = styled.form`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  span {
    color: red;
  }
  svg {
    font-size: 20px;
    margin-right: 5px;
  }
`;
const AddItemContainer = styled.div`
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  span {
    color: red;
  }
  svg {
    font-size: 20px;
    margin-right: 5px;
  }
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  padding: 2px;
  letter-spacing: 1px;
  width: 100%;
  :hover {
    background-color: #eee;
  }
`;

const Select = styled.select`
  padding: 2px;
  border: none;
  border-bottom: 1px solid gray;
  :hover {
    background-color: #eee;
  }
`;

const Color = styled.div`
  background-color: ${(props) => props.color || "black"};
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid lightgray;
  color: white;
  text-shadow: 0px 0px 3px #000000;
  margin: 5px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  svg {
    font-size: 14px;
    margin-left: 10px;
    border-radius: 50%;
    cursor: pointer;
    background-color: white;
  }
`;

const Block = styled.div`
  display: flex;
  gap: 10px;
  font-size: 16px;
  flex-wrap: wrap;
`;

const Counter = styled.div`
  font-size: 12px;
  color: gray;
  align-self: flex-end;
`;

const TextArea = styled.textarea`
  resize: none;
  overflow-y: scroll;
  overflow-x: hidden;
  :hover {
    background-color: #eee;
  }
`;

const NoticeContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  svg {
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid lightgray;
    background-color: black;
    path {
      color: white;
    }
  }
`;

const CustomClearTwoTone = styled(ClearTwoTone)`
  color: gray;
`;

const CustomAdd = styled(Add)`
  font-size: 20px;
  margin-left: 10px;
  border: 1px solid lightgray;
  border-radius: 50%;
  cursor: pointer;
  path {
    color: gray;
  }
`;
const TempAddContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TempText = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: red;
  padding: 5px;
`;
const ConfirmButton = styled.button`
  border-radius: 10px;
  background-color: teal;
  color: white;
  border: none;
  letter-spacing: 2px;
  padding: 5px;
  align-self: center;
  cursor: pointer;
`;

const Error = styled.div`
  background-color: pink;
  color: #545454;
  width: 100%;
  border-radius: 10px;
  font-size: 14px;
  color: red;
  letter-spacing: 2px;
  padding: 5px;
`;

export const AdminProductEditA = ({ product, pop, setPop, productId }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const { error, errMessage } = useSelector((state) => state.product);
  const [inputs, setInputs] = useState({});

  const initCounter = {
    title: product.title.length,
    name: product.name.length,
    desc: product.desc.length,
  };
  const [counter, setCounter] = useState(initCounter);
  const [isFetching, setIsFetching] = useState(false);
  const formRef = useRef();

  const handleOnchange = (e) => {
    if (e.target.type === "textarea") {
      setCounter((prev) => {
        return { ...prev, [e.target.id]: e.target.value.length };
      });
    }
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (window.confirm("確定要更新資料嗎？")) {
      setIsFetching(true);
      updatePartialProduct(productId, inputs, dispatch, accessToken);
      setInputs({});
      setPop("hide");
      setIsFetching(false);
    }
  };
  const handleCancelUpdate = (e) => {
    e.preventDefault();
    if (window.confirm("更新尚未儲存，確定要離開嗎？")) {
      setInputs({});
      setPop("hide");
      formRef.current.reset();
      setCounter(initCounter);
    }
  };

  return (
    <PopContainer pop={pop} update={isFetching}>
      <EditTitle>編輯</EditTitle>
      <hr
        style={{
          marginBottom: "20px",
          borderTop: "1px dashed gray",
        }}
      />
      <EditArea ref={formRef}>
        <InputContainer>
          <Label htmlFor="name">
            <AbcTwoTone />
            產品名稱<span>(上限20字)</span>
          </Label>
          <TextArea
            maxLength="20"
            id="name"
            name="name"
            placeholder="請輸入最少3個字"
            onChange={handleOnchange}
            rows="1"
            defaultValue={product.name}
          ></TextArea>
          <Counter id="countername">{`${counter.name}/20`}</Counter>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="title">
            <Title />
            產品標題<span>(上限30字)</span>
          </Label>
          <TextArea
            maxLength="30"
            id="title"
            name="title"
            placeholder="請輸入最少5個字"
            onChange={handleOnchange}
            rows="2"
            defaultValue={product.title}
          ></TextArea>
          <Counter id="countertitle">{`${counter.title}/30`}</Counter>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="desc">
            <Description />
            產品描述<span>(上限150字)</span>
          </Label>
          <TextArea
            maxLength="150"
            id="desc"
            name="desc"
            placeholder="請輸入最少10個字"
            onChange={handleOnchange}
            defaultValue={product.desc}
            rows="3"
          ></TextArea>
          <Counter id="counterdesc">{`${counter.desc}/150`}</Counter>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="category">
            <Category />
            分類
          </Label>
          <Select
            name="categories"
            defaultValue={product.categories}
            onChange={handleOnchange}
          >
            <option>隨你PAD吸管</option>
            <option>矽膠小餐墊</option>
            <option>蜂巢坐靠墊</option>
            <option>環保無痕窗貼</option>
            <option>不倒翁門擋</option>
            <option>其它</option>
          </Select>
        </InputContainer>

        {error && <Error>{errMessage ? errMessage : "發生錯誤！"}</Error>}
      </EditArea>
      <Block style={{ justifyContent: "space-around" }}>
        <ConfirmButton onClick={handleCancelUpdate}>取消更新</ConfirmButton>
        <ConfirmButton onClick={handleUpdate} disabled={isFetching}>
          {(isFetching && "資料更新中") || "確定更新"}
        </ConfirmButton>
      </Block>
    </PopContainer>
  );
};

// EditArea B

export const AdminProductEditB = ({ pop, setPop, productId }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const accessToken = useSelector((state) => state.user.accessToken);
  const { error, errMessage } = useSelector((state) => state.product);
  function getInitInput() {
    return {
      colors: product.colors,
      notice: product.notice,
      patterns: product.patterns,
      price: product.price,
    };
  }
  const [isFetching, setIsFetching] = useState(false);
  const [inputs, setInputs] = useState(getInitInput());
  const initCol = {
    colors: [],
    notice: [],
    patterns: [],
  };
  const [deleteEle, setDeleteEle] = useState(initCol);
  const [showAddInput, setShowAddInput] = useState([false, false, false]);
  const [addInputs, setAddInputs] = useState(initCol);
  const formRef = useRef();
  const noticeRef = useRef([]);
  const patternRef = useRef([]);
  const colorRef = useRef([]);

  useEffect(() => {
    setInputs(getInitInput());
    setAddInputs(initCol);
    setDeleteEle(initCol);
    setShowAddInput([false, false, false]);
    setPop("hide");
  }, [product]);
  const handleData = (e, mode, index, colName, ref) => {
    if (mode === "change") {
      setInputs((prev) => {
        return {
          ...prev,
          [colName]: prev[colName].map(function (content, i) {
            return index === i ? e.target.value : content;
          }),
        };
      });
    } else if (mode === "delete") {
      ref.current[index].children[0].style.display = "none";
      ref.current[index].children[1].style.display = "inline-block";
      ref.current[index].style.textDecoration = "line-through";

      setDeleteEle((prev) => {
        return {
          ...prev,
          [colName]: [...prev[colName], index],
        };
      });
    } else if (mode === "recover") {
      ref.current[index].children[1].style.display = "none";
      ref.current[index].children[0].style.display = "inline-block";
      ref.current[index].style.textDecoration = "none";
      setDeleteEle((prev) => {
        return {
          ...prev,
          [colName]: prev[colName].filter((n) => n !== index),
        };
      });
    } else if (mode === "add") {
    }
  };

  const handlePrice = (e) => {
    setInputs((prev) => {
      return { ...prev, price: e.target.value };
    });
  };
  const handleDelTempData = (e, index, colName) => {
    setAddInputs((prev) => {
      return {
        ...prev,
        [colName]: prev[colName].filter((item, i) => index !== i),
      };
    });
    setInputs((prev) => {
      const originalLen = product[colName].length;
      return {
        ...prev,
        [colName]: prev[colName].filter((item, i) => originalLen + index !== i),
      };
    });
  };
  const handleCancelUpdate = (e) => {
    if (window.confirm("更新尚未儲存，確定要離開嗎？")) {
      setInputs(getInitInput());
      setDeleteEle(initCol);
      setAddInputs(initCol);
      setPop(() => "hide");
      // reset the form
      formRef.current.reset();
      noticeRef.current.forEach((n) => {
        if (n !== null) {
          n.style.textDecoration = "none";
          n.children[0].style.display = "inline-block";
          n.children[1].style.display = "none";
        }
      });
      colorRef.current.forEach((n) => {
        if (n !== null) {
          n.style.textDecoration = "none";
          n.children[0].style.display = "inline-block";
          n.children[1].style.display = "none";
        }
      });
      patternRef.current.forEach((n) => {
        if (n !== null) {
          n.style.textDecoration = "none";
          n.children[0].style.display = "inline-block";
          n.children[1].style.display = "none";
        }
      });
    }
  };
  const handleUpdate = (e) => {
    if (window.confirm("確定要更新資料嗎？")) {
      setIsFetching(true);
      const filterDelete = (colName, data) => {
        return {
          ...data,
          [colName]: data[colName].filter(
            (n, i) => !deleteEle[colName].includes(i)
          ),
        };
      };
      let finalData;
      finalData = filterDelete("notice", inputs);
      finalData = filterDelete("colors", finalData);
      finalData = filterDelete("patterns", finalData);
      updatePartialProduct(productId, finalData, dispatch, accessToken);
      setIsFetching(false);
    }
  };
  return (
    <PopContainer pop={pop}>
      <EditTitle>編輯</EditTitle>
      <hr
        style={{
          marginBottom: "20px",
          borderTop: "1px dashed gray",
        }}
      />
      <EditArea id="reset" ref={formRef}>
        <InputContainer>
          <AddItemContainer>
            <Palette />
            顏色
            <CustomAdd
              style={{ cursor: "pointer" }}
              onClick={() =>
                setShowAddInput((prev) =>
                  prev.map(function (status, index) {
                    return index === 0 ? !status : status;
                  })
                )
              }
            />
            <AdminColorInput
              show={showAddInput[0]}
              setInputs={setInputs}
              setAddInputs={setAddInputs}
            />
          </AddItemContainer>
          {(product?.colors?.length > 0 && (
            <Block>
              {product?.colors?.map((color, index) => (
                <Color
                  key={color._id}
                  id={color._id}
                  color={color.code}
                  ref={(el) => (colorRef.current[index] = el)}
                >
                  {color.name}
                  <CustomClearTwoTone
                    name="colors"
                    onClick={(e) => {
                      handleData(e, "delete", index, "colors", colorRef);
                    }}
                  />
                  <SettingsBackupRestoreTwoTone
                    style={{ cursor: "pointer", display: "none" }}
                    onClick={(e) => {
                      handleData(e, "recover", index, "colors", colorRef);
                    }}
                  />
                </Color>
              ))}
            </Block>
          )) || <Block style={{ fontSize: "16px" }}>無</Block>}
          {addInputs?.colors?.length > 0 && (
            <TempAddContainer>
              <TempText>新增顏色</TempText>
              <Block>
                {addInputs?.colors?.map((color, index) => (
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
            </TempAddContainer>
          )}
        </InputContainer>

        <InputContainer>
          <AddItemContainer>
            <ImagesearchRoller />
            樣式
            <CustomAdd
              style={{ cursor: "pointer" }}
              onClick={() =>
                setShowAddInput((prev) =>
                  prev.map(function (status, index) {
                    return index === 1 ? !status : status;
                  })
                )
              }
            />
            <AdminPatternInput
              show={showAddInput[1]}
              setInputs={setInputs}
              setAddInputs={setAddInputs}
            />
          </AddItemContainer>
          {(product?.patterns?.length > 0 && (
            <Block>
              {product?.patterns?.map((pattern, index) => (
                <Color
                  key={index}
                  id={index}
                  ref={(el) => (patternRef.current[index] = el)}
                >
                  {pattern}
                  <CustomClearTwoTone
                    name="patterns"
                    onClick={(e) => {
                      handleData(e, "delete", index, "patterns", patternRef);
                    }}
                  />
                  <SettingsBackupRestoreTwoTone
                    onClick={(e) => {
                      handleData(e, "recover", index, "patterns", patternRef);
                    }}
                    style={{ cursor: "pointer", display: "none" }}
                  />
                </Color>
              ))}
            </Block>
          )) || <Block style={{ fontSize: "16px" }}>無</Block>}
          {addInputs?.patterns?.length > 0 && (
            <TempAddContainer>
              <TempText>新增樣式</TempText>
              <Block>
                {addInputs?.patterns?.map((pattern, index) => (
                  <Color key={index}>
                    {pattern}
                    <CustomClearTwoTone
                      name="patterns"
                      onClick={(e) => {
                        handleDelTempData(e, index, "patterns");
                      }}
                    />
                  </Color>
                ))}
              </Block>
            </TempAddContainer>
          )}
        </InputContainer>

        <InputContainer>
          <Label htmlFor="price">
            <Sell />
            價格
          </Label>
          <Input
            id="price"
            type="number"
            min="0"
            placeholder={product.price}
            onChange={handlePrice}
          />
        </InputContainer>
        <InputContainer>
          <AddItemContainer>
            <CircleNotifications />
            注意事項<span>(上限30字，5項)</span>
            <CustomAdd
              onClick={() =>
                setShowAddInput((prev) =>
                  prev.map(function (status, index) {
                    return index === 2 ? !status : status;
                  })
                )
              }
            />
          </AddItemContainer>
          <AdminNoticeInput
            show={showAddInput[2]}
            setInputs={setInputs}
            setAddInputs={setAddInputs}
            inputs={inputs}
            deleteEle={deleteEle}
          />
          {product?.notice?.map((n, index) => (
            <NoticeContainer
              key={index}
              ref={(el) => (noticeRef.current[index] = el)}
            >
              <CustomClearTwoTone
                onClick={(e) => {
                  handleData(e, "delete", index, "notice", noticeRef);
                }}
              />
              <SettingsBackupRestoreTwoTone
                onClick={(e) => {
                  handleData(e, "recover", index, "notice", noticeRef);
                }}
                style={{ cursor: "pointer", display: "none" }}
              />

              <Input
                id={`notice${index}`}
                placeholder={n}
                onChange={(e) => {
                  handleData(e, "change", index, "notice");
                }}
                maxLength="25"
                type="text"
                defaultValue={n}
                name="notice"
              />
              {inputs?.notice?.length > 0 && (
                <Counter>{`${inputs?.notice[index]?.length}/25`}</Counter>
              )}
            </NoticeContainer>
          ))}
          {addInputs?.notice?.length > 0 && (
            <TempAddContainer>
              <TempText>新增注意事項</TempText>
              <Block>
                {addInputs?.notice?.map((n, index) => (
                  <Color key={index}>
                    {n}
                    <CustomClearTwoTone
                      name="notice"
                      onClick={(e) => {
                        handleDelTempData(e, index, "notice");
                      }}
                    />
                  </Color>
                ))}
              </Block>
            </TempAddContainer>
          )}
        </InputContainer>
      </EditArea>
      <Block style={{ justifyContent: "space-around" }}>
        <ConfirmButton onClick={handleCancelUpdate}>取消更新</ConfirmButton>
        {isFetching ? (
          <ConfirmButton disabled>更新中</ConfirmButton>
        ) : (
          <ConfirmButton onClick={handleUpdate}>確定更新</ConfirmButton>
        )}
      </Block>
    </PopContainer>
  );
};
