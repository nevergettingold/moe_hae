import React from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

/* Source */
import { getCookie } from "../shared/Cookie";
import { actionCreator as userActions } from "../redux/modules/user";
import { ReactComponent as Bar } from "../svg/bars.svg";
import { ReactComponent as Xmark } from "../svg/xmark.svg";

/* Element */
import { Btn } from "../elements/element";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useLocation();
  const is_Login = useSelector((state) => state.user.is_Login);
  const cookie = getCookie("is_login");
  //const session_key = sessionStorage.getItem(cookie)
  const is_token = cookie ? true : false;
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  function toggleClass() {
    document.getElementById("toggle").classList.toggle("active");
  }
  function removeToggle() {
    document.getElementById("toggle").classList.remove("active");
  }

  React.useEffect(() => {
    window.addEventListener("scroll", debounce(updateScroll, 0));
    return () => window.removeEventListener("scroll", updateScroll);
  });

  return (
    <StyleHeader
      type={params.pathname === "/" ? "main" : "sub"}
      className={scrollPosition < 200 ? "" : "header-change"}
    >
      <div className="header-top">
        <div className="header-logo">
          <a href="/">
            <h2>
              <strong>M</strong>
              <span>o.</span>HAE
            </h2>
          </a>
        </div>
        <button onClick={toggleClass} className="header-toggle">
          <Bar />
        </button>
      </div>
      <div id="toggle" className="header-bottom">
        <div className="btn-group">
          {(() => {
            if (is_Login && is_token) {
              return (
                <React.Fragment>
                  <Btn
                    _click={() => {
                      navigate("/write");
                      removeToggle();
                    }}
                    text={"Write"}
                  />
                  <Btn
                    _click={() => {
                      navigate("/mypage");
                      removeToggle();
                    }}
                    text={"My Page"}
                  />
                  <Btn
                    _click={() => dispatch(userActions.logoutFB())}
                    text={"Logout"}
                  />
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment>
                  <Btn
                    _click={() => {
                      navigate("/login");
                      removeToggle();
                    }}
                    text={"Login"}
                  />
                  <Btn
                    _click={() => {
                      navigate("/signup");
                      removeToggle();
                    }}
                    text={"Sign up"}
                  />
                </React.Fragment>
              );
            }
          })()}
        </div>
        <button onClick={toggleClass} className="remove-toggle">
          <Xmark />
        </button>
      </div>
    </StyleHeader>
  );
};
const StyleHeader = styled.header`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  padding: 1.5rem 0.5rem 1rem 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dddddd;
  background-color: ${(props) =>
    props.type === "main" ? "transparent;" : "#ffffff;"};
  transition: 0.3s;

  .header-top {
    position: relative;
    display: flex;
    justify-content: center;
    .header-logo {
      font-size: 2rem;
      line-height: 6rem;
      h2 {
        color: ${(props) => (props.type === "main" ? "#ffffff;" : "#000000;")}
          strong {
          margin: 0;
          font-size: 6rem;
          font-weight: 900;
          letter-spacing: 0.2rem;
        }
        span {
          margin: 0 0.2rem;
        }
      }
    }
    .header-toggle {
      display: none;
    }
  }

  .header-bottom {
    transition: 0.3s;
    position: absolute;
    right: 2%;
    bottom: 10%;
    display: flex;
    justify-content: flex-end;
    .remove-toggle {
      display: none;
    }
    .btn-group {
      button + button {
        margin-left: 1rem;
      }
      button {
        transition: width linear 1s 1s;
        position: relative;
        border: 0;
        color: ${(props) => (props.type === "main" ? "#ffffff;" : "#000000;")};
        ${(props) =>
          props.type === "main"
            ? css`
                &:hover:after {
                  position: absolute;
                  bottom: 0.3rem;
                  left: 50%;
                  transform: translateX(-50%);
                  content: "";
                  width: 80%;
                  height: 1px;
                  background-color: #ffffff;
                  transition: width linear 1s 1s;
                }
              `
            : css`
                &:hover {
                  transition: 0.5s;
                }
                &:hover:after {
                  position: absolute;
                  bottom: 0.3rem;
                  left: 50%;
                  transform: translateX(-50%);
                  content: "";
                  width: 80%;
                  height: 1px;
                  background-color: #000000;
                  transition: 0.5s;
                }
              `}
      }
    }
  }

  &.header-change {
    transition: 0.3s;
    background-color: #ffffff;
    .header-top {
      .header-logo {
        h2 {
          color: #000000;
        }
      }
    }
    .header-bottom {
      button {
        color: #000000;
        &:hover:after {
          background-color: #000000;
        }
      }
    }
  }
  @media screen and (max-width: 856px) {
    padding-bottom: 0;
    .header-top {
      .header-logo {
        font-size: 2rem;
        line-height: 6rem;
        h2 {
          strong {
            font-size: 6rem;
            letter-spacing: 0.2rem;
          }
          span {
            margin: 0 0.2rem;
          }
        }
      }
      .header-toggle {
        display: inline-block;
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
        border: 0;
        svg {
          width: 2.4rem;
          height: 2.4rem;
          path {
            fill: ${(props) =>
              props.type === "main" ? "#ffffff;" : "#000000;"};
          }
        }
      }
    }
    .header-bottom.active {
      display: flex;
    }
    .header-bottom {
      display: none;
      top: 0;
      right: 0;
      width: 50vw;
      height: 100vh;
      background-color: #ffffff;
      .remove-toggle {
        position: absolute;
        top: 1rem;
        right: 1rem;
        display: inline-block;
        border: 0;
        svg {
          width: 3rem;
          height: 3rem;
        }
      }
      .btn-group {
        padding: 5rem 2rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        button + button {
          margin-top: 1rem;
          margin-left: 0rem;
        }
        button {
          position: relative;
          border: 0;
          color: #000000;
          &:hover:after {
            background-color: #000000;
          }
        }
      }
    }
    &.header-change {
      .header-top {
        .header-toggle {
          svg {
            path {
              fill: #000000;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    .header-bottom {
      width: 100vw;
      .remove-toggle {
        position: absolute;
        top: 1rem;
        right: 1rem;
        display: inline-block;
      }
      .btn-group {
        padding: 5rem 5rem;
        button + button {
          margin-top: 2rem;
        }
      }
    }
  }
`;

export default Header;
