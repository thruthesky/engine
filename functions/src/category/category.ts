// import { admin } from "../init.firebase";
// import { USER_NOT_EXIST, EMAIL_NOT_PROVIDED, PASSWORD_NOT_PROVIDED, INPUT_NOT_PROVIDED } from "../defines";


import { PERMISSION_DEFINED } from '../defines';
import { isAdmin } from '../helpers/global-functions';


export class Category {

    /**
     * Create a category
     *
     * `data` can have more properties to save as user information.
     * 
     * @param data object
     * 
     * @example open `user.spec.ts` to see more examples.
     * 
     */
    async create(data: any) {
        try {
            if (!isAdmin()) {
                // console.log('goint to throw', PERMISSION_DEFINED);
                throw new Error(PERMISSION_DEFINED);
            }
        } catch (e) {
            // console.log('got & rethrow', e.message);
            throw e;
        }
    }
}

