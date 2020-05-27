# Engine

* Project name: `Engine`
* License: MIT LICENSE
* Author: JaeHo Song thruthesky@gmail.com

* `Engine` is a headless Firebase backend. With this project you can easily build an app that requires
  * Member registration, profile update and login, logout.
    * And it supports additional functionalities.
      * User profile photo upload
      * Google sign-in.
  * Complete frorum funtionality
    * Post create, update, delete
    * Comment create, update, delete
    * Image uploads
    * And much more.

* `Engine` is designed for building Web apps like PWA or SPA and Mobile apps.

* Since `Engine` runs on `Firebase`, you no longer need to run a server.


## Getting Started

### Overview

You will need to

1. Create a Firebase project
   1. And create a firestore database
   2. Enable Auth signin method
      1. Enable Email/Password
      2. Enable Google Sign-in
      3. Enable Anonymously login
2. Clone or fork `Engine` repository
3. Update `Service Admin SDK Key`
4. Update admin emails on `functions/src/settings.json`
5. Delploy `Functions`


### Details of Installation

* Git fork (or clone) `Engine`
   1. `$ git clone https://github.com/thruthesky/engine`
   2. `$ cd enginf/functions`
   3. `$ npm i`


* Create Firebase Project(or you may use exising project).
* Go to settings > Service account.
  * Generate new private key.
  * Download & save the private key file as `functions/etc/admin-sdk-key.json`. If a file with same name exists, then replace it.
  
