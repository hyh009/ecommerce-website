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
  Inventory2,
  ImageSearch,
} from "@mui/icons-material";
import styled from "styled-components";
import {
  AdminColorInput,
  AdminPatternInput,
  AdminNoticeInput,
} from "./AdminExtraInput.js";
import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePartialProduct } from "../redux/apiCall";
import { tabletBig } from "../responsive";

const PopContainer = styled.div`
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  padding: 20px;
  border-radius: 5px;
  display: ${(props) => (props.pop ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 0;
  z-index: 1;
  min-height: 100%;
  height: max-content;
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
  font-size: 0.875rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  span {
    color: red;
  }
  svg {
    font-size: 1.25rem;
    margin-right: 5px;
  }
`;
const AddItemContainer = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  gap: 10px;
  span {
    color: red;
  }
  svg {
    font-size: 1.25rem;
    margin-right: 5px;
  }
  ${tabletBig({ flexDirection: "column", alignItems: "flex-start" })}
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
  background-color: white;
  :hover {
    background-color: #eee;
  }
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

const Counter = styled.div`
  font-size: 0.75rem;
  color: gray;
  align-self: flex-end;
`;

const TextArea = styled.textarea`
  resize: none;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 80%;
  margin: 5px 0;
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
    font-size: 1.25rem;
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
  font-size: 1.25rem;
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
  font-size: 0.875rem;
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
  font-size: 0.875rem;
  color: red;
  letter-spacing: 2px;
  padding: 5px;
  margin-bottom: 20px;
`;

export const AdminProductEditA = ({
  product,
  pop,
  setPop,
  productId,
  editRef,
}) => {
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
  // scroll to view
  useEffect(() => {
    if (pop && editRef?.current) {
      editRef.current.scrollIntoView();
    } else if (!pop) {
      window.scrollTo(0, 0);
    }
  }, [pop, editRef]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (window.confirm("???????????????????????????")) {
      setIsFetching(true);
      const result = await updatePartialProduct(
        productId,
        inputs,
        dispatch,
        accessToken
      );
      if (result[0]) {
        setInputs({});
        setPop(false);
        setIsFetching(false);
      } else {
        setIsFetching(false);
      }
    }
  };
  const handleCancelUpdate = (e) => {
    e.preventDefault();
    if (window.confirm("??????????????????????????????????????????")) {
      setInputs({});
      setPop(false);
      formRef.current.reset();
      setCounter(initCounter);
    }
  };

  return (
    <PopContainer pop={pop} update={isFetching} ref={editRef}>
      <EditTitle>??????</EditTitle>
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
            ????????????<span>(??????20???)</span>
          </Label>
          <TextArea
            maxLength="20"
            id="name"
            name="name"
            placeholder="???????????????3??????"
            onChange={handleOnchange}
            rows="1"
            defaultValue={product.name}
            style={{ width: "100%" }}
          ></TextArea>
          <Counter id="countername">{`${counter.name}/20`}</Counter>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="title">
            <Title />
            ????????????<span>(??????30???)</span>
          </Label>
          <TextArea
            maxLength="30"
            id="title"
            name="title"
            placeholder="???????????????5??????"
            onChange={handleOnchange}
            rows="2"
            defaultValue={product.title}
            style={{ width: "100%" }}
          ></TextArea>
          <Counter id="countertitle">{`${counter.title}/30`}</Counter>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="desc">
            <Description />
            ????????????<span>(??????150???)</span>
          </Label>
          <TextArea
            maxLength="150"
            id="desc"
            name="desc"
            placeholder="???????????????10??????"
            onChange={handleOnchange}
            defaultValue={product.desc}
            rows="3"
            style={{ width: "100%" }}
          ></TextArea>
          <Counter id="counterdesc">{`${counter.desc}/150`}</Counter>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="categories">
            <Category />
            ??????
          </Label>
          <Select
            name="categories"
            defaultValue={product.categories}
            onChange={handleOnchange}
          >
            <option>??????PAD??????</option>
            <option>???????????????</option>
            <option>???????????????</option>
            <option>??????????????????</option>
            <option>???????????????</option>
            <option>????????????</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="instock">
            <Inventory2 />
            ??????
          </Label>
          <Select
            name="inStock"
            defaultValue={product.inStock}
            onChange={handleOnchange}
          >
            <option value={true}>???</option>
            <option value={false}>???</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="imagePath">
            <ImageSearch />
            ??????????????????
          </Label>
          <Input
            type="text"
            name="imagePath"
            defaultValue={product.imagePath}
            placeholder="??????shop_website/imgs/placemat/food/"
            onChange={handleOnchange}
          />
        </InputContainer>

        {error && <Error>{errMessage ? errMessage : "???????????????"}</Error>}
      </EditArea>
      <Block style={{ justifyContent: "space-around" }}>
        <ConfirmButton onClick={handleCancelUpdate}>????????????</ConfirmButton>
        <ConfirmButton onClick={handleUpdate} disabled={isFetching}>
          {(isFetching && "???????????????") || "????????????"}
        </ConfirmButton>
      </Block>
    </PopContainer>
  );
};

