import * as functions from 'firebase-functions';
import { Router } from './router/router';


exports.router = functions.https.onCall(async (params, context) => {

    try {
        const router = new Router(params.route);
        return await router.run(params.data);
    } catch (e) {
        console.error(e);
        return e.message;
    }

});