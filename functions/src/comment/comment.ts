
import { CommentData } from './comment.interfaces';
import { PERMISSION_DEFINED, INPUT_IS_EMPTY } from '../defines';
import { error, isLoggedIn } from '../helpers/global-functions';

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




    sorted: CommentData[] = [];
    rest: CommentData[] = [];

    recursive(parentId: string, depth = 0) {
        var temp = [];
        var found = [];
        for (var comment of this.rest) {
            if (comment.parentId === parentId) {
                comment.depth = depth;
                found.push(comment);
            } else {
                temp.push(comment);
            }
        }
        found.sort((a, b) => a.createdAt! - b.createdAt!);

        const pos = this.sorted.findIndex((c) => c.id === parentId);

        this.rest = temp;

        this.sorted.splice(pos+1, 0, ...found);


        this.sorted.filter((c) => c.depth === depth).forEach(c => this.recursive(c.id!, depth+1));
        


    }

    sortComments(comments: CommentData[]) {


        this.rest = comments;

        this.recursive('');



        return this.sorted;




        // let sorted: CommentData[] = [];
        // const roots: CommentData[] = [];
        // let rest: CommentData[] = [];

        // // comments.sort((a, b) => a.createdAt! - b.createdAt!);


        // // console.log('=============> After sort comments', comments);

        // /// look for empty string parent Id.

        // for (var comment of comments) {
        //     if (comment.parentId === '') {
        //         comment.depth = 0;
        //         roots.push(comment);
        //     } else {
        //         rest.push(comment);
        //     }
        // }




        // roots.sort((a, b) => a.createdAt! - b.createdAt!);

        // sorted = roots;


        // let maxDepth = 0;

        // let loopCount = 1;





        // /**
        //  * Support only 100 depth loops.
        //  * If there is a (dangling) comment that lost its parent, it may do inifite loop.
        //  *  - And `100 dpeth loop` is for preventing infite loop for this case.
        //  *  - It's not limited to 100 comments. it's more 100 dpeth loops.
        //  */
        // while (rest.length && loopCount < 4) {

        //     console.log('==> loop: ', loopCount);
        //     const temp: CommentData[] = [];
        //     // const founds: CommentData[] = [];
        //     for (var comment of rest) {

        //         const found = sorted.findIndex((parent) => {
        //             // console.log(`parent.id: ${parent.id} = ${comment.parentId} :comment.parentId`)
        //             return parent.id === comment.parentId;
        //         });


        //         if (found != -1) {
        //             comment.depth = sorted[found].depth === void 0 ? 1 : sorted[found].depth! + 1;
        //             if (maxDepth < comment.depth) {
        //                 maxDepth = comment.depth;
        //             }
        //             // founds.push(comment);
        //             sorted.splice(found + 1, 0, comment);
        //         } else {
        //             temp.push(comment);
        //         }


        //     }

        //     rest = temp;

        //     console.log('rest.length', rest.length, temp);

        //     loopCount++;
        // }


        // /**
        //  * 
        //  */
        // // sorted.sort((a, b) => {
        // //     if (a.parentId === b.parentId) {
        // //         return a.createdAt! - b.createdAt!;
        // //     } else {
        // //         return 0;
        // //     }
        // // });


        // console.log('---> maxDepth: ', maxDepth);


        // // var rev = sorted.reverse();

        // // for (let depth = maxDepth; depth >= 0; depth--) {

        // //     let startedAt = 0;
        // //     let rowCount = 0;
        // //     for (let k = 0; k < sorted.length; k++) {
        // //         var c = sorted[k];
        // //         if (c.depth == depth) {
        // //             startedAt = depth;
        // //             rowCount ++;

        // //             console.log(`${k}: ${depth}: `, c);
        // //         } else {
        // //             if ( startedAt > 0 ) {

        // //             }
        // //         }
        // //     }


        // // }

        // return sorted;


    }
}
