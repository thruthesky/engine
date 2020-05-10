import { admin } from "../init/init.firebase";


/**
 * This class is only used for Test.
 * @todo do not publish this class. or block it on production use.
 */
export class Test {


    /**
     * Create a doc
     * @param data 
     *  - data.key is the key of the doc.
     *  - data.value is the value of the doc. it must be a JSON data.
     * 
     * @warning Don't do validation here.
     */
    async docCreate(data: any) {

        data.created = (new Date).getTime();
        return await admin().firestore().collection('test').doc(data.key).set(data);
    }

    async docGet(key: string) {
        const snapshot = await admin().firestore().collection('test').doc(key).get();
        const data = snapshot.data();
        return data;
    }
}