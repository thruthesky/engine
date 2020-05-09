import { User } from '../user/user';
import { WRONG_CLASS_NAME, WRONG_METHOD_NAME, RESULT_IS_NOT_OBJECT } from '../defines';
import { System } from '../system/system';
import { Category } from '../category/category';
import { Post } from '../post/post';
import { convertFirebaseErrorIntoJavascriptError } from '../helpers/global-functions';


interface ClassContainer {
    [key: string]: any;
}

export class Router {

    classContainer: ClassContainer = {};
    className = '';
    methodName = '';
    route: string;
    constructor(route: string) {
        this.classContainer['user'] = new User();
        this.classContainer['system'] = new System();
        this.classContainer['category'] = new Category();
        this.classContainer['post'] = new Post();
        this.route = route ?? '';
    }

    /**
     * Runs the class & method.
     * @param data data to pass to the route method.
     * @param uid is the user's UID and this is trustable since it is automatically set by `Cloud Functions`.
     * @example see `user.spect.ts`
     * @note It can be called with `await`
     *      `const deletedUser = await routerData.run(uid);`
     */
    async run(data?: any): Promise<any> {

        const arr = this.route.split('.');
        this.className = arr[0];
        this.methodName = arr[1];

        try {

            if (this.classContainer[this.className] === void 0) {
                throw new Error(WRONG_CLASS_NAME);
            }
            if (this.classContainer[this.className][this.methodName] === void 0) {
                throw new Error(WRONG_METHOD_NAME);
            }

            const re = await this.classContainer[this.className][this.methodName](data);
            if (typeof re !== 'object') {
                throw new Error(RESULT_IS_NOT_OBJECT);
            }
            return re;

        } catch (e) {
            throw convertFirebaseErrorIntoJavascriptError(e);
        }
    }
}


