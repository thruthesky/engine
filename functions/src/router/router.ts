import { User } from '../user/user';
import { WRONG_METHOD_NAME, RESULT_IS_NOT_OBJECT, WRONG_CLASS_NAME } from '../defines';
import { System } from '../system/system';
import { Category } from '../category/category';
import { Post } from '../post/post';
import { error, returnError } from '../helpers/global-functions';
import { Test } from '../test/test';
import { Comment } from '../comment/comment';

// import * as functions from 'firebase-functions';
// import { convertFirebaseErrorIntoJavascriptError } from '../helpers/global-functions';


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
        this.classContainer['comment'] = new Comment();
        this.classContainer['test'] = new Test();
        this.route = route ?? '';
    }

    /**
     * Runs the class & method.
     * @param data data to pass to the route method.
     * @param uid is the user's UID and this is trustable since it is automatically set by `Cloud Functions`.
     * @example see `user.spect.ts`
     * @note It can be called with `await`
     *      `const deletedUser = await routerData.run(uid);`
     * 
     * @note Error Handling
     *  We do not follow the standard of [Cloud Functions Error Handling](https://firebase.google.com/docs/functions/callable#handle_errors)
     *  Since the error handling is dirty.
     *  On VSCode, the `.call()` always caught with `Break on Uncaught Excpetions` option even if it handles properlty.
     * 
     * @note It can be called directly by test code. User login is needed before calling this in test code.
     */
    async run<T>(data?: T): Promise<any> {


        try {
            const arr = this.route.split('.');
            this.className = arr[0];
            this.methodName = arr[1];
            if (this.classContainer[this.className] === void 0) {
                throw error(WRONG_CLASS_NAME, 'Typo error on class name? or the class not not registered?');
            }
            if (this.classContainer[this.className][this.methodName] === void 0) {
                throw error(WRONG_METHOD_NAME, 'Type error on method name? or the method does not exist in the class?');
            }

            const re = await this.classContainer[this.className][this.methodName](data);
            if (typeof re !== 'object') {
                throw error(RESULT_IS_NOT_OBJECT);
            }
            return re;
        } catch (e) {
            return returnError(e);
        }

    }
}


