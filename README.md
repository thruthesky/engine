# 플러터 온라인 스터디

본 Git Repo 는 온라인 스터디를 위한 것입니다. 스터디 참여 방법과 한글로 된 강좌 및 자료를 정리해 놓았습니다.

## 프로젝트 정보

* 프로젝트 명: EngineF
* 프로젝트 설명: 
  * 플러터 공개 프로젝트입니다.
  * Firebase 를 기반으로 하는 완전한 회원 정보 관리 및 게시판 관리(게시판 CRUD, 글 CRUD, 코멘트 CRUD, 파일 업로드 CRUD, 검색) 기능을 만드는 것입니다. 이러한 기능을 완료하면 사실상 Firebase 에서 못할 것이 없다는 증명을 하는 것입니다.

## 프로젝트 인원 모집

아래의 부분에 참여 할 수 있는 분을 모집합니다.

* 문서 전문 작업. 모든 개발자가 자신의 코딩에 대한 설명 문서를 작성해야합니다. 이러한 문서들을 보기 좋게 다듬어 줄 분을 모십니다.
* 세미나 후기 작업. 세미나를 듣고 후기를 작성 하실 분을 모십니다.
* 백엔드 개발자
* 프론트엔드 개발
  * Logic 개발자
  * UI 전문 개발자

## 프로젝트 계획

* Backend 와 Clientend 코드를 완전히 분리하며
* 최대한 많은 작업을 Backend 에서 합니다.
  * 이를 통해서, 플러터 뿐만아니라 Angular/Ionic 이나 다른 프론트엔드에서도 쉽게 활용을 할 수 있게 됩니다.
* Realtime update 가 필요없는 부분은 철저히 Restful Api 로 작업을 합니다.
  * 사실 전 세계의 모든 홈페이지에서 회원관리 및 게시판 CRUD 를 하고 있지만 Realtime update 는 사용하고 있지 않습니다.
  * 괜히 Realtime update 로 시도하다가 이도저도 아닌 엉망진창이 됩니다.

* 각 개발자가 세미나를 통해서 자신의 업무를 설명합니다.

## 해야 할 일

