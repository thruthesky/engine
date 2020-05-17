
import { CommentData } from './comment.interfaces';
import {
    INPUT_IS_EMPTY, MISSING_INPUT, POST_NOT_EXISTS, COMMENT_NOT_EXISTS,
    COMMENT_CONTENT_DELETED,
    INVALID_INPUT,
    LOGIN_FIRST,
    PERMISSION_DEFINED
} from '../defines';
import { error, isLoggedIn, commentCol, commentDoc } from '../helpers/global-functions';
import { EngineSettings } from '../settings';
import { Post } from '../post/post';
import { System } from '../system/system';
import { DependencyInjections } from '../helpers/dependency-injections';


export class Comment {

    /**
     * Create a comment
     * `data` can have more properties to save as user information.
     * @param data object data to create a comment
     * @return CommentData of the comment
     * @example open `user.spec.ts` to see more examples.
     * @warning Category IDs are saved in an Arrray.
     */
    async create(data: CommentData): Promise<CommentData> {

        if (!isLoggedIn()) throw error(LOGIN_FIRST);
        if (!data) throw error(INPUT_IS_EMPTY);
        if (data.postId === void 0) throw error(MISSING_INPUT, 'postId');

        // Check if the post exists.
        const post = new Post();
        const p = await post.data(data.postId);
        if (!p) throw error(POST_NOT_EXISTS);

        // Parent Id
        if (data.parentId === void 0) {
            data.parentId = '';
        }

        data.uid = System.auth.uid;
        data.createdAt = (new Date).getTime();

        const comment = await commentCol().add(data);

        return await this.data(comment.id);
    }

    /**
     * Update a comment
     * `data` can have more properties to save as user information.
     * @param data object data to create a comment
     * @return CommentData of the updated comment
     * @example open `user.spec.ts` to see more examples.
     * @warning Category IDs are saved in an Arrray.
     */
    async update(data: CommentData): Promise<CommentData> {

        if (!isLoggedIn()) throw error(LOGIN_FIRST);
        if (!data) throw error(INPUT_IS_EMPTY);
        if (data.id === void 0) throw error(MISSING_INPUT, 'id');

        // Check if the comment exists.
        const p = await this.data(data.id);
        if (!p) throw error(COMMENT_NOT_EXISTS);
        if (p.uid !== System.auth.uid) throw error(PERMISSION_DEFINED);

        data.updatedAt = (new Date).getTime();
        await commentDoc(data.id).update(data);
        return await this.data(data.id);
    }

    /**
     * Deleting a comment
     * It mark as deleted. It does not actually delete the document itself. But it erases title & content.
     * @param id string. comment id to delete.
     * @return CommentData
     */
    async delete(id: string): Promise<CommentData> {
        if (!isLoggedIn()) throw error(LOGIN_FIRST);
        if (!id) throw error(INPUT_IS_EMPTY);
        if (typeof id !== 'string') throw error(INVALID_INPUT, 'id');
        const p = await this.data(id);
        if (!p) throw error(COMMENT_NOT_EXISTS);

        if (p.uid !== System.auth.uid) throw error(PERMISSION_DEFINED);
        const data: CommentData = {
            content: COMMENT_CONTENT_DELETED,
            deletedAt: (new Date).getTime(),
        };
        await commentDoc(id).update(data);
        return await this.data(id);
    }


    async addUrl(data: any) {
        return (new DependencyInjections).addUrl(commentDoc(data.id), data.url);
    }

    async removeUrl(data: any) {
        return (new DependencyInjections).removeUrl(commentDoc(data.id), data.url);
    }



    /**
     * Gets the comments of the post
     *  - And sort the comment in hierachical thread.
     *  - And return it in array.
     *
     * @param id post id to get the commetns of
     */
    async list(id: string): Promise<CommentData[]> {
        if (typeof id !== 'string') throw error(INVALID_INPUT, 'id');
        const snapshots = await commentCol().where('postId', '==', id).get();

        const comments: CommentData[] = [];
        snapshots.forEach((doc) => {
            const comment: CommentData = doc.data();
            comment.id = doc.id;
            comments.push(comment);
        });

        const sorted = this.sortComments(comments);
        return sorted;
        // return comments;

    }
    /**
     * Returns comment data
     * @param id comment document key
     * @attention `id` is added to returned comemnt data
     * @attention `depth` is set to 0. `depth` is not saved in Firestore. It is automatically computed when hierachical tree sorting.
     */
    async data(id: string): Promise<CommentData> {
        if (typeof id !== 'string') throw error(INVALID_INPUT, 'id');
        const snapshot = await commentDoc(id).get();
        const data: any = snapshot.data();
        if (!data) return data;
        data.id = id;
        if (data.depth === void 0) data.depth = 0;
        return data;
    }




    /**
     * Limit of max depth in the comment tree. 100 is more than good enough.
     */
    maxDepth = EngineSettings.maxDepth;

    /**
     * Limit of max recursive call to sort the comment tree.
     * For each comment, it needs to call `recursive()` method to check if it has children.
     * So, One(1) recursive call is equavalant to one coment.
     * `100,000 maxRecursiveCall` means, it only support `100,100` comments.
     * This prevents unexpected behaviour like
     *  - a hacker may do comment creation attack.
     * 
     */
    recursiveCall = 0;
    maxRecursiveCall = EngineSettings.maxComments;

    /**
     * Sorting variables.
     */


    sorted: CommentData[] = [];
    rest: CommentData[] = [];
    foundCount = 0;
    notFoundCount = 0;

    /**
     * 
     * without `filtered` proprty, it calls the recursive method too much.
     * @param parentId 
     * @param depth 
     */
    recursive(parentId: string, depth = 0) {
        if (depth > this.maxDepth) return;

        this.recursiveCall++;
        // console.log('maxRecursion: ', this.recursiveCall);
        if (this.recursiveCall > this.maxRecursiveCall) return;

        const temp = [];
        const found = [];
        for (const comment of this.rest) {
            if (comment.parentId === parentId) {
                comment.depth = depth;
                found.push(comment);
                ++this.foundCount
                // console.log('===> found: ', this.foundCount);
            } else {
                temp.push(comment);
                ++this.notFoundCount;
                // console.log('---> not found: ', this.notFoundCount, comment);
            }
        }
        found.sort((a, b) => a.createdAt! - b.createdAt!);

        const pos = this.sorted.findIndex((c) => c.id === parentId);

        this.rest = temp;

        // console.log('----------> rest count: !', this.rest.length);

        this.sorted.splice(pos + 1, 0, ...found);

        const filtered = this.sorted.filter((c) => {
            if (c.checked) return false;
            return c.depth === depth;
        });

        for (const f of filtered) {
            // console.log('f: ', f.id);
            f.checked = true;
            this.recursive(f.id!, depth + 1);
        }
    }


    //// 여기부터 threaed 코멘트가 제대로 되는지 증명 할 것.
    sortComments(comments: CommentData[]) {


        this.rest = comments;

        this.recursive('');

        // console.log(`
        // found: ${this.foundCount}
        // not found: ${this.notFoundCount}
        // recursiveCall: ${this.recursiveCall}
        // maxRecursiveCall: ${this.maxRecursiveCall}

        // `)

        this.sorted.forEach(c => {
            delete c.checked;
        });


        return this.sorted;



    }
}
