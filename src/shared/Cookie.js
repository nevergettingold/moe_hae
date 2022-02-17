const getCookie = (name) => {
  // 쿠키 값을 가져옵니다.
  let value = "; " + document.cookie;

  // 키 값을 기준으로 파싱합니다.
  let parts = value.split("; " + name + "=");

  // value를 return!
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};
// 쿠키에 저장하는 함수
const setCookie = (cookieName, sessionName, sessionValue, exp = 5) => {
  let date = new Date();
  // 날짜를 만들어줍니다.
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  // 저장!
  document.cookie = `${cookieName}=${sessionValue}; expires=${date.toUTCString()}; path=/`;
  // sessionStorage에 jwt : userId형식으로 저장
  sessionStorage.setItem(sessionName, sessionValue);
};

//세션에 쿠키 저장

// 만료일을 예전으로 설정해 쿠키를 지웁니다.
const deleteCookie = (name) => {
  // 쿠키값에 있는 jwt값 가져온뒤 sessionStorage에서 해당 jwt 제거.
  const cookie = getCookie(name);
  sessionStorage.removeItem(cookie);
  // 만료일을 예전으로 설정해 쿠키를 지웁니다.
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};

export { getCookie, setCookie, deleteCookie };