* [Git Issues 참고](https://github.com/thruthesky/enginf/issues)

## 백엔드

* 명칭: EnginF
* Repository: [EnginF Github repository](https://github.com/thruthesky/enginf)
* 많은 코드와 로직을 Functions 에 넣는다.
  * Deassemble 해킹을 통한 로직을 감출 수 있으며
  * 클라이언트에서 문제가 보이는 경우, 서버에 수정을 하면 모든 클라이언트에 적용된다.
* 백엔드에서 자체적인 테스트를 완료한다.


### Firebsae Cloud Functions

* Firebase Cloud Funtions 를 통해서 작업하므로, 그에 대한 설정이 필요하다.
* 먼저 Firebase 프로젝트를 생성한다.
  * 그러면 어떻게 시작하는지 문서를 자연스럽게 찾을 수 있다. [참고: Firestore Guideline](https://firebase.google.com/docs/functions/?authuser=0#implementation_paths)

* 앱에서 Functions 를 실행하기 위해서는 Callbale 함수를 호출하는 것과 HTTP Restful API 접속 방법 두 가지가 있어 보인다.
  * 본 프로젝트에서는 callable 함수를 바로 사용한다.
  * [참고: Firebase Cloud Functions - Callbale](https://firebase.google.com/docs/functions/callable)
  * Callable 함수를 작성하기 위한 functions.https Backnd Api [참고: functions.https 문서] https://firebase.google.com/docs/reference/functions/providers_https_?authuser=0

* 공부자료
  * [처음 시작하는 방법](https://firebase.google.com/docs/functions/get-started). 이 문서를 보고 설정을 하면 됩니다.


### 백엔드 테스트하기

* Emulator 를 실행하고 Shell 로 들어가서 아래와 같이 코딩하면 된다.

```
router({route: 'user.version'})
```

## 클라이언트엔드

* 명칭: ClientF
* Repository: [ClientF Github repository](https://github.com/thruthesky/enginf)
* 플러터로 작업을 한다.

## 해야 할 일

* Git issues 를 참고합니다.



## 플러터 스터디 참여 방법

* [카카오톡 채팅 단체톡방](https://open.kakao.com/o/g20m41Mb)

## Github 작업 참여 방법

* 먼저, 멤버로 초대 요청을 해 주세요.
* 멤버로 초대되면, 자신의 branch 를 만들고, 그 branch 에서 작업을 해 주세요. master branch 에서 작업하지 마세요.
* 자신의 업무가 끝나면 프로젝트 관리자에게 merge 요청을 해 주세요. 즉, 자신이 한 작업을 관리자 허가없이 master merge 하지 말아주세요.

## 동영상 강좌 - 왕초보를 위한 플러터 동영상 강좌 모음

* [오준석의 생존코딩 - 입문편](https://www.youtube.com/watch?v=lRbZsBvG9Ig&list=PLxTmPHxRH3VUueVvEnrP8qxHAP5x9XAPv)
* [오준석의 생존코딩 - 중급편](https://www.youtube.com/watch?v=ei8TX-uqP6E&list=PLxTmPHxRH3VWLY-eyQuV1C_IbIQlCXEhe)
* [코딩셰프의 Flutter 동영상 강좌](https://www.youtube.com/channel/UC_2ge45JCuJH1z6VYt4iCgQ)
* [더코딩파파의 FLutter 동영상 강좌](https://www.youtube.com/channel/UCUH2DSbsNUz2sW3kBNn4ibw)

## 레이아웃 강좌

* [Flutter로 개발하기(27) - 레이아웃 위젯 목록](https://bsscco.github.io/posts/flutter-layout-widgets/)

## 기타 강좌 - 미 분류

* [Dart 와 플러터 강좌](https://bsscco.github.io/posts/)

## Flutter 영문 기본 자료

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://flutter.dev/docs/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://flutter.dev/docs/cookbook)

For help getting started with Flutter, view our
[online documentation](https://flutter.dev/docs), which offers tutorials,
samples, guidance on mobile development, and a full API reference.

## 프로토콜



* `route` property 에는 `클래스명.함수명` 과 같이 기록을 한다. 예) `user.register`
* `data` property 에는 route 로 전달하는 데이터이다. 예를 들어 `user.register` 를 호출하면 `data`에는 회원 메일 주소나 비밀번호 등을 입력하면 된다.

* 프로토콜에서 에러가 나는 경우 `문자열`이 리턴된다. 에러가 나지 않고 성공하면 `문자열`이 아닌 값이 리턴된다. 즉, 리턴 값이 문자열이면 무조건 에러이다.

기본 에러 예제)

* route 값에 아무런 데이터를 전달하지 않으면, `wrong-class-name` 에러가 나타난다.
* route 값에 함수명이 잘못되면 `wrong-method-name` 에러가 나타난다.



### 회원 관리

#### 회원 가입

* route: user.register
* 회원 가입을 하면 기본적으로 Auth 에 계정이 생성되며, Firestore `user` collection 에 UID 를 키로 추가된 값이 저장 됨
* data 에는 email 과 password 는 필수이며 나머지는 얼마든지 추가로 저장 가능.
* `password`, `displayName`, `phoneNumber`, `photoURL` 은 Firestore 에 저장되지 않고 Auth 에만 저장된다. 그래서 클라이언트에서 Auth 로그인을 하면 Email, displayName, phoneNUmber 를 바로 사용 할 수 있다.
* `phoneNumber`는 중복 가입 안되고, 전화번호 형식이 틀리면 에러가 발생한다.
* `phoneNumber`에는 맨 앞 + 기호는 사용 가능하나 중간에 하이픈(-)은 사라진다. 예) `+82-10-1234-5678` 과 같으면 Auth 에 저장 후 값을 불러들이면, `+821012345678`와 같이 변경 된다.

* 에러코드

코드 | 설명
--- | ---
input-data-is-not-provided | 회원 가입 정보를 전달하지 않은 경우
email-is-not-provided | 이메일 주소를 입력하지 않은 경우
password-is-not-provided | 비밀번호를 입력하지 않은 경우
auth/email-already-exists | 동일한 메일 주소가 이미 가입되어져 있는 경우
auth/invalid-phone-number | 전화번호가 잘못된 경우
auth/phone-number-already-exists | 전화번호가 이미 등록되어져 있는 경우

