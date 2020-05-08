export const WRONG_CLASS_NAME = 'engin/wrong-class-name';
export const WRONG_METHOD_NAME = 'engin/wrong-method-name';
export const USER_CREATE_FAILED = 'engin/user-create-failed';
export const USER_NOT_EXIST = 'engin/user-not-exist';
export const AUTH_EMAIL_ALREADY_EXISTS = 'auth/email-already-exists';
export const AUTH_INVALID_PHONE_NUMBER = 'auth/invalid-phone-number';
export const AUTH_PHONE_NUMBER_ALREADY_EXISTS = 'auth/phone-number-already-exists';

export const INPUT_NOT_PROVIDED = 'engin/input-data-is-not-provided';
export const EMAIL_NOT_PROVIDED = 'engin/email-is-not-provided';
export const PASSWORD_NOT_PROVIDED = 'engin/password-is-not-provided';

export const PERMISSION_DEFINED = 'engin/permission-denied';


export interface UserAuth {
    email: string | undefined;
    uid: string | undefined;
};
