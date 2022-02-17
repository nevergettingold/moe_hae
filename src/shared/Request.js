import axios from "axios";
import { getCookie } from "../shared/Cookie";

const instance = axios.create({
  baseURL: "http://3.34.193.226",
  // "http://3.34.193.226/",
  // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
});

// let token = null;
// if(getCookie("is_login")){
// 	token = getCookie("is_login")
// }
// instance.defaults.headers.common["Authorization"] = token;

export default instance;
