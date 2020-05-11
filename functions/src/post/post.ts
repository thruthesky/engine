
import { PERMISSION_DEFINED, INPUT_IS_EMPTY, CATEGORY_NOT_EXISTS, INVALID_INPUT, MISSING_INPUT } from '../defines';
import { isLoggedIn, postCol, error } from '../helpers/global-functions';
import { System } from '../system/system';
import { Category } from '../category/category';
import { Query } from '@google-cloud/firestore';


/**
 * `category` is not saved in post doc. It's saved in the relation.
 */
interface PostData {
    categories: string[];
    uid: string;
    title: string;
    content: string;
    created: number;
    updated: number;
    ip: string;
    userAgent: string;
    view: number;
    like: number;
    dislike: number;
}

export class Post {

    /**
     * Create a category
     *
     * `data` can have more properties to save as user information.
     * 
     * @param data object
     * 
     * @example open `user.spec.ts` to see more examples.
     * 
     * @warning Category IDs are saved in an Arrray.
     * 
     */
    async create(data: PostData): Promise<object> {

        // console.log('postData: ', data);
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



        // trace('Post::create() validation pass');

        data.uid = System.auth.uid;
        data.created = (new Date).getTime();



        // trace('Post doc data', data);
        const post = await postCol().add(data);
        // trace('doc.id', post.id);

        // await setCategoryPostRelation(category, post.id);


        // trace('categoryPostRelationDoc()', re);
        return { id: post.id };

    }


    /**
     * Returns posts
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

        const posts: any[] = [];
        snapshots.forEach((doc) => {
            posts.push(doc.data());
        });
        return posts;
    }

}

