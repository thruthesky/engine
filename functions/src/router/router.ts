import { User } from '../user/user';
import { WRONG_CLASS_NAME, WRONG_METHOD_NAME } from '../defines';


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
        this.route = route ?? '';
    }

    /**
     * Runs the class & method.
     * @param data data to pass to the route method.
     * @example see `user.spect.ts`
     * @note It can be called with `await`
     *      `const deletedUser = await routerData.run(uid);`
     */
    run(data?: any): any {

        const arr = this.route.split('.');
        this.className = arr[0];
        this.methodName = arr[1];

        if (this.classContainer[this.className] === void 0) {
            // console.log(`class does not exists - ${this.className}`);
            throw new Error(WRONG_CLASS_NAME);
        }
        if (this.classContainer[this.className][this.methodName] === void 0) {
            // console.log(`method does not exists - ${this.className}.${this.methodName}`);
            throw new Error(WRONG_METHOD_NAME);
        }

        return this.classContainer[this.className][this.methodName](data);
    }



    // if ( route === 'user' ) {
    //     user[route](data);
    // }
}


