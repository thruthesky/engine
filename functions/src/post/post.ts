
import { PERMISSION_DEFINED, INPUT_IS_EMPTY, CATEGORY_NOT_EXISTS, INVALID_INPUT, MISSING_INPUT, POST_NOT_EXISTS, TITLE_DELETED, CONTENT_DELETED } from '../defines';
import { isLoggedIn, postCol, error, postDoc } from '../helpers/global-functions';
import { System } from '../system/system';
import { Category } from '../category/category';
import { Query } from '@google-cloud/firestore';
import { PostData } from './post.interfaces';

export class Post {

    /**
     * Create a post
     * `data` can have more properties to save as user information.
     * @param data object data to create a post
     * @return PostData of the post
     * @example open `user.spec.ts` to see more examples.
     * @warning Category IDs are saved in an Arrray.
     */
    async create(data: PostData): Promise<PostData> {

        if (!isLoggedIn()) throw error(PERMISSION_DEFINED);
        if (!data) throw error(INPUT_IS_EMPTY);
        if (data.categories === void 0) throw error(MISSING_INPUT, 'categories');

        if (!Array.isArray(data.categories)) {
            throw error(INVALID_INPUT, 'categories');
        }

        const categoryObj = new Category();
        for (const id of data.categories) {
            const categoryData = await categoryObj.data(id);
            if (!categoryData) throw error(CATEGORY_NOT_EXISTS, id);
        }
        data.uid = System.auth.uid;
        data.created = (new Date).getTime();

        const post = await postCol().add(data);
        // return { id: post.id };
        return await this.data(post.id);
    }

    /**
     * Update a post
     * `data` can have more properties to save as user information.
     * @param data object data to update the post
     *  - data[id] is the post document id.
     *  - data[categoris] is the categories of the post. It is optional. If it's undefined, then it does not touch categories.
     * @return the post data
     * @example open `user.spec.ts` to see more examples.
     * @warning Category IDs are saved in an Arrray.
     * @attention
     *      - It does not save `id`.
     *      - It does not change `uid`.
     */
    async update(data: PostData): Promise<PostData> {

        if (!isLoggedIn()) throw error(PERMISSION_DEFINED);
        if (!data) throw error(INPUT_IS_EMPTY);
        if (data.id === void 0) throw error(MISSING_INPUT, 'id');

        const p = await this.data(data.id);
        if (!p) throw error(POST_NOT_EXISTS);

        if (data.categories !== void 0) {
            if (!Array.isArray(data.categories)) {
                throw error(INVALID_INPUT, 'categories');
            }
        }

        if (data.categories !== void 0) {
            const categoryObj = new Category();
            for (const _id of data.categories) {
                const categoryData = await categoryObj.data(_id);
                if (!categoryData) throw error(CATEGORY_NOT_EXISTS, _id);
            }
        }
        // data.uid = System.auth.uid;

        data.created = (new Date).getTime();

        const id: string = data.id;
        delete data.id;
        await postDoc(id).update(data);

        // const post = await postCol().add(data);
        // return { id: post.id };

        return await this.data(id);
    }

    /**
     * Returns post data
     * @param id post document key
     * @attention `id` is added to returned post data
     */
    async data(id: string) {
        const snapshot = await postDoc(id).get();
        const data: any = snapshot.data();
        if (!data) return data;
        data.id = id;
        return data;
    }

    /**
     * Returns posts
     * 
     * @attention each post has its push key as id.
     */
    async list(data?: any): Promise<Array<any>> {
        let snapshots;

        if (!data) {
            snapshots = await postCol().get();
        } else {
            const ref = postCol();
            let query: Query = ref; // Save `ref` to `query`
            /// category
            if (data.categories !== void 0) {
                if (!Array.isArray(data.categories)) throw error(INVALID_INPUT, 'categories');
                // query where and save result to query
                query = query.where('categories', 'array-contains-any', data.categories);
            }
            snapshots = await query.get();
        }

        const posts: PostData[] = [];
        snapshots.forEach((doc) => {

            const post: PostData = doc.data();
            post.id = doc.id;
            posts.push(post);
        });
        return posts;
    }

    /**
     * It mark as deleted. It does not actually delete the document. It only deletes title & content.
     * @param id post id to delete
     */
    async delete(id: string): Promise<PostData> {

        if (!isLoggedIn()) throw error(PERMISSION_DEFINED);
        if (!id) throw error(INPUT_IS_EMPTY);
        if (id === void 0) throw error(MISSING_INPUT, 'id');

        const p = await this.data(id);
        if (!p) throw error(POST_NOT_EXISTS);

        const data: PostData = {
            title: TITLE_DELETED,
            content: CONTENT_DELETED,
            deleted: (new Date).getTime(),
        };

        await postDoc(id).update(data);

        return await this.data(id);


    }

}

