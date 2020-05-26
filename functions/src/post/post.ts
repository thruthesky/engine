
import {
    INPUT_IS_EMPTY, CATEGORY_NOT_EXISTS,
    LOGIN_FIRST, INVALID_INPUT, MISSING_INPUT, POST_NOT_EXISTS, POST_TITLE_DELETED, POST_CONTENT_DELETED, PERMISSION_DEFINED
} from '../defines';
import { isLoggedIn, postCol, error, postDoc, addUserData } from '../helpers/global-functions';
import { System } from '../system/system';
import { Category } from '../category/category';
import { Query } from '@google-cloud/firestore';
import { PostData } from './post.interfaces';
import { Comment } from '../comment/comment';
import { DependencyInjections } from '../helpers/dependency-injections';

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

        if (!isLoggedIn()) throw error(LOGIN_FIRST);
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
        data.createdAt = (new Date).getTime();

        const post = await postCol().add(data);
        
        console.log('post: ', post);
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

        if (!isLoggedIn()) throw error(LOGIN_FIRST);
        if (!data) throw error(INPUT_IS_EMPTY);
        if (data.id === void 0) throw error(MISSING_INPUT, 'id');

        const p = await this.data(data.id);
        if (!p) throw error(POST_NOT_EXISTS);
        if (p.uid !== System.auth.uid) throw error(PERMISSION_DEFINED);

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

        data.createdAt = (new Date).getTime();

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
    async data(id: string): Promise<PostData> {
        if (typeof id !== 'string') throw error(INVALID_INPUT, 'id');
        const snapshot = await postDoc(id).get();
        const data: any = snapshot.data();
        if (!data) return data;
        data.id = id;
        return addUserData(data);
    }


    /**
     * Returns posts
     * 
     * 프로토콜 문서 참고
     * 
     */
    async list(data?: any): Promise<Array<any>> {
        let snapshots;

        if (!data) {
            snapshots = await postCol().get();
        } else {
            if (data.limit === void 0) {
                data.limit = 20;
            }
            if (data.orderBy === void 0) {
                data.orderBy = 'createdAt';
            }
            if (data.orderBySort === void 0) {
                data.orderBySort = 'desc';
            }
            if (data.includeComments === void 0) {
                data.includeComments = false;
            }

            // console.log('Post::list() data: ', data);
            const ref = postCol();
            let query: Query = ref; // Save `ref` to `query`
            /// category
            if (data.categories !== void 0) {
                if (!Array.isArray(data.categories)) throw error(INVALID_INPUT, 'categories');
                // console.log(`query.where('categories', 'array-contains-any', data.categories);`);
                query = query.where('categories', 'array-contains-any', data.categories);
            }

            // console.log(`query.orderBy(${data.orderBy}, ${data.orderBySort});`);
            query = query.orderBy(data.orderBy, data.orderBySort);

            if (data.startAfter !== void 0) {
                query = query.startAfter(data.startAfter);
            }

            if (data.limit) {
                // console.log(`query.limit(${data.limit});`);
                query = query.limit(data.limit);
            }

            snapshots = await query.get();
        }



        /// Get posts
        const posts: PostData[] = [];
        snapshots.forEach((doc) => {
            const post: PostData = doc.data();
            post.id = doc.id;
            addUserData(post);
            posts.push(post);
        });

        /// Get comments
        if (data?.includeComments) {
            for (const post of posts) {
                const commentObj = new Comment();
                post.comments = await commentObj.list(post.id!);
            }
        }

        return posts;
    }

    /**
     * It mark as deleted. It does not actually delete the document. It only deletes title & content.
     * @param id string. post id to delete.
     * @return PostData
     */
    async delete(id: string): Promise<PostData> {
        if (!isLoggedIn()) throw error(LOGIN_FIRST);
        if (!id) throw error(INPUT_IS_EMPTY);
        // if (id === void 0) throw error(MISSING_INPUT, 'id');
        if (typeof id !== 'string') throw error(INVALID_INPUT, 'id');
        const p = await this.data(id);
        if (!p) throw error(POST_NOT_EXISTS);
        if (p.uid !== System.auth.uid) throw error(PERMISSION_DEFINED);
        const data: PostData = {
            title: POST_TITLE_DELETED,
            content: POST_CONTENT_DELETED,
            deletedAt: (new Date).getTime(),
        };
        await postDoc(id).update(data);
        return await this.data(id);
    }


    async addUrl(data: any) {
        return (new DependencyInjections).addUrl(postDoc(data.id), data.url);
    }

    async removeUrl(data: any) {
        return (new DependencyInjections).removeUrl(postDoc(data.id), data.url);
    }


}

