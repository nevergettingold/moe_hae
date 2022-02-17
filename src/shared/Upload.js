import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

/* Source */
import { actionCreator as imgActions } from "../redux/modules/image";

/* Element */
import { Btn } from "../elements/element";

import instance from "../shared/Request";

const Upload = (props) => {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.image.uploading);
  const [fileName, setFileName] = React.useState("선택한 파일이 없습니다");
  const fileInput = React.useRef();

  // const test = instance.get('/db').then((doc)=>{
  //     console.log(doc);
  //     // instance.post('/db', {profile: []})
  // });

  const selectFile = (e) => {
    // console.log(e);
    // console.log(e.target);
    // console.log(e.target.files[0]);
    // console.log(fileInput.current.files[0]);

    const reader = new FileReader();
    const currentFile = fileInput.current.files[0];
    //console.log(currentFile.name);
    setFileName(currentFile.name);
    reader.readAsDataURL(currentFile);

    reader.onloadend = () => {
      //console.log(reader.result)
      dispatch(imgActions.setPreview(reader.result));
      //console.log(fileInput.current.files[0])
    };
  };
  const uploadFB = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("파일을 선택해주세요!");
      return;
    }

    dispatch(imgActions.uploadImgFB(fileInput.current.files[0]));
  };

  return (
    <React.Fragment>
      <StyleUpload>
        <div className="upload-layer">
          <span className="upload-layer-file">{fileName}</span>
          <label>
            <span className="upload-layer-btn">업로드</span>
            <input
              type="file"
              onChange={selectFile}
              ref={fileInput}
              disabled={uploading}
            />
          </label>
        </div>
      </StyleUpload>
      {/* <Btn eventType={"click"} event={uploadFB} text={"업로드하기"}/> */}
    </React.Fragment>
  );
};
const StyleUpload = styled.div`
  .upload-layer {
    display: flex;
    width: 30rem;
    border: 1px solid #dddddd;
    border-radius: 0.5rem;
    .upload-layer-file {
      padding: 1rem;
      flex-basis: calc(100% - 5rem);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    label {
      padding: 1rem;
      flex-basis: 8rem;
      text-align: center;
      border-left: 1px solid #dddddd;
      border-radius: 0 0.5rem 0.5rem 0;
      cursor: pointer;
      &:hover {
        color: #ffffff;
        background-color: #000000;
      }
    }
  }
  input {
    display: none;
    opacity: 0;
  }
`;

export default Upload;
