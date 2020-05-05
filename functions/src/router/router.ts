import { User } from '../user/user';
import { WRONG_CLASS_NAME, WRONG_METHOD_NAME } from '../defines';


interface ClassContainer {
    [key: string]: any;
}

export class Router {

    classContainer: ClassContainer = {};
    className: string;
    methodName: string;
    action: string;
    constructor(action: string) {
        this.classContainer['user'] = new User();
        this.action = action;
        const arr = action.split('.');
        this.className = arr[0];
        this.methodName = arr[1];
    }

    /**
     * Runs the class & method.
     * @param data data to pass to the action method.
     * @example see `user.spect.ts`
     * @note It can be called with `await`
     *      `const deletedUser = await routerData.run(uid);`
     */
    run(data?: any): any {

        if (this.classContainer[this.className] === void 0) {
            // console.log(`class does not exists - ${this.className}`);
            return new Error(WRONG_CLASS_NAME);
        }
        if (this.classContainer[this.className][this.methodName] === void 0) {
            // console.log(`method does not exists - ${this.className}.${this.methodName}`);
            return new Error(WRONG_METHOD_NAME);
        }

        return this.classContainer[this.className][this.methodName](data);
    }



    // if ( action === 'user' ) {
    //     user[action](data);
    // }
}


