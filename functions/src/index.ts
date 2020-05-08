import * as functions from 'firebase-functions';
import { Router } from './router/router';
import { System } from './system/system';


exports.router = functions.https.onCall(async (params, context) => {

    try {
        System.auth.uid = context?.auth?.uid;
        System.auth.email = context.auth?.token.email;
        const router = new Router(params.route);
        return await router.run(params.data);
    } catch (e) {
        console.error(e);
        return e.message;
    }

});