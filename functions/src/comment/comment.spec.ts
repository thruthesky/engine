
// import { Router } from '../router/router';

// import * as assert from 'assert';
import { CommentData } from './comment.interfaces';
import { Comment } from './comment';


describe('Comment', function () {
    this.timeout(10000);

    it('Sort comment', async () => {

        const comments: CommentData[] = [

            {
                id: 'G',
                parentId: '',
                createdAt: 500,
            },
            {
                id: 'E',
                parentId: '',
                createdAt: 300,
            },
            {
                id: 'F',
                parentId: '',
                createdAt: 400,
            },
            {
                id: 'D',
                parentId: '',
                createdAt: 200,
            },

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

        const cmt = new Comment();

        console.log('================> before', comments);
        const sorted = cmt.sortComments(comments);

        console.log('================> After', sorted);

    });


});
