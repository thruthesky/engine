import { CommentData } from "../comment/comment.interfaces";


/**
 * `category` is not saved in post doc. It's saved in the relation.
 */
export interface PostData {
    id?: string;
    categories?: string[];
    uid?: string;
    title?: string;
    content?: string;
    createdAt?: number; // timestamp in millliseconds
    updatedAt?: number; // timestamp in millliseconds
    deletedAt?: number; // timestamp in millliseconds
    ip?: string;
    userAgent?: string;
    view?: number;
    like?: number;
    dislike?: number;

    // This is set when the search option has 'includeComments' to true.
    comments?: CommentData[];
}