* Create `Firebase Clould Firestore`
  * Be careful to choose right location where the majority of your users are for the network speed. See [Firebase production locations](https://firebase.google.com/docs/projects/locations?authuser=0)
  * And set the rules like below
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```
* Create `Firestore Indexes`
   
Collection ID | Field Indexed | Query scope
------------- | ------------- | -----------
post | categories Arrays createdAt Descending | Collection


* Under `Authentication > Sign-in Method`
  * Enable `Email/Password`
  * Enable `Anonymous`
  * Enable `Google`

* (Optional) You may run test. @see `Test` section

* Install `firebase-tools` and login
  * `# npm install -g firebase-tools`
  * `$ firebase login`

* Open `.firebase.rc` and edit `projects` > `default` with your Firebase project id.
* Open `functions/src/settings.ts` and edit `adminEmails`. You may remove existing emails and add your own email to become the admin.

* Publish `Clould Functions`
  * `$ firebase deploy --only functions`

* Create `Storage` Firebase console

* Now, you can proceed to develop your own Application using `Engine`.
  * See the sample Apps.


### Examples

* [Flutter sample client app](https://github.com/thruthesky/clientf) - It is recommended to copy from the sample source code and paste it into your project.

* Coming. Ionic sample client app.

## Support

* `Engine` is an open source. Any one can use it for any purpose.

* If you are having difficulty to run `Engine` or you need an extra functionality that you cannot do it by yourself, please contact thruthesky@gmail.com


## Contributing

If you want to contribute to a project and make it better, your help is very welcome. Contributing is also a great way to learn more about social coding on Github, new technologies and its ecosystems.

* You can create a fork from this Git repo.
* Clone the fork onto your local machine.
* Add original repo(this Git repo) as a remote called `upstream`.
* Be sure to pull `upstream` changes into your local repository from time to time.
* Create a branch to work.
* And your have fixed the code, make a pull request.


## Project Concerns

* `Engine` does as much as it can for client apps. So, client apps will have minimal code and it's good for converting one App platform into another.
  * For instance, if you are building a Fluter app and you want to use Ionic to build PWA, then having minimal code on client apps will reduce a lot of extra works.

* When a document accessed, you pay.
  * For instance, when you get the document of a post, `Engine` needs to read post document and user document to return author name. `Engine` may read more documents to complete necessary data. And it may cause more expense.
  * We will need to consider about it. But let's not worry until it happens. It may be very small amount for a small business.
  * To solve this problem, we may need to save all necessary information like Author name, email when the document is being saved.


* @see [Git Issues](https://github.com/thruthesky/enginf/issues)




## Reference

* [Firestore Guideline](https://firebase.google.com/docs/functions/?authuser=0#implementation_paths)

* [Firebase Cloud Functions - Callbale](https://firebase.google.com/docs/functions/callable)
* [functions.https Backnd Api](https://firebase.google.com/docs/reference/functions/providers_https_?authuser=0)

* [Clould functions getting started](https://firebase.google.com/docs/functions/get-started)

* [https://firebase.google.com/docs/functions](https://firebase.google.com/docs/functions) 
* [Functions Examples](https://github.com/firebase/functions-samples)

## 개발자 가이드

* Every router must return a Promise

* `router.run()` could have no prameters and it can be a Stirng, int, list or map.

* `Engine` error code begins with `engine/...` while `Firebase Auth` error code begins with `auth/...` 

* When you need a type to call `Router.run`, use Generic Type.


## 에러 핸들링

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


## 관리자 지정

* 클라이언트에서 로그인은 `Engine`을 거치지 않고 `Firebase Auth`로 바로 한다. 이 때, 관리자인지 알 수 있는 방은 Custom Claim 을 보고 알 수 있다.

### 슈퍼 관리자 지정

* 가장 막강한 권한을 가진 관리자는 아래와 같이 하면 된다.

1. `funtions/src/settings.ts`의 `EngineSettings.adminEmails` 에 관리자 메일 주소를 지정한다.
2. `firebase deploy --only functions`를 한다.

### 클라이언트에서 관리자인지 아닌지를 확인하기 위해서는

* `user.doc` Function call 을 한 번 해야 한다.
  * 해당 사용자가 관리자이면 `admin: true` 가 된다.

* 관리자 화면을 앱에서 구성한다면, 앱 부팅 초기에 `user.doc`을 한번 업데이트 할 수도 있다.


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



## Test

* Before testing,
  * make sure you have created indexes on Firestore. @see Installation
  * make sure you have created an admin account and two test user accounts and set them properly on `functions/src/settings.json`.
* Run testing by
  * `npm run test`

* You may run test indivisually
  * `npm run test:user`
  * `npm run test:comment`
  * See `package.json` to learn more about it.

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


## 게시판

### 카테고리

* 글 하나에 여러개의 카테고리를 지정 할 수 있다.
* 검색을 할 때, 여러 카테고리를 주어서 검색 할 수 있다.



## Dependency Injections

* 공통적으로 사용되는 루틴을 입력 값에 따라 여러가지 colection 에 적용한다.
  * 예를 들면, `addUrl()`, `removeUrls())` 은 collection 에 상관없이, document reference 가 주어지면, 해당 document 에 값을 저장하거나 뺀다.


### addUrl() & removeUrls()

* 이 함수를 사용하지 않는다.

* 문제: addUrl() 과 removeUrl() 은 그 유용성이 애매하다.
  * 원래는 첨부 파일을 다른 곳에 저장하고, 그 URL 을 넣고 빼고하여 해당 첨부 파일을 불러 올 수 있게하려는 것이었는데,
    * 문제는 글/코멘트/사용자/카테고리 등에서 작성 화면에서 사진 부터 먼저 등록하게되는데, 그렇게 되면, Firestore 에 document 자체가 존재하지 않기 때문에, 사실상 쓸모 없다.
  * Engine 에서 필드의 배열에 값이 존재하는지 안하는지 검사를 하기 때문에 편하기는 지만, 위의 문제점이 있다.


* 설명: `user`, `category`, `post`, `comment` 컬렉션 아래에 있는 도큐먼트에 `urls` 필드에 문자 배열로 URL을 저장한다.
  * 이것은 클리이언트에서 Firebase Storage 나 기타 다른 서비스에서 파일을 업로드하고, 그 URL 을 기록 해당 도큐먼트에 추가 할 때 쓸 수 있다.
  * `user` 컬렉션의 사용자 도큐먼트에 URL 을 추가하는 것은 첨부 파일을 어딘가(Firestore 나 기타 저장소)에 저장하고 그 URL 을 추가 또는 뺄 수 있는데, 이는 회원 프로필 사진이 될 수 있다.
  * `post`, `comment` 컬렉션의 글/코멘트 도큐먼트에 URL 을 추가하는 것은 해당 글/코멘트에 첨부 파일을 어딘가(Firestore 나 기타 저장소)에 저장하고 그 URL 을 추가하거나 뺄 수 있다.
  * `category` 에도 추가하거나 뺄 수 있다.

* 참고: `dependency-injections.spec.ts` 에 예제가 있다.


* 개선 해야 할 점
  * user, category, post. comment 외의 collection 에서는 addUrl(), deleteUrl() 을 사용 할 수 없는데, 범용적으로 사용하기 위해서,
  * 서버에서 `addProperty({'collection-key': 'user', 'document-key': 'user-id', 'property': 'files', 'value': [ .... ]);` 또는 `removeProperty({'....'})` 와 같이 하고,
  * 클라이언트에서는 `addUrl()`, `removeUrl()`과 같이 한 다음, 그 안에서 서버의 `addProperty()` 와 `removeProperty()` 를 호출 할 수 있도록 한다.





## Likes & Dislikes 구조

* Sub collection 을 쓰지 않는다. 구조가 복잡해 지는 것을 방지
* likes 폴더에 like 와 dislike 를 같이 넣는다.
* 구조는 아래와 같이 해서 `글ID+사용자ID` 또는 `코멘트ID+사용자ID`로 Document ID 를 만든다.
  * 즉, 글 하나에 중복으로 투표되는 것을 미연에 방지한다.

    likes/`[post_or_comment_id][user_id]`/
      { id: post_or_comment_id, uid: user_id, vote: [like|dislike] }

* 도큐먼트 속성에는
  * id 를 기록해서 글/코멘트 삭제시 같이 삭제 할 수 있도록 한다.
  * user_id 를 두어서, 사용자 별 like 한 정보를 추출 할 수 있도록 한다.
  * vote 속성에는 추천인지 비추천인지 알 수 있도록 한다.

* Likes 를 할 때마다 해당 글/코멘트 도큐먼트의 likes, dislikes 속성에 카운트를 한다.
  * 참고로 1QPS (도큐먼트당 1초에 한번만 업데이트)가 있는데, 어느 정도는 큐를 통해서 처리를 해 준다.