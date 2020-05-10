

import { WriteResult } from '@google-cloud/firestore';

import { PERMISSION_DEFINED, TITLE_IS_EMPTY, INPUT_IS_EMPTY, ID_IS_EMPTY } from '../defines';
import { isAdmin, categoryDoc, error } from '../helpers/global-functions';



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
        if (!isAdmin()) throw error(PERMISSION_DEFINED);
        if (!data) throw error(INPUT_IS_EMPTY);
        if (data.id === void 0) throw error(ID_IS_EMPTY);
        if (data.title === void 0) throw error(TITLE_IS_EMPTY);


        const id = data.id;
        delete data.id;

        data.created = (new Date).getTime();

        return categoryDoc(id).set(data);

    }


    /**
     * Update category data.
     * @param data Category data to update
     *  `data[id]` is a mendatory property to update the category information.
     * 
     * @warning `id` is not saved.
     */
    async update(data: CategoryData): Promise<WriteResult> {

        if (!isAdmin()) throw error(PERMISSION_DEFINED);
        if (!data) throw error(INPUT_IS_EMPTY);
        if (data.id === void 0) throw error(ID_IS_EMPTY);
        if (data.title === void 0) throw error(TITLE_IS_EMPTY);


        const id = data.id;
        delete data.id;
        data.updated = (new Date).getTime();
        return categoryDoc(id).update(data);

    }

    /**
     * Delete a category.
     * @param data Category data to update
     *  `data[id]` is a mendatory property to update the category information.
     * 
     * @warning `id` is not saved.
     */
    async delete(data: CategoryData): Promise<WriteResult> {

        if (!isAdmin()) throw error(PERMISSION_DEFINED);
        if (!data) throw error(INPUT_IS_EMPTY);
        if (data.id === void 0) throw error(ID_IS_EMPTY);


        return categoryDoc(data.id).delete();

    }
}

