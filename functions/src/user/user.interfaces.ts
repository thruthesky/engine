
/**
 * `category` is not saved in post doc. It's saved in the relation.
 */
export interface UserRequestData {
    [keys: string]: string;
    /// 사용자 정보 생성, 수정을 할 때에 속성은 `photoURL` 이고, 글/코멘트에는 `photoUrl` 로 기록된다.
    /// 대소문자가 서로 다른데, 이것은 Firebase 의 공식 예제에서도 서로 다르게 사용되어서 그에 따른 것이다.
    photoURL: string;
}
