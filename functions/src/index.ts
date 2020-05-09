import * as functions from 'firebase-functions';
import { Router } from './router/router';
import { System } from './system/system';



exports.router = functions.https.onCall(async (params, context) => {

    try {
        System.auth.uid = context?.auth?.uid as any;
        System.auth.email = context.auth?.token.email as any;
        const router = new Router(params.route);
        return await router.run(params.data);
    } catch (e) {
        // console.error(e);
        return e.message;
    }

});


exports.throwHttpsError = functions.https.onCall(async (params, context) => {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
        'one arguments "text" containing the message text to add.');
});