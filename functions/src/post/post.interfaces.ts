

/**
 * `category` is not saved in post doc. It's saved in the relation.
 */
export interface PostData {
    id?: string;
    categories: string[];
    uid?: string;
    title?: string;
    content?: string;
    created?: number;
    updated?: number;
    ip?: string;
    userAgent?: string;
    view?: number;
    like?: number;
    dislike?: number;
}
