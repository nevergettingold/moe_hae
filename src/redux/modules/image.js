import { createAction, handleActions } from "redux-actions";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../shared/firebase";
import instance from "../../shared/Request";
import { produce } from "immer";

// actions
const UPLODING = "UPLODING";
const UPLOAD_IMG = "UPLOAD_IMG";
const SET_PREVIEW = "SET_PREVIEW";

// action creators
const uploading = createAction(UPLODING, (uploading) => ({ uploading }));
const uploadImg = createAction(UPLOAD_IMG, (image) => ({ image }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// initialState
const initialState = {
  image: "",
  uploading: false,
  preview: null,
};

const uploadImgFB = (image) => {
  return async function (dispatch, getState) {
    instance
      .post(
        "/db", // 미리 약속한 주소
        { list: "test" } // 서버가 필요로 하는 데이터를 넘겨주고,
        // {headers: { 'Authorization': '내 토큰 보내주기' },} // 누가 요청했는 지 알려줍니다. (config에서 해요!)
      )
      .then(function (response) {
        console.log(response);
        dispatch(uploading(true));
        dispatch(uploadImg(image))
          .then(() => {
            console.log("이미지 업로드 완료");
          })
          .catch((error) => {
            console.log("이미지 업로드 오류", error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
// const uploadImgFB = (image) => {
//     return async function(dispatch, getState){
//         dispatch(uploading(true));

//         const _upload = ref(storage, `images/${image.name}`);
//         const upload = uploadBytesResumable(_upload, image)
//         .then((snapshot) => {
//             //console.log(snapshot);
//             console.log("이미지 업로드 완료");
//             getDownloadURL(snapshot.ref).then((url) => {
//                 dispatch(uploadImg(url));
//                 console.log(url);
//             })
//         })
//     }
// }
const deleteImgFB = (image) => {
  return async function (dispatch, getState) {
    const _deleteImg = ref(storage, `images/${image}`);
    const deleteImg = deleteObject(_deleteImg)
      .then(() => {
        console.log("이미지 삭제완료");
      })
      .catch((error) => {
        console.log("이미지 삭제오류", error);
      });
  };
};

//reducer
export default handleActions(
  {
    [UPLOAD_IMG]: (state, action) =>
      produce(state, (draft) => {
        draft.image = action.payload.image;
        draft.uploading = false;
        console.log(draft.image);
      }),
    [UPLODING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreator = {
  uploadImg,
  uploadImgFB,
  setPreview,
  deleteImgFB,
};

export { actionCreator };
