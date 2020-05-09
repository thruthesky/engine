import * as functions from 'firebase-functions';
import { Router } from './router/router';
import { System } from './system/system';



 /// 여기서 부터 다시 작업 할 것: https://docs.google.com/document/d/1xNDf6hYyBXWrYhBb4y5gV84MhNgKFdiBE0BYT97GpzE/edit#heading=h.ctbgsg1k56ws
exports.router = functions.https.onCall(async (params, context) => {

    try {
        System.auth.uid = context?.auth?.uid as any;
        System.auth.email = context.auth?.token.email as any;
        const router = new Router(params.route);
        return await router.run(params.data);
    } catch (e) {
        console.error(e);
        return e.message;
    }

});