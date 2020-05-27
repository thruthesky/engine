export const WRONG_CLASS_NAME = 'engine/wrong-class-name';
export const WRONG_METHOD_NAME = 'engine/wrong-method-name';
export const INVALID_INPUT = 'engine/invalid-input';
export const MISSING_INPUT = 'engine/missing-input';
export const RESULT_IS_NOT_OBJECT = 'engine/result-is-not-object';
export const USER_CREATE_FAILED = 'engine/user-create-failed';


/// Firebase Auth 에 사용자가 존재하지 않는 경우 에러 메시지
export const AUTH_USER_NOT_FOUND = 'auth/user-not-found';

export const AUTH_EMAIL_ALREADY_EXISTS = 'auth/email-already-exists';
export const AUTH_INVALID_PHONE_NUMBER = 'auth/invalid-phone-number';
export const AUTH_INVALID_UID = 'auth/invalid-uid';

export const AUTH_PHONE_NUMBER_ALREADY_EXISTS = 'auth/phone-number-already-exists';

export const INPUT_NOT_PROVIDED = 'engine/input-data-is-not-provided';
export const DOCUMENT_NOT_EXISTS = 'engine/document-not-exists';
export const PROPERTY_NOT_EXISTS = 'engine/property-not-exists';
export const VALUE_NOT_EXISTS = 'engine/value-not-exists';
export const EMAIL_NOT_PROVIDED = 'engine/email-is-not-provided';
export const PASSWORD_NOT_PROVIDED = 'engine/password-is-not-provided';

export const PERMISSION_DEFINED = 'engine/permission-denied';
export const LOGIN_FIRST = 'engine/login-first';



export const INPUT_IS_EMPTY = 'engine/input-is-empty';
export const ID_IS_EMPTY = 'engine/id-is-empty';
export const TITLE_IS_EMPTY = 'engine/title-is-empty';

export const POST_ID_IS_UNDEFINED = 'engine/post-id-is-undefined';
export const POST_NOT_EXISTS = 'engine/post-not-exists';
export const COMMENT_NOT_EXISTS = 'engine/comment-not-exists';
export const CATEGORY_IS_UNDEFINED = 'engine/category-is-undefined';
export const CATEGORY_ALREADY_EXISTS = 'engine/category-already-exists';
export const CATEGORY_NOT_EXISTS = 'engine/category-not-exists';

export const UNDEFINED_FIELD_VALUE = 'engine/undefined-field-value';


export const POST_TITLE_DELETED = 'post-title-deleted';
export const POST_CONTENT_DELETED = 'post-content-deleted';

export const COMMENT_POST_CONTENT_DELETED = 'comment-content-deleted';


export interface UserAuth {
    email: string;
    uid: string;
};

export interface LikeRequest {
    id: string;
    vote: 'like' | 'dislike';
}

export interface LikeResponse {
    /// 글 또는 코멘트 Document ID
    id: string;
    /// 찬성을 했는지 또는 반대를 했는지 표시를 리턴
    vote: 'like' | 'dislike';
    /// 결과를 리턴. 찬성 또는 반대가 되었으면 'voted', 이미 찬성을 했는데 또 찬성을 하면 'cancelled' 가 된다.
    result: 'voted' | 'cancelled';
    /// 총 찬성 수
    likes: number;
    /// 총 반대 수
    dislikes: number;
}