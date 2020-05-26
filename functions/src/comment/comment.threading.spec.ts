
// import { Router } from '../router/router';

import * as assert from 'assert';
import { CommentData } from './comment.interfaces';
import { loginAsUser, loginAsAdmin, testCreateComment } from '../helpers/global-functions';
import { Router } from '../router/router';
import { CategoryDatas } from '../category/category.interfaces';
import { PostData } from '../post/post.interfaces';


describe('Comment Threading/Nesting Test', function () {
    this.timeout(100000);

    // it('Sort comment', async () => {


    //     /// Comment thread before sorting
    //     const comments: CommentData[] = [

    //         { id: 'GA', parentId: 'G', createdAt: 510 },
    //         {
    //             id: 'G',
    //             parentId: '',
    //             createdAt: 500,
    //         },
    //         { id: 'GBB', parentId: 'GB', createdAt: 540 },
    //         { id: 'GBBAAA', parentId: 'GBBAA', createdAt: 570 },
    //         {
    //             id: 'CBA',
    //             parentId: 'CB',
    //             createdAt: 100,
    //         },
    //         {
    //             id: 'CA',
    //             parentId: 'C',
    //             createdAt: 50,
    //         },
    //         { id: 'GBBAAAAAAA', parentId: 'GBBAAAAAA', createdAt: 610 },
    //         { id: 'GC', parentId: 'G', createdAt: 525 },
    //         {
    //             id: 'E',
    //             parentId: '',
    //             createdAt: 300,
    //         },
    //         { id: 'GBBA', parentId: 'GBB', createdAt: 550 },
    //         { id: 'GBBAAAA', parentId: 'GBBAAA', createdAt: 580 },
    //         {
    //             id: 'BA',
    //             parentId: 'B',
    //             createdAt: 50
    //         },
    //         {
    //             id: 'CB',
    //             parentId: 'C',
    //             createdAt: 60,
    //         },
    //         { id: 'GBBAAAAA', parentId: 'GBBAAAA', createdAt: 590 },
    //         { id: 'GB', parentId: 'G', createdAt: 520 },
    //         {
    //             id: 'D',
    //             parentId: '',
    //             createdAt: 200,
    //         },

    //         { id: 'GBA', parentId: 'GB', createdAt: 530 },
    //         {
    //             id: 'F',
    //             parentId: '',
    //             createdAt: 400,
    //         },
    //         { id: 'GBBAAAAAA', parentId: 'GBBAAAAA', createdAt: 600 },
    //         { id: 'GBBAA', parentId: 'GBBA', createdAt: 560 },
    //         {
    //             id: 'AA',
    //             parentId: 'A',
    //             createdAt: 10,
    //         },
    //         {
    //             id: 'ABA',
    //             parentId: 'AB',
    //             createdAt: 20,
    //         },
    //         {
    //             id: 'AAAAB',
    //             parentId: 'AAAA',
    //             createdAt: 60,
    //         },
    //         {
    //             id: 'AAAAC',
    //             parentId: 'AAAA',
    //             createdAt: 70,
    //         },
    //         {
    //             id: 'AAAAA',
    //             parentId: 'AAAA',
    //             createdAt: 50,
    //         },
    //         {
    //             id: 'AAAA',
    //             parentId: 'AAA',
    //             createdAt: 40,
    //         },
    //         {
    //             id: 'AAAB',
    //             parentId: 'AAA',
    //             createdAt: 80,
    //         },
    //         {
    //             id: 'AAABA',
    //             parentId: 'AAAB',
    //             createdAt: 100,
    //         },
    //         {
    //             id: 'AAABB',
    //             parentId: 'AAAB',
    //             createdAt: 110,
    //         },
    //         {
    //             id: 'AAABBB',
    //             parentId: 'AAABB',
    //             createdAt: 140,
    //         },
    //         {
    //             id: 'AAABBA',
    //             parentId: 'AAABB',
    //             createdAt: 120,
    //         },
    //         {
    //             id: 'C',
    //             parentId: '',
    //             createdAt: 40
    //         },
    //         {
    //             id: 'AE',
    //             parentId: 'A',
    //             createdAt: 280,
    //         },
    //         {
    //             id: 'AD',
    //             parentId: 'A',
    //             createdAt: 170,
    //         },
    //         {
    //             id: 'A',
    //             parentId: '',
    //             createdAt: 5,
    //         },
    //         {
    //             id: 'CBB',
    //             parentId: 'CB',
    //             createdAt: 110,
    //         },
    //         {
    //             id: 'AAB',
    //             parentId: 'AA',
    //             createdAt: 30,
    //         },
    //         {
    //             id: 'B',
    //             parentId: '',
    //             createdAt: 30,
    //         },
    //         {
    //             id: 'AB',
    //             parentId: 'A',
    //             createdAt: 20,
    //         },
    //         {
    //             id: 'AAA',
    //             parentId: 'AA',
    //             createdAt: 20,
    //         },
    //         {
    //             id: 'ABB',
    //             parentId: 'AB',
    //             createdAt: 50,
    //         },
    //         {
    //             id: 'AC',
    //             parentId: 'A',
    //             createdAt: 160,
    //         },
    //     ];

    //     /// Comment thread expedted
    //     var expected: CommentData[] = [
    //         { id: 'A', parentId: '', createdAt: 5 },
    //         { id: 'AA', parentId: 'A', createdAt: 10 },
    //         { id: 'AAA', parentId: 'AA', createdAt: 20 },
    //         { id: 'AAAA', parentId: 'AAA', createdAt: 40 },
    //         { id: 'AAAAA', parentId: 'AAAA', createdAt: 50 },
    //         { id: 'AAAAB', parentId: 'AAAA', createdAt: 60 },
    //         { id: 'AAAAC', parentId: 'AAAA', createdAt: 70 },
    //         { id: 'AAAB', parentId: 'AAA', createdAt: 80 },
    //         { id: 'AAABA', parentId: 'AAAB', createdAt: 100 },
    //         { id: 'AAABB', parentId: 'AAAB', createdAt: 110 },
    //         { id: 'AAABBA', parentId: 'AAABB', createdAt: 120 },
    //         { id: 'AAABBB', parentId: 'AAABB', createdAt: 140 },
    //         { id: 'AAB', parentId: 'AA', createdAt: 30 },
    //         { id: 'AB', parentId: 'A', createdAt: 20 },
    //         { id: 'ABA', parentId: 'AB', createdAt: 20 },
    //         { id: 'ABB', parentId: 'AB', createdAt: 50 },
    //         { id: 'AC', parentId: 'A', createdAt: 160 },
    //         { id: 'AD', parentId: 'A', createdAt: 170 },
    //         { id: 'AE', parentId: 'A', createdAt: 280 },
    //         { id: 'B', parentId: '', createdAt: 30 },
    //         { id: 'BA', parentId: 'B', createdAt: 50 },
    //         { id: 'C', parentId: '', createdAt: 40 },
    //         { id: 'CA', parentId: 'C', createdAt: 50 },
    //         { id: 'CB', parentId: 'C', createdAt: 60 },
    //         { id: 'CBA', parentId: 'CB', createdAt: 100 },
    //         { id: 'CBB', parentId: 'CB', createdAt: 110 },
    //         { id: 'D', parentId: '', createdAt: 200 },
    //         { id: 'E', parentId: '', createdAt: 300 },
    //         { id: 'F', parentId: '', createdAt: 400 },
    //         { id: 'G', parentId: '', createdAt: 500 },
    //         { id: 'GA', parentId: 'G', createdAt: 510 },
    //         { id: 'GB', parentId: 'G', createdAt: 520 },
    //         { id: 'GBA', parentId: 'GB', createdAt: 530 },
    //         { id: 'GBB', parentId: 'GB', createdAt: 540 },
    //         { id: 'GBBA', parentId: 'GBB', createdAt: 550 },
    //         { id: 'GBBAA', parentId: 'GBBA', createdAt: 560 },
    //         { id: 'GBBAAA', parentId: 'GBBAA', createdAt: 570 },
    //         { id: 'GBBAAAA', parentId: 'GBBAAA', createdAt: 580 },
    //         { id: 'GBBAAAAA', parentId: 'GBBAAAA', createdAt: 590 },
    //         { id: 'GBBAAAAAA', parentId: 'GBBAAAAA', createdAt: 600 },
    //         { id: 'GBBAAAAAAA', parentId: 'GBBAAAAAA', createdAt: 610 },
    //         { id: 'GC', parentId: 'G', createdAt: 525 }
    //     ];

    //     var _comments = [...comments];

    //     assert.equal(comments.length, expected.length);

    //     const cmt = new Comment();


    //     /// sort comment
    //     const sorted = cmt.sortComments(_comments);


    //     // console.log('================> Comment thread before sort', _comments);
    //     // console.log('================> Comment thread after sorted', sorted);

    //     // console.log(`${_comments.length} == ${sorted.length}`);
    //     expected.forEach((v, i) => {
    //         if (v.id === void 0 || sorted[i].id === void 0) console.log('Error ===> v: ', v, 'sorted i', sorted[i]);
    //         assert(v.id, sorted[i].id);
    //     })

    // });


    it('Create some comments & sort & test with a post', async () => {

        // ===========> Create a category
        await loginAsAdmin();
        const tempCategory = {
            id: 'temp-category-id-for-comment-' + (new Date).getTime(),
            title: 'Temp Category',
        };

        const routerCategory = new Router('category.create');
        const re: CategoryDatas = await routerCategory.run({ id: tempCategory.id, title: tempCategory.title });
        assert.equal(typeof re.id === 'string', true);
        assert.equal(re.id, tempCategory.id);

        // ==========> Create a post
        await loginAsUser();
        const route = new Router('post.create');
        const post: PostData = await route.run<PostData>({ categories: [tempCategory.id] });
        assert.equal(typeof post.id === 'string', true);

        // 
        const a = await testCreateComment(post.id!, 'A');
        const b = await testCreateComment(post.id!, 'B');
        const c = await testCreateComment(post.id!, 'C');
        const aa = await testCreateComment(post.id!, 'AA', a.id);
        const ba = await testCreateComment(post.id!, 'BA', b.id);
        const ca = await testCreateComment(post.id!, 'CA', c.id);
        const baa = await testCreateComment(post.id!, 'BAA', ba.id);
        const bb = await testCreateComment(post.id!, 'BB', b.id);
        const bab = await testCreateComment(post.id!, 'BAB', ba.id);

        const d = await testCreateComment(post.id!, 'D');

        const e = await testCreateComment(post.id!, 'E');
        const f = await testCreateComment(post.id!, 'F');


        const da = await testCreateComment(post.id!, 'DA', d.id);


        const daa = await testCreateComment(post.id!, 'DAA', da.id);
        const daaa = await testCreateComment(post.id!, 'DAAA', daa.id);

        const fa = await testCreateComment(post.id!, 'FA', f.id);


        const daaaa = await testCreateComment(post.id!, 'DAAAA', daaa.id);
        const fb = await testCreateComment(post.id!, 'FB', f.id);
        const faa = await testCreateComment(post.id!, 'FAA', fa.id);



        const daaaaa = await testCreateComment(post.id!, 'DAAAAA', daaaa.id);
        const daaaaaa = await testCreateComment(post.id!, 'DAAAAAA', daaaaa.id);
        const daaaaaaa = await testCreateComment(post.id!, 'DAAAAAAA', daaaaaa.id);


        const aaa = await testCreateComment(post.id!, 'AAA', aa.id);
        const bba = await testCreateComment(post.id!, 'BBA', bb.id);


        const daaaaaaaa = await testCreateComment(post.id!, 'DAAAAAAAA', daaaaaaa.id);
        const daaaaaaaaa = await testCreateComment(post.id!, 'DAAAAAAAAA', daaaaaaaa.id);
        const daaaaaaaaaa = await testCreateComment(post.id!, 'DAAAAAAAAAA', daaaaaaaaa.id);
        const daaaaaaaaaaa = await testCreateComment(post.id!, 'DAAAAAAAAAAA', daaaaaaaaaa.id);

        const fab = await testCreateComment(post.id!, 'FAB', fa.id);


        const daaaaaaaaaab = await testCreateComment(post.id!, 'DAAAAAAAAAAB', daaaaaaaaaa.id);


        const dab = await testCreateComment(post.id!, 'DAB', da.id);

        aa; ba; ca; baa; bb; bab; d; e; f; da; daaa; fa; daaaa; fb; faa; daaaaa; daaaaaa; daaaaaaa;
        aaa; bba; daaaaaaaaaaa; fab; daaaaaaaaaab; dab;

        const expected = [
            'A',
            'AA',
            'AAA',
            'B',
            'BA',
            'BAA',
            'BAB',
            'BB',
            'BBA',
            'C',
            'CA',
            'D',
            'DA',
            'DAA',
            'DAAA',
            'DAAAA',
            'DAAAAA',
            'DAAAAAA',
            'DAAAAAAA',
            'DAAAAAAAA',
            'DAAAAAAAAA',
            'DAAAAAAAAAA',
            'DAAAAAAAAAAA',
            'DAAAAAAAAAAB',
            'DAB',
            'E',
            'F',
            'FA',
            'FAA',
            'FAB',
            'FB',
        ];

        /// Read comment directly
        /**
         * @see `post.coment.spect.ts` For reading comments by getting post llist.
         */
        const routerCommentList = new Router('comment.list');
        const sorted: CommentData[] = await routerCommentList.run(post.id);

        assert.equal(sorted.length, expected.length);
        for (let i = 0; i < sorted.length; i++) {
            assert.equal(sorted[i].content, expected[i]);
        }
    });


});
