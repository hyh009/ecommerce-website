import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { tabletBig, mobile } from "../responsive";
import { CloudUpload } from "@mui/icons-material";

const getColor = (props) => {
  if (props.isDragActive) {
    return "#ffa122";
  }

  if (props.isDragReject) {
    return "#ff1744";
  }

  return "#eeeeee";
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  letter-spacing: 2px;
  height: 300px;
  font-size: 4vmin;
  user-select: none;
  .small {
    font-size: 3vmin;
  }
`;

const CustomCloudUpload = styled(CloudUpload)`
  &.css-i4bv87-MuiSvgIcon-root {
    font-size: 8vmin;
  }
`;

const ImageDropzone = ({ images, setImages }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (images.length + acceptedFiles.length > 6)
      return window.alert("產品照片不能超過6張");
    // Do something with the files
    acceptedFiles.forEach((file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      // check file size
      reader.addEventListener("loadend", () => {
        const fileSize = (file.size / (1024 * 1024)).toFixed(4);

        if (fileSize > 10) {
          return window.alert("照片不能超過100mb");
        } else {
          setImages((prev) => [
            ...prev,
            {
              name: file.name,
              type: file.type,
              size: file.size,
              src: reader.result,
            },
          ]);
        }
      });
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: "image/jpeg,image/png,image/jpg",
      onDrop,
      maxFiles: 6,
    });

  return (
    <Container {...getRootProps({ isDragReject, isDragActive })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p style={{ textAlign: "center" }}>將圖片放置於此</p>
      ) : (
        <>
          <CustomCloudUpload />
          <p style={{ textAlign: "center" }}>
            拖曳圖片至此 或 點擊選擇上傳圖片(最多6張)
          </p>
          <em style={{ textAlign: "center" }} className="small">
            僅接受.jepg .jpg .png 檔案(大小100mb內)
          </em>
        </>
      )}
    </Container>
  );
};

export default ImageDropzone;
