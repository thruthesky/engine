import { DocumentReference } from "@google-cloud/firestore";
import { error } from "./global-functions";
import { DOCUMENT_NOT_EXISTS, PROPERTY_NOT_EXISTS, VALUE_NOT_EXISTS } from '../defines';




/**
 * @return
 *  `id` - the docuemnt id
 *  `url` - the url that is added.
 *  `urls` - the whole list of urls.
 */
export class DependencyInjections {

    async addUrl(doc: DocumentReference, url: string) {


        const snapshot = await doc.get();

        if (!snapshot.exists) throw error(DOCUMENT_NOT_EXISTS);

        const data = snapshot.data();

        let urls;
        if (data?.urls === void 0) urls = [];
        else urls = data.urls;

        urls.push(url);

        await doc.update({ urls: urls });

        return {
            id: doc.id,
            url: url,
            urls: urls,
        };


    }

    async removeUrl(doc: DocumentReference, url: string) {

        const snapshot = await doc.get();

        if (!snapshot.exists) throw error(DOCUMENT_NOT_EXISTS);

        const data = snapshot.data();

        if (data?.urls === void 0) throw error(PROPERTY_NOT_EXISTS);


        const newUrls: string[] = data.urls;

        const i = newUrls.indexOf(url);
        if (i === -1) throw error(VALUE_NOT_EXISTS, url);

        newUrls.splice(i, 1);

        await doc.update({ urls: newUrls });

        return {
            id: doc.id,
            url: url,
            urls: newUrls,
        };

    }
}

