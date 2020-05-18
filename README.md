# 플러터 온라인 스터디

본 Git Repo 는 온라인 스터디를 위한 것입니다. 스터디 참여 방법과 한글로 된 강좌 및 자료를 정리해 놓았습니다.

* 프로젝트 명: EngineF
* Git Repo: [EnginF Github repository](https://github.com/thruthesky/enginf)
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


## 설치

### 요약

1. 파이어베이스 프로젝트를 만들고, (DB 생성, 사용자 추가)
2. 벡앤드 소스 코드를 clone 한 다음,
3. Functions 로 Deploy.


### 설치

1. Firebase 에서 프로젝트를 생성합니다.
   1. Firebase Clould Firestore 데이터베이스를 생성합니다.
   2. Authentication > Sign-in Method > Email/Password, Google, Anonymous Enable 합니다.
2. `firebase-tools` 를 설치하고, firebase 에 로그인을 합니다.
   1. `# npm install -g firebase-tools`
3. Git 에서 Enginf 를 clone 합니다.
   1. `$ git clone https://github.com/thruthesky/enginf`
   2. `$ cd enginf/functions`
   3. `$ npm i`
4. `.firebase.rc` 를 열어서 `projects` > `default` 에 본인의 파이어베이스 프로젝트 아이디를 수정(또는 입력)합니다.
5. `functions/src/settings.ts` 를 열어서, `adminEmails` 배열에 관리자 메일 주소를 추가합니다.
6.  Clould Functions 를 publish 합니다.
   1. `$ firebase deploy --only functions`
7. (옵션) 테스트를 하려면 `## 테스트 항목`을 참고하세요.
8. Firestore 인덱스 생성

```
post collection 의 categories 와 created 필드를 desceding 으로 index 해야 한다.
```


### Typedoc 설치

npm install --global typedoc
npm i -g typescript
typedoc --out docs src



## 백엔드


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

### 인덱싱

기본적으로 `post` collection 에 categories 와 createdAt 이 인덱싱되어져 있다. 다른 방식으로 검색을 할 수 있는데, 이때 인덱싱을 수동으로 추가해 주어야 한다.
예를 들어, createdAt 을 asc 로 검색 하고 싶다면, 클라이언트에서 옵션을 주면 되는데, 인덱싱을 해 주어야 에러가 안난다.


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

## 파이어베이스 Function 코딩 정보

* [https://firebase.google.com/docs/functions?hl=ko](https://firebase.google.com/docs/functions) 모든 정보는 이곳에서 확인 가능
* [파이어베이스 Functions 공식 예제(영문)](https://github.com/firebase/functions-samples)
* [한글: Functions](https://mrbinggrae.tistory.com/8)
* [한글: Functions](https://developer-jp.tistory.com/25)

## Flutter 영문 기본 자료

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://flutter.dev/docs/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://flutter.dev/docs/cookbook)

For help getting started with Flutter, view our
[online documentation](https://flutter.dev/docs), which offers tutorials,
samples, guidance on mobile development, and a full API reference.


## 개발자 가이드

* 모든 router 는 반드시 Promise 를 리턴해야 한다.
* 소스코드에서는 `Enginf` 보다는 그냥 `Engin`이라는 용어를 쓴다. 예) EnginfSettings 대신 EngineSettings 라고 쓴다.

* `router.run()` 에서 입력 값이 없어도 되고, 문자열이어도 되고, 객체이어도 된다. 실제 라우터에서 필요로 하는 값을 전달하면 된다.

* 에러메시지에서 'engin/...' 으로 시작하는 것은 EngineF 에서 자체적으로 발생하는 에러 메시지이다. 'auth/...' 로 시작하는 에러는 Firebase Admin SDK 의 Auth 에서 발생하는 에러이다.

* 카테고리, 게시 글, 코멘트 등 게시판과 관련 된 라우터는 

* `Router.run` 의 data 파라메타 변수에 Generic Type 을 사용한다. 적절하게 사용하면 된다. 다만, 리턴 타입은 Generic 으로 하지 않는다.
  * 리턴 값의 경우 리턴 값을 저장하는 변수에 타입 적용을 하면 된다.


### 에러 핸들링

* 에러 핸들링이 쉽지 않다.
* Cloud Functions 는 `functions.https.HttpError` 클래스를 사용하고, Firebase Admin SDK Auth 에서는 `FirebaseuAuthError` 클래스를 사용한다. 그리고 일반적인 자바스크립트는 `Error` 클래스를 사용한다. 다른 기능 (Firestore 등) 에서는 또 다른 에러 클래스를 사용 할 수 있다.
* 그래서 에러 핸들링을 하는 방법은 `Enginf` 에서 코딩을 할 때, 그냥 자연스럽게 해당 에러를 throw 한다.
  * 즉, `Enginf` 에서는 `Functions` 관련 에러이면 그냥 그 에러를 던진다. 예를 들어 Validation 에 실패를 하면 `throw new Error()` 보다는 `throw new funtions.https.HttpError()` 를 던진다.
  * 그리고 Admin SDK Auth 에서 에러가 나는 것도 그냥 자연스럽게 상위로 던져지게 한다.
  * Firestore 에서도 마찬가지로 에러가 나면 그냥 상위로 던져지게 한다.
* 그리고 `router.run()`에서 이런 각종 에러 클래스를 취합해서 `에러 객체`를 만들어 리턴한다.

예제) 다음은 에러 객체 예제이다.

``` json
{
  error: true,
  code: '에러코드',
  message: '에러메시지'
}
```

즉, Firestore 에러 이건, Firebase Auth 에러 이건, Functions 에러 이건, 그냥 Javascript 에러이건 결과적으로는 위 형태로 클라이언트로 리턴된다.

주의 할 것은 클라이언트로 `throw` 하지만 `return` 한다는 것이다. 즉, 클라이언트에서는 try {} catch {} 할 필요가 없이 리턴된 값에서 .error 속성이 있으면 에러로 인식하면 되는 것이다.

또는 클라이언트에서 꼭 try {} catch {} 가 필요하면 아래의 예제와 같이 클라이언트에서 trhow 를 하면 된다.

예제)

``` dart
var re = await ....functions.cal();
if ( re.error ) throw re;
```

### 에러코드

* defines.ts 를 참고한다.
* 

## 프로토콜



* `route` property 에는 `클래스명.함수명` 과 같이 기록을 한다. 예) `user.register`
* `data` property 에는 route 로 전달하는 데이터이다. 예를 들어 `user.register` 를 호출하면 `data`에는 회원 메일 주소나 비밀번호 등을 입력하면 된다.

* `Router.run()` 프로토콜에서 성공하면 반드시 Object 가 리턴된다. 에러이면 '문자열'이 리턴된다. 즉, 리턴 값이 문자열이면 무조건 에러이다.

기본 에러 예제)

* route 값에 아무런 데이터를 전달하지 않으면, `wrong-class-name` 에러가 나타난다.
* route 값에 함수명이 잘못되면 `wrong-method-name` 에러가 나타난다.



### 회원 관리

#### 로그인

* 클라이언트에서 회원이 로그인을 하였으면, Cloud Functions 에서 자동으로 사용자의 UID 와 Email 을 사용 할 수 있다.
  * 그 값을 `System.auth` 변수에 기록해 놓고, 전체 스크립트에서 사용한다.
  * 테스팅을 할 때에는 `System.auth` 변수에 직접 임의의 값을 집어 넣어 사용자가 로그인을 한 것 처럼 사용 할 수 있다.

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


## 폴더 및 파일 구조

* `init.firebase.ts` 는 파이어베이스를 Admin SDK 로 초기화 한다.
* `helper.ts` 는 도움이 되는 클래스를 모아 놓았다.
* `defines.ts` 는 각종 변수 및 자료를 정의 해 놓았다.
* `index.ts` 는 Functions 시작 함수이다.

### 라우팅

* functions/src 아래에는 여러 폴더가 있는데, 각각의 폴더는 `router`이다.
  * router 에 있는 클래스에는 router 에 꼭 필요한 메소드만 담아야 한다. 다른 함수, 변수, 데이터를 담지 않도록 주의한다.
  * 라우팅에 꼭 필요 없는 것들은 `helper.ts` 클래스로 모은다.



## 테스트

* 테스트를 위해서는 관리자 아이디를 설정하는 것에 추가로 임시 사용자를 Auth 가입하고 `TestSettings.testUserEmail`에 기록해야 한다.

예제) settings.ts 설정 예

