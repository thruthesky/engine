
import { UserAuth } from "../defines";
import { Settings } from "../helpers/global-functions";



export class System {

    static auth: UserAuth = {} as any;
    static debug = false;

    /**
     * Returns admin emails in array.
     */
    async adminEmails(data: any, uid: string): Promise<Array<String>> {
        return Settings.adminEmails;
    }
}
