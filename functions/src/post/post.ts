// import { admin } from "../init.firebase";
// import { USER_NOT_EXIST, EMAIL_NOT_PROVIDED, PASSWORD_NOT_PROVIDED, INPUT_NOT_PROVIDED } from "../defines";


import { PERMISSION_DEFINED, INPUT_IS_EMPTY } from '../defines';
import { isLoggedIn, postCol, categoryPostRelationDoc } from '../helpers/global-functions';
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
    async create(data: PostData): Promise<string> {
        try {
            if (!isLoggedIn()) throw new Error(PERMISSION_DEFINED);
            if (!data) throw new Error(INPUT_IS_EMPTY);
        } catch (e) {
            throw e;
        }

        try {
            const category = data.category;
            delete data.category;
            data.uid = System.auth.email;
            data.created = (new Date).getTime();

            const doc = await postCol().add(data);

            await categoryPostRelationDoc(doc.id).set({ category: category });

            return doc.id;

        } catch (e) {
            throw new Error(e.code);
        }
    }

}