```
export const EngineSettings = {
    adminEmails: ['admin@gmail.com', '...'],
};
export const TestSettings = {
    testUserEmail: 'user10@gmail.com',
};
```

* 아래와 같이 실행하면 된다.
```
$ cd functions
$ npm run test
```


## 함수 설명

* docs 폴더를 참고한다.


## 게시판

### 카테고리

* 글 하나에 여러개의 카테고리를 지정 할 수 있다.
* 검색을 할 때, 여러 카테고리를 주어서 검색 할 수 있다.



## Dependency Injections

* 공통적으로 사용되는 루틴을 입력 값에 따라 여러가지 colection 에 적용한다.
  * 예를 들면, `addUrl()`, `removeUrls())` 은 collection 에 상관없이, document reference 가 주어지면, 해당 document 에 값을 저장하거나 뺀다.


### addUrl() & removeUrls()

* `user`, `category`, `post`, `comment` 컬렉션 아래에 있는 도큐먼트에 `urls` 필드에 문자 배열로 URL을 저장한다.
  * 이것은 클리이언트에서 Firebase Storage 나 기타 다른 서비스에서 파일을 업로드하고, 그 URL 을 기록 해당 도큐먼트에 추가 할 때 쓸 수 있다.
  * `user` 컬렉션의 사용자 도큐먼트에 URL 을 추가하는 것은 첨부 파일을 어딘가(Firestore 나 기타 저장소)에 저장하고 그 URL 을 추가 또는 뺄 수 있는데, 이는 회원 프로필 사진이 될 수 있다.
  * `post`, `comment` 컬렉션의 글/코멘트 도큐먼트에 URL 을 추가하는 것은 해당 글/코멘트에 첨부 파일을 어딘가(Firestore 나 기타 저장소)에 저장하고 그 URL 을 추가하거나 뺄 수 있다.
  * `category` 에도 추가하거나 뺄 수 있다.