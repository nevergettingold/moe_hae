![header](https://capsule-render.vercel.app/api?text=MO_HAE!&fontAlign=70&desc=PROJECT&descAlign=20)

## 

`지금 뭐해?` 는 활동 공유 플랫폼입니다.

자신의 지금 이 순간을 함께하거나 공유하고 싶어하는 다른 유저와 자유롭게 소통할수 있게 하는 공유 및 소통을

목적으로 두고 있습니다.

지금 이 순간을 업로드하는 것은 다른 커뮤니티에서도 볼 수 있지만,

해당 지금 이 순간을 실시간 댓글 및 커뮤니티 채팅방 개설, 영상공유, 카테고리 등을 통해 

자유롭게 커스트마이징 및 서비스를 이용할 수 있게하는 차별성을 두고 있습니다.

<br/>
<br/>

## 프로젝트 단계 : 1단계 사이트의 기본 베이스 작업단계

현재 진행 할  미니 프로젝트는 `지금 뭐해?` 커뮤니티의 제작 단계 중,  사이트의 기본 베이스 작업을 완성하는 프로젝트 단계입니다.

추후, 채팅방 및 실시간 댓글, 영상공유 등을 통해 지금 이 순간을 담아 공유하는 프로젝트를 진행 할 예정입니다.

<br/>
<br/>

## 프로젝트 구성 및 기능

### 프로젝트 개요

→ 테마 :  활동 공유 플랫폼

→ 목표 : 사이트 서버 및 기본 베이스 골자를 완성하여, 추후 진행될 프로젝트의 그릇을 설계 및 구현

→ 게시판 형식 / 댓글 작성 / 관심 버튼 등등.....

1. 메인페이지 : COMPONENT 헤더, 배너, SWIPER, NOMAL_LIST

a) 헤더 : 현재 모든 페이지 FIXED로 고정. 메인과 서브 property값으로 구분하여 css 적용
   로그인/비로그인시 버튼 노출여부 완성
   반응형 구성 완료 _ 베이스 1280px, 860px, 500px,
   
b) 배너 : 메인페이지의 경우 swiper ~ video로 구성. 서브페이지의 경우 이미지로 구성

c) swiper : 마이페이지와 동일한 형태로 메인페이지 best_list부분 back에서 받아온 데이터로 card형태로 노출
   
d) NOMAL_LIST : nomal_list 부분 back에서 받아온 데이터로 list 형태로 노출

<br/>
<br/>

2. 회원가입 페이지

a) 회원가입 정책 : 아이디(이메일) / 닉네임 (자유) / 비밀번호로 구성
   아이디와 닉네임은 중복확인 필수 적용. 대략적인 유효성 검사 적용(중복확인, 비밀번호일치성)

<br/>
<br/>

3. 로그인 페이지

아이디(이메일)와 비밀번호로 로그인. 로그인 완료시, response : headers를 통해 토큰을 발급 및 쿠키, 세션에 저장

<br/>
<br/>

4. 상세페이지
해당 리스트 or 카드 클릭시 postId

<br/>
<br/>

5. 작성페이지


<br/>
<br/>

6. 수정페이지


<br/>
<br/>

7. 마이페이지

<br/>
<br/>

## 프로젝트 화면단

1.  초기 화면 구성 및 결과화면단
1) 메인화면
<img width="407" alt="Screen Shot 2022-02-12 at 10 05 52 AM" src="https://user-images.githubusercontent.com/65276445/154467809-b3af2011-43a2-4298-84d2-ae3c843f75d7.png">

![메인](https://user-images.githubusercontent.com/65276445/154487030-bb1d2a81-4ffd-4c98-be44-43a723c938ec.jpg)

2) 회원가입 페이지
<img width="400" alt="Screen Shot 2022-02-12 at 9 58 58 AM" src="https://user-images.githubusercontent.com/65276445/154468316-899da4ff-343b-4edf-b855-dbc0dd3e3b0c.png">

![회원](https://user-images.githubusercontent.com/65276445/154487092-31c0dea1-8286-4524-8154-d7195447e295.jpg)


3) 로그인 페이지
<img width="402" alt="Screen Shot 2022-02-12 at 9 59 02 AM" src="https://user-images.githubusercontent.com/65276445/154468361-a8b593d6-d1a6-45ee-9a61-af2e5a03ef03.png">

![로그인](https://user-images.githubusercontent.com/65276445/154487103-612d96cc-e783-4cc7-8830-a26a80136f85.jpg)

4) 글 작성/수정 페이지
<img width="402" alt="Screen Shot 2022-02-12 at 9 59 07 AM" src="https://user-images.githubusercontent.com/65276445/154468398-b02edda1-53fb-42ad-b284-989089557d1d.png">

![작성](https://user-images.githubusercontent.com/65276445/154487121-b7927375-bb44-4157-bf2e-77feb1b89b57.jpg)

![수정](https://user-images.githubusercontent.com/65276445/154487130-ec0ed028-d7e3-4b0a-8258-85c34b73325c.jpg)

5) 마이페이지
<img width="402" alt="Screen Shot 2022-02-12 at 10 06 23 AM" src="https://user-images.githubusercontent.com/65276445/154468448-9eda57d1-04e4-4339-9341-10c95db6665f.png">

![마이](https://user-images.githubusercontent.com/65276445/154487142-a74c95be-90d8-4e70-94dc-48d8d88308be.jpg)

6) 디테일 페이지
<img width="396" alt="Screen Shot 2022-02-12 at 10 08 52 AM" src="https://user-images.githubusercontent.com/65276445/154468562-63fba632-7f46-4a3f-bbc3-2f3894459326.png">

![상세](https://user-images.githubusercontent.com/65276445/154487159-6a046f5e-1a9c-40e1-b7e9-522e25b0a87e.jpg)


<br/>
<br/>


## API
