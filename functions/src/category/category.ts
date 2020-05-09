// import { admin } from "../init.firebase";
// import { USER_NOT_EXIST, EMAIL_NOT_PROVIDED, PASSWORD_NOT_PROVIDED, INPUT_NOT_PROVIDED } from "../defines";


import { WriteResult } from '@google-cloud/firestore';

import { PERMISSION_DEFINED, TITLE_IS_EMPTY, INPUT_IS_EMPTY, ID_IS_EMPTY } from '../defines';
import { isAdmin, categoryDoc } from '../helpers/global-functions';



/**
 * @param id is the key of documenation and must folllow the standard limitation at https://firebase.google.com/docs/firestore/quotas#limits
 */
interface CategoryData {
    id: string;
    title: string;
    description: string;
    created: number;
    updated: number;
}

/**
 * @note all method of Category class returns `WriteResult` object.
 */
export class Category {

    /**
     * Create a category
     *
     * `data` can have more properties to save as user information.
     * 
     * @param data object
     * 
     * @example open `user.spec.ts` to see more examples.
     * 
     * @warning `id` is not saved.
     * 
     */
    async create(data: CategoryData): Promise<WriteResult> {
        try {
            if (!isAdmin()) throw new Error(PERMISSION_DEFINED);
            if (!data) throw new Error(INPUT_IS_EMPTY);
            if (data.id === void 0) throw new Error(ID_IS_EMPTY);
            if (data.title === void 0) throw new Error(TITLE_IS_EMPTY);
        } catch (e) {
            throw e;
        }

        try {
            const id = data.id;
            delete data.id;

            data.created = (new Date).getTime();

            return categoryDoc(id).set(data);
        } catch (e) {
            throw new Error(e.code);
        }
    }


    /**
     * Update category data.
     * @param data Category data to update
     *  `data[id]` is a mendatory property to update the category information.
     * 
     * @warning `id` is not saved.
     */
    async update(data: CategoryData): Promise<WriteResult> {
        try {
            if (!isAdmin()) throw new Error(PERMISSION_DEFINED);
            if (!data) throw new Error(INPUT_IS_EMPTY);
            if (data.id === void 0) throw new Error(ID_IS_EMPTY);
            if (data.title === void 0) throw new Error(TITLE_IS_EMPTY);
        } catch (e) {
            throw e;
        }

        try {
            const id = data.id;
            delete data.id;
            data.updated = (new Date).getTime();
            return categoryDoc(id).update(data);
        } catch (e) {
            throw new Error(e.code);
        }
    }

    /**
     * Delete a category.
     * @param data Category data to update
     *  `data[id]` is a mendatory property to update the category information.
     * 
     * @warning `id` is not saved.
     */
    async delete(data: CategoryData): Promise<WriteResult> {
        try {
            if (!isAdmin()) throw new Error(PERMISSION_DEFINED);
            if (!data) throw new Error(INPUT_IS_EMPTY);
            if (data.id === void 0) throw new Error(ID_IS_EMPTY);
        } catch (e) {
            throw e;
        }

        try {
            return categoryDoc(data.id).delete();
        } catch (e) {
            throw new Error(e.code);
        }
    }
}