// EditArea B
const initCol = {
  colors: [],
  notice: [],
  patterns: [],
};

export const AdminProductEditB = ({ pop, setPop, productId, editRef }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const accessToken = useSelector((state) => state.user.accessToken);
  const { error, errMessage } = useSelector((state) => state.product);
  const getInitInput = useCallback(() => {
    return {
      colors: product.colors,
      notice: product.notice,
      patterns: product.patterns,
      price: product.price,
    };
  }, [product]);
  const [isFetching, setIsFetching] = useState(false);
  const [inputs, setInputs] = useState(getInitInput());
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
    setPop(false);
  }, [getInitInput, product, setPop]);

  // scroll to view
  useEffect(() => {
    if (pop && editRef?.current) {
      editRef.current.scrollIntoView();
    } else if (!pop) {
      window.scrollTo(0, 0);
    }
  }, [pop, editRef]);

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
    e.preventDefault();
    if (window.confirm("??????????????????????????????????????????")) {
      setInputs(getInitInput());
      setDeleteEle(initCol);
      setAddInputs(initCol);
      setPop(() => false);
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
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (window.confirm("???????????????????????????")) {
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
      const result = await updatePartialProduct(
        productId,
        finalData,
        dispatch,
        accessToken
      );
      if (result[0]) {
        window.alert("??????????????????");
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
        setIsFetching(false);
      } else {
        window.alert("??????????????????");
      }
    }
  };
  return (
    <PopContainer pop={pop} ref={editRef}>
      <EditTitle>??????</EditTitle>
      <hr
        style={{
          marginBottom: "20px",
          borderTop: "1px dashed gray",
        }}
      />
      <EditArea id="reset" ref={formRef}>
        <InputContainer>
          <AddItemContainer>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Palette />
              ??????
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
            </div>
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
                    style={{
                      cursor: "pointer",
                      display: "none",
                      color: "gray",
                    }}
                    onClick={(e) => {
                      handleData(e, "recover", index, "colors", colorRef);
                    }}
                  />
                </Color>
              ))}
            </Block>
          )) || <Block style={{ fontSize: "1rem" }}>???</Block>}
          {addInputs?.colors?.length > 0 && (
            <TempAddContainer>
              <TempText>????????????</TempText>
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <ImagesearchRoller />
              ??????
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
            </div>
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
                    style={{
                      cursor: "pointer",
                      display: "none",
                      color: "gray",
                    }}
                  />
                </Color>
              ))}
            </Block>
          )) || <Block style={{ fontSize: "1rem" }}>???</Block>}
          {addInputs?.patterns?.length > 0 && (
            <TempAddContainer>
              <TempText>????????????</TempText>
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
            ??????
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <CircleNotifications />
              ????????????<span>(??????35??????5???)</span>
              <CustomAdd
                onClick={() =>
                  setShowAddInput((prev) =>
                    prev.map(function (status, index) {
                      return index === 2 ? !status : status;
                    })
                  )
                }
              />
            </div>
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
                style={{ cursor: "pointer", display: "none", color: "gray" }}
              />

              <TextArea
                maxLength="35"
                minLength="5"
                id={`notice${index}`}
                name="notice"
                placeholder="???????????????5??????"
                onChange={(e) => {
                  handleData(e, "change", index, "notice");
                }}
                rows="2"
                defaultValue={n}
              ></TextArea>
              {inputs?.notice?.length > 0 && (
                <Counter>{`${inputs?.notice[index]?.length}/30`}</Counter>
              )}
            </NoticeContainer>
          ))}
          {addInputs?.notice?.length > 0 && (
            <TempAddContainer>
              <TempText>??????????????????</TempText>
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
        {error && <Error>{errMessage ? errMessage : "???????????????"}</Error>}
      </EditArea>
      <Block style={{ justifyContent: "space-around", margin: "10px 0" }}>
        <ConfirmButton onClick={handleCancelUpdate}>????????????</ConfirmButton>
        {isFetching ? (
          <ConfirmButton disabled>?????????</ConfirmButton>
        ) : (
          <ConfirmButton onClick={handleUpdate}>????????????</ConfirmButton>
        )}
      </Block>
    </PopContainer>
  );
};
