

/**
 * `category` is not saved in post doc. It's saved in the relation.
 */
export interface PostData {
    id?: string;
    categories?: string[];
    uid?: string;
    title?: string;
    content?: string;
    created?: number; // timestamp in millliseconds
    updated?: number; // timestamp in millliseconds
    deleted?: number; // timestamp in millliseconds
    ip?: string;
    userAgent?: string;
    view?: number;
    like?: number;
    dislike?: number;
}
