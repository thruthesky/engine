
import { PERMISSION_DEFINED, INPUT_IS_EMPTY } from '../defines';
import { isLoggedIn, postCol, setCategoryPostRelation } from '../helpers/global-functions';
import { System } from '../system/system';


/**
 * `category` is not saved in post doc. It's saved in the relation.
 */
interface PostData {
    category: string;
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
     * @warning `id` is not saved.
     * 
     * /// 여기서 부터... 게시글 생성 테스트 & 게시글 수정 & 테스트 & 게시글 삭제 & 테스트
     */
    async create(data: PostData): Promise<object> {
        if (!isLoggedIn()) throw new Error(PERMISSION_DEFINED);
        if (!data) throw new Error(INPUT_IS_EMPTY);


        // trace('Post::create() validation pass');

        const category = data.category;
        delete data.category;
        data.uid = System.auth.uid;
        data.created = (new Date).getTime();

        // trace('Post doc data', data);
        const post = await postCol().add(data);
        // trace('doc.id', post.id);

        await setCategoryPostRelation(category, post.id);


        // trace('categoryPostRelationDoc()', re);
        return { id: post.id };

    }

}

