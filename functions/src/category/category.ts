

import { WriteResult } from '@google-cloud/firestore';

import { PERMISSION_DEFINED, TITLE_IS_EMPTY, INPUT_IS_EMPTY, ID_IS_EMPTY, CATEGORY_ALREADY_EXISTS } from '../defines';
import { isAdmin, categoryDoc, error, categoryCol } from '../helpers/global-functions';
import { CategoryData, CategoryDatas } from './category.interfaces';
import { DependencyInjections } from '../helpers/dependency-injections';


/**
 * @note all method of Category class returns `WriteResult` object.
 */
export class Category {

    /**
     * Create a category
     *
     * `data` can have more properties to save as user information.
     * 
     * @param data object data to create a category
     * @return `CategoryData` of the created category.
     * @example open `category.spec.ts` to see more examples.
     * @warning `id` is not saved.
     * 
     */
    async create(data: CategoryData): Promise<CategoryData> {

        if (!isAdmin()) throw error(PERMISSION_DEFINED);
        if (!data) throw error(INPUT_IS_EMPTY);
        if (!data.id) throw error(ID_IS_EMPTY);
        if (!data.title) throw error(TITLE_IS_EMPTY);


        const doc = await this.data(data.id);
        if (!!doc) throw error(CATEGORY_ALREADY_EXISTS);

        const id = data.id;
        delete data.id;

        data.createdAt = (new Date).getTime();

        await categoryDoc(id).set(data);
        return await this.data(id);
    }

    /**
     * Update category data.
     * @param data object data to update a category
     *  `data[id]` is a mendatory property to update the category information.
     *
     * @return `CategoryData` of the created category.
     * @warning `id` is not saved on the document and cannot be changed.
     */
    async update(data: CategoryData): Promise<CategoryData> {

        if (!isAdmin()) throw error(PERMISSION_DEFINED);
        if (!data) throw error(INPUT_IS_EMPTY);
        if (!data.id) throw error(ID_IS_EMPTY);

        const id = data.id;
        delete data.id;
        data.updatedAt = (new Date).getTime();
        await categoryDoc(id).update(data);
        return await this.data(id);

    }

    /**
     * Delete a category.
     * @param data Category data to update
     *  `data[id]` is a mendatory property to update the category information.
     * 
     * @warning `id` is not saved.
     * @return WriteResult
     */
    async delete(data: CategoryData): Promise<WriteResult> {

        if (!isAdmin()) throw error(PERMISSION_DEFINED);
        if (!data) throw error(INPUT_IS_EMPTY);
        if (data.id === void 0) throw error(ID_IS_EMPTY);

        return categoryDoc(data.id).delete();
    }

    /**
     * Returns category document data.
     * @param id Category id
     * 
     * @attention When it returns, it adds `category id` in the return object.
     */
    async data(id: string) {
        const snapshot = await categoryDoc(id).get();
        const data: any = snapshot.data();
        if (!data) return data;
        data.id = id;
        return data;
    }

    async list() {
        const snapshots = await categoryCol().get();

        const categories: CategoryDatas = {};
        snapshots.forEach((doc) => {
            categories[doc.id] = doc.data() as CategoryData;
        });

        return categories;
    }


    async addUrl(data: any) {
        return (new DependencyInjections).addUrl(categoryDoc(data.id), data.url);
    }

    async removeUrl(data: any) {
        return (new DependencyInjections).removeUrl(categoryDoc(data.id), data.url);
    }


}

