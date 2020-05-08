// import { admin } from "../init.firebase";
// import { USER_NOT_EXIST, EMAIL_NOT_PROVIDED, PASSWORD_NOT_PROVIDED, INPUT_NOT_PROVIDED } from "../defines";

import { UserAuth } from "../defines";
import { Settings } from "../helpers/global-functions";



export class System {

    static auth: UserAuth = {} as any;

    /**
     * Returns admin emails in array.
     */
    async adminEmails(data: any, uid: string): Promise<Array<String>> {
        return Settings.adminEmails;
    }
}
