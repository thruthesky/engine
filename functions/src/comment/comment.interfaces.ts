

/**
 * `category` is not saved in post doc. It's saved in the relation.
 */
export interface CommentData {

    // Comment ID. This is not saved in database but when read, it will be added to the returned data.
    id?: string;

    // All comments are required to have postId and will be saved in docuemnt. So, that it can be searchable by postId.
    postId?: string;

    // Parent comment ID. If the comment is root coment(not a child of another comment), then it must be a empty string.
    parentId?: string;

    // depth of comment in the nested comment tree. This is not saved in doc.
    depth?: number;
    
    // User ID
    uid?: string;
    content?: string;
    createdAt?: number; // timestamp in millliseconds
    updatedAt?: number; // timestamp in millliseconds
    deletedAt?: number; // timestamp in millliseconds
    ip?: string;
    userAgent?: string;
    like?: number;
    dislike?: number;


    //
    checked?: boolean;
}
