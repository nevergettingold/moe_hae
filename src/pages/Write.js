import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

/* Source */
import Upload from "../shared/Upload";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreator as imgActions } from "../redux/modules/image";

/* Componenet */
import { Title, WrongPage } from "../components/component";

/* Elements */
import { Btn, Input } from "../elements/element";

const Write = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const nickname = useSelector((state) => state.user.user?.nickname);
  const userId = useSelector((state) => state.user.user?.userId);
  const post_list = useSelector((state) => state.post.post_list);
  const isLogin = useSelector((state) => state.user.is_Login);
  const preview = useSelector((state) => state.image?.preview);

  const postId = params.id;
  const is_edit = postId ? true : false;
  //let idx = post_list.findIndex((a) => parseInt(a.postId) === parseInt(postId));
  //const post = post_list[idx];
  const _post = is_edit
    ? post_list.find((p) => parseInt(p.postId) === parseInt(postId))
    : null;

  const [title, setTitle] = React.useState(_post ? _post.title : "");
  const [contents, setContents] = React.useState(_post ? _post.content : "");

  React.useLayoutEffect(() => {
    if (!isLogin) {
      return;
    }

    if (is_edit && !_post) {
      dispatch(postActions.getOnePostFB(postId));
      return;
    }

    if (is_edit && _post) {
      dispatch(imgActions.setPreview(_post.imageUrl));
      setTitle(_post.title);
      setContents(_post.content);
    }
  }, [_post, isLogin]);

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeContent = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    if (!title) {
      alert("제목을 작성해주세요! :)");
      return;
    }

    if (!contents) {
      alert("게시글을 작성해주세요! :)");
      return;
    }

    dispatch(postActions.addPostFB(title, contents, preview));
  };

  const editPost = () => {
    dispatch(
      postActions.editPostFB(postId, { title: title, contents: contents })
    );
  };

  // const deletePost = () => {
  //   dispatch(postActions.deletePostFB(postId));
  // };

  if (!isLogin) {
    return <WrongPage />;
  }
  return (
    <Form>
      <div className="write-head">
        <h3>{is_edit ? "게시글 수정" : "게시글 작성"}</h3>
      </div>
      <WritePreview>
        <div className="detail-wrap">
          <h3 className="detail-title">{title}</h3>
          <div className="detail-title-sub">
            <div className="detail-sub-info">
              <div className="detail-writer">
                <span>by.</span>
                <span>{_post?.nickname ? _post?.nickname : nickname}</span>
              </div>
              <div className="detail-date">
                {_post ? _post?.createdAt.slice(0, 10) : "yy-mm-dd hh-mm"}
              </div>
            </div>
          </div>
          <div className="detail-image">
            <img
              src={
                preview
                  ? preview
                  : "https://firebasestorage.googleapis.com/v0/b/project-week3-9a157.appspot.com/o/images%2Fpicture.svg?alt=media&token=45418417-5864-4e67-a034-9f790ceab4e6"
              }
              alt="test"
            />
          </div>
          <div className="detail-contents">{contents}</div>
        </div>
      </WritePreview>
      <div className="write-content">
        <label>
          <Input
            placeholder="제목을 작성해주세요"
            _onChange={changeTitle}
            value={title}
            width="100%"
          />
        </label>
        <textarea
          onChange={changeContent}
          placeholder="내용을 작성해주세요."
          value={contents}
        ></textarea>
      </div>
      <div className="upload-img">
        <Upload />
      </div>
      <div className="write-foot">
        {is_edit ? (
          <Btn border={true} text={"수정 완료"} _click={editPost} />
        ) : (
          <Btn border={true} text={"작성 완료"} _click={addPost} />
        )}
      </div>
    </Form>
  );
};
const Form = styled.div`
  padding: 3rem 14rem;
  .write-head {
    margin-bottom: 4rem;
    padding: 0 0.5rem 2rem;
    border-bottom: 1px solid #dddddd;
    h3 {
      font-size: 2.4rem;
      font-weight: 500;
      span {
        strong {
          font-size: 3.2rem;
          font-weight: 900;
        }
      }
    }
  }
  .write-content {
    margin-bottom: 1rem;
    label + textarea {
      margin-top: 1rem;
    }
    textarea {
      border-radius: 0.5rem;
      padding: 1rem;
      width: 100%;
      height: 15rem;
    }
  }
  .upload-img {
    margin-bottom: 3rem;
    display: inline-block;
    text-align: left;
  }
  .write-foot {
    display: flex;
    justify-content: center;
    button {
      border-radius: 0.5rem;
    }
  }
  @media screen and (max-width: 1280px) {
    padding: 3rem 4rem;
    width: 100%;
    transition: 0.3s;
  }
`;
const WritePreview = styled.div`
  .detail-wrap {
    margin-bottom: 4rem;
    .detail-title {
      margin-bottom: 2rem;
      font-size: 3.2rem;
      font-weight: 700;
    }
    .detail-title-sub {
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .detail-sub-info {
        display: flex;
        align-items: center;
        color: rgba(0, 0, 0, 0.44);
        .detail-writer {
          display: flex;
          align-items: center;
          span {
            &:first-child {
              margin-right: 0.6rem;
              font-size: 1.2rem;
            }
          }
          &:after {
            content: "";
            margin: 0 1rem;
            display: block;
            width: 1px;
            height: 1.6rem;
            background-color: rgba(0, 0, 0, 0.44);
          }
        }
      }
    }
    .detail-image {
      margin-bottom: 2rem;
    }
    .detail-contents {
      padding: 1.4rem;
      min-height: 20rem;
      border: 1px solid #e2e2e2;
      border-radius: 0.5rem;
    }
  }
  // display: flex;
  // position: relative;
  // margin-bottom: 3rem;
  // border: 1px solid #dddddd;
  // flex-direction: column;
  // .preview-img {
  //   padding: 2rem;
  //   width: 100%;
  //   border-bottom: 1px solid #dddddd;
  //   img {
  //     width: 100%;
  //   }
  // }
  // .preview-text {
  //   padding: 2rem;
  //   p {
  //     text-align: left;
  //     overflow-y: scroll;
  //     text-overflow: ellipsis;
  //     word-break: break-all;
  //     max-height: 40rem;
  //   }
  // }
`;
export default Write;
