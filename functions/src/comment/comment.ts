
import { CommentData } from './comment.interfaces';
import { PERMISSION_DEFINED, INPUT_IS_EMPTY } from '../defines';
import { error, isLoggedIn } from '../helpers/global-functions';
import { EngineSettings } from '../settings';


export class Comment {

    /**
     * Create a post
     * `data` can have more properties to save as user information.
     * @param data object data to create a post
     * @return CommentData of the post
     * @example open `user.spec.ts` to see more examples.
     * @warning Category IDs are saved in an Arrray.
     */
    async create(data: CommentData): Promise<CommentData> {

        if (!isLoggedIn()) throw error(PERMISSION_DEFINED);
        if (!data) throw error(INPUT_IS_EMPTY);
        // if (data.parentId === void 0) throw error(MISSING_INPUT, 'postId');


        return null as any;

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

        var temp = [];
        var found = [];
        for (var comment of this.rest) {
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

        var filtered = this.sorted.filter((c) => {
            if (c.checked) return false;
            return c.depth === depth;
        });

        for (var f of filtered) {
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



        return this.sorted;



    }
}
