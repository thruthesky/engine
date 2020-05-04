# 플러터 온라인 스터디

본 Git Repo 는 온라인 스터디를 위한 것입니다. 스터디 참여 방법과 한글로 된 강좌 및 자료를 정리해 놓았습니다.

## 프로젝트 정보

* 프로젝트 명: EngineF
* 설명: Firebase 를 기반으로 하는 완전한 회원 정보 관리 및 게시판 관리(게시판 CRUD, 글 CRUD, 코멘트 CRUD, 파일 업로드 CRUD, 검색) 기능을 만드는 것입니다. 이러한 기능을 완료하면 사실상 Firebase 에서 못할 것이 없다는 증명을 하는 것입니다.

## 프로젝트 계획

* Backend 와 Clientend 코드를 완전히 분리하며
* 최대한 많은 작업을 Backend 에서 합니다.
  * 이를 통해서, 플러터 뿐만아니라 Angular/Ionic 이나 다른 프론트엔드에서도 쉽게 활용을 할 수 있게 됩니다.
* Realtime update 가 필요없는 부분은 철저히 Restful Api 로 작업을 합니다.
  * 사실 전 세계의 모든 홈페이지에서 회원관리 및 게시판 CRUD 를 하고 있지만 Realtime update 는 사용하고 있지 않습니다.
  * 괜히 Realtime update 로 시도하다가 이도저도 아닌 엉망진창이 됩니다.

## 해야 할 일

* [Git Issues 참고](https://github.com/thruthesky/enginf/issues)

### 백엔드

* 명칭: EnginF
* Repository: [EnginF Github repository](https://github.com/thruthesky/enginf)
* 많은 코드와 로직을 Functions 에 넣는다.
  * Deassemble 해킹을 통한 로직을 감출 수 있으며
  * 클라이언트에서 문제가 보이는 경우, 서버에 수정을 하면 모든 클라이언트에 적용된다.
* 백엔드에서 자체적인 테스트를 완료한다.


#### Firebsae Cloud Functions

* Firebase Cloud Funtions 를 통해서 작업하므로, 그에 대한 설정이 필요하다.
* 먼저 Firebase 프로젝트를 생성한다.
  * 그러면 어떻게 시작하는지 문서를 자연스럽게 찾을 수 있다. [참고: Firestore Guideline](https://firebase.google.com/docs/functions/?authuser=0#implementation_paths)

* 앱에서 Functions 를 실행하기 위해서는 Callbale 함수를 호출하는 것과 HTTP Restful API 접속 방법 두 가지가 있어 보인다.
  * 본 프로젝트에서는 callable 함수를 바로 사용한다.
  * [참고: Firebase Cloud Functions - Callbale](https://firebase.google.com/docs/functions/callable)
  * Callable 함수를 작성하기 위한 functions.https Backnd Api [참고: functions.https 문서] https://firebase.google.com/docs/reference/functions/providers_https_?authuser=0

* 공부자료
  * [처음 시작하는 방법](https://firebase.google.com/docs/functions/get-started)

### 클라이언트엔드

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

