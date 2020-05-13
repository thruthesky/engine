
// import { Router } from '../router/router';

import * as assert from 'assert';
import { CommentData } from './comment.interfaces';
import { Comment } from './comment';


describe('Comment', function () {
    this.timeout(10000);

    it('Sort comment', async () => {


        /// Comment thread before sorting
        const comments: CommentData[] = [

            { id: 'GA', parentId: 'G', createdAt: 510 },
            {
                id: 'G',
                parentId: '',
                createdAt: 500,
            },
            { id: 'GBB', parentId: 'GB', createdAt: 540 },
            { id: 'GBBAAA', parentId: 'GBBAA', createdAt: 570 },
            {
                id: 'CBA',
                parentId: 'CB',
                createdAt: 100,
            },
            {
                id: 'CA',
                parentId: 'C',
                createdAt: 50,
            },
            { id: 'GBBAAAAAAA', parentId: 'GBBAAAAAA', createdAt: 610 },
            { id: 'GC', parentId: 'G', createdAt: 525 },
            {
                id: 'E',
                parentId: '',
                createdAt: 300,
            },
            { id: 'GBBA', parentId: 'GBB', createdAt: 550 },
            { id: 'GBBAAAA', parentId: 'GBBAAA', createdAt: 580 },
            {
                id: 'BA',
                parentId: 'B',
                createdAt: 50
            },
            {
                id: 'CB',
                parentId: 'C',
                createdAt: 60,
            },
            { id: 'GBBAAAAA', parentId: 'GBBAAAA', createdAt: 590 },
            { id: 'GB', parentId: 'G', createdAt: 520 },
            {
                id: 'D',
                parentId: '',
                createdAt: 200,
            },

            { id: 'GBA', parentId: 'GB', createdAt: 530 },
            {
                id: 'F',
                parentId: '',
                createdAt: 400,
            },
            { id: 'GBBAAAAAA', parentId: 'GBBAAAAA', createdAt: 600 },
            { id: 'GBBAA', parentId: 'GBBA', createdAt: 560 },
            {
                id: 'AA',
                parentId: 'A',
                createdAt: 10,
            },
            {
                id: 'ABA',
                parentId: 'AB',
                createdAt: 20,
            },
            {
                id: 'AAAAB',
                parentId: 'AAAA',
                createdAt: 60,
            },
            {
                id: 'AAAAC',
                parentId: 'AAAA',
                createdAt: 70,
            },
            {
                id: 'AAAAA',
                parentId: 'AAAA',
                createdAt: 50,
            },
            {
                id: 'AAAA',
                parentId: 'AAA',
                createdAt: 40,
            },
            {
                id: 'AAAB',
                parentId: 'AAA',
                createdAt: 80,
            },
            {
                id: 'AAABA',
                parentId: 'AAAB',
                createdAt: 100,
            },
            {
                id: 'AAABB',
                parentId: 'AAAB',
                createdAt: 110,
            },
            {
                id: 'AAABBB',
                parentId: 'AAABB',
                createdAt: 140,
            },
            {
                id: 'AAABBA',
                parentId: 'AAABB',
                createdAt: 120,
            },
            {
                id: 'C',
                parentId: '',
                createdAt: 40
            },
            {
                id: 'AE',
                parentId: 'A',
                createdAt: 280,
            },
            {
                id: 'AD',
                parentId: 'A',
                createdAt: 170,
            },
            {
                id: 'A',
                parentId: '',
                createdAt: 5,
            },
            {
                id: 'CBB',
                parentId: 'CB',
                createdAt: 110,
            },
            {
                id: 'AAB',
                parentId: 'AA',
                createdAt: 30,
            },
            {
                id: 'B',
                parentId: '',
                createdAt: 30,
            },
            {
                id: 'AB',
                parentId: 'A',
                createdAt: 20,
            },
            {
                id: 'AAA',
                parentId: 'AA',
                createdAt: 20,
            },
            {
                id: 'ABB',
                parentId: 'AB',
                createdAt: 50,
            },
            {
                id: 'AC',
                parentId: 'A',
                createdAt: 160,
            },
        ];

        /// Comment thread expedted
        var expected: CommentData[] = [
            { id: 'A', parentId: '', createdAt: 5 },
            { id: 'AA', parentId: 'A', createdAt: 10 },
            { id: 'AAA', parentId: 'AA', createdAt: 20 },
            { id: 'AAAA', parentId: 'AAA', createdAt: 40 },
            { id: 'AAAAA', parentId: 'AAAA', createdAt: 50 },
            { id: 'AAAAB', parentId: 'AAAA', createdAt: 60 },
            { id: 'AAAAC', parentId: 'AAAA', createdAt: 70 },
            { id: 'AAAB', parentId: 'AAA', createdAt: 80 },
            { id: 'AAABA', parentId: 'AAAB', createdAt: 100 },
            { id: 'AAABB', parentId: 'AAAB', createdAt: 110 },
            { id: 'AAABBA', parentId: 'AAABB', createdAt: 120 },
            { id: 'AAABBB', parentId: 'AAABB', createdAt: 140 },
            { id: 'AAB', parentId: 'AA', createdAt: 30 },
            { id: 'AB', parentId: 'A', createdAt: 20 },
            { id: 'ABA', parentId: 'AB', createdAt: 20 },
            { id: 'ABB', parentId: 'AB', createdAt: 50 },
            { id: 'AC', parentId: 'A', createdAt: 160 },
            { id: 'AD', parentId: 'A', createdAt: 170 },
            { id: 'AE', parentId: 'A', createdAt: 280 },
            { id: 'B', parentId: '', createdAt: 30 },
            { id: 'BA', parentId: 'B', createdAt: 50 },
            { id: 'C', parentId: '', createdAt: 40 },
            { id: 'CA', parentId: 'C', createdAt: 50 },
            { id: 'CB', parentId: 'C', createdAt: 60 },
            { id: 'CBA', parentId: 'CB', createdAt: 100 },
            { id: 'CBB', parentId: 'CB', createdAt: 110 },
            { id: 'D', parentId: '', createdAt: 200 },
            { id: 'E', parentId: '', createdAt: 300 },
            { id: 'F', parentId: '', createdAt: 400 },
            { id: 'G', parentId: '', createdAt: 500 },
            { id: 'GA', parentId: 'G', createdAt: 510 },
            { id: 'GB', parentId: 'G', createdAt: 520 },
            { id: 'GBA', parentId: 'GB', createdAt: 530 },
            { id: 'GBB', parentId: 'GB', createdAt: 540 },
            { id: 'GBBA', parentId: 'GBB', createdAt: 550 },
            { id: 'GBBAA', parentId: 'GBBA', createdAt: 560 },
            { id: 'GBBAAA', parentId: 'GBBAA', createdAt: 570 },
            { id: 'GBBAAAA', parentId: 'GBBAAA', createdAt: 580 },
            { id: 'GBBAAAAA', parentId: 'GBBAAAA', createdAt: 590 },
            { id: 'GBBAAAAAA', parentId: 'GBBAAAAA', createdAt: 600 },
            { id: 'GBBAAAAAAA', parentId: 'GBBAAAAAA', createdAt: 610 },
            { id: 'GC', parentId: 'G', createdAt: 525 }
        ];

        var _comments = [ ...comments];

        assert.equal(comments.length, expected.length);

        const cmt = new Comment();


        /// sort comment
        const sorted = cmt.sortComments(_comments);


        // console.log('================> Comment thread before sort', _comments);
        // console.log('================> Comment thread after sorted', sorted);

        // console.log(`${_comments.length} == ${sorted.length}`);
        expected.forEach((v, i) => {
            if (v.id === void 0 || sorted[i].id === void 0) console.log('Error ===> v: ', v, 'sorted i', sorted[i]);
            assert(v.id, sorted[i].id);
        })

    });


    // it('Dangling comment test', () => {
    //     var comments: CommentData[] = [
    //         { id: 'A', parentId: '', createdAt: 5 },
    //         { id: 'B', parentId: '', createdAt: 10 },
    //         { id: 'BA', parentId: 'B', createdAt: 10 },
    //         { id: 'BAA', parentId: 'BAAA', createdAt: 10 },
    //         { id: 'BAAA', parentId: 'BAA', createdAt: 10 },

    //         { id: 'BAB', parentId: 'BA', createdAt: 10 },
    //         {id: 'BAC', parentId: 'BA', createdAt: 200},
    //         { id: 'BB', parentId: 'B', createdAt: 10 },
    //         { id: 'C', parentId: '', createdAt: 20 },
    //     ];

    //     const cmt = new Comment();
    //     const sorted = cmt.sortComments(comments);

    //     console.log(sorted);
    // });

});
