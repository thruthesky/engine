import * as functions from 'firebase-functions';
import { Router } from './router/router';
import { System } from './system/system';



exports.router = functions.https.onCall(async (params, context) => {

    System.auth.uid = context?.auth?.uid as any;
    System.auth.email = context.auth?.token.email as any;
    const router = new Router(params.route);

    const result = await router.run(params.data);

    /// This is for debugging purpose only.
    /// Comment out for production mode.
    // console.info('params:', params);

    // for (const p of result) {
    //     for (const c of p['comments']) {
    //         console.log('commnet: ', c);
    //     }
    // }

    return result;


});
