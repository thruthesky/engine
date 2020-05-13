export const EngineSettings = {
    /**
     * Admin email address.
     */
    adminEmails: ['thruthesky@gmail.com', 'admin@engin.com'],
    /**
     * Max number of comments that a post can have.
     * 10,000 is good for a small business.
     */
    maxComments: 10000,
    /**
    * Max number of comment tree depth.
    * Depth is the hierachical indentation of comment tree.
    * Depth 0 is the root comment.
    * Depth 1 is the child comment of the root comment.
    * Depth 1 does not means One(1) comment. Depth 1 may have unlimited no of comments.
    * 
    * 100 is good enough for most case.
    */
    maxDepth: 100,
};






/**
 * For test purpose only.
 * `testUserEmail` must be a real user email.
 * `testUserUid` could be a fake uid since it does not check authentication.
 */
export const TestSettings = {
    testUserEmail: 'user10@gmail.com',
    testUserUid: 'tempUid',
};