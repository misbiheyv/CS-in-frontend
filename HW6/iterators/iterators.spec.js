import {

    random,
    take,
    filter,
    enumerate,
    seq,
    zip,
    mapSeq

} from './iterators';

describe('Iterators functions', () => {
    test('take. Take first N elements of iterable structure', () => {
        expect([...take([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)]).toEqual([1, 2, 3])
        expect([...take(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 5)]).toEqual([1, 2, 3, 4, 5])
    });

    test('filter. Takes iterable structure and filterer function, returns array of filtered elements', () => {
        expect([...filter([1, 2, 3, 4], (el) => el % 2 === 0)]).toEqual([2, 4]);
        expect([...filter([10, 20, 30, 40, 50], (el) => el > 30)]).toEqual([40, 50]);
    });

    test('enumerate. Takes iterable structure and returns tuples of index and value', () => {
        expect([...enumerate([1, 2, 3])]).toEqual([[0, 1], [1, 2], [2, 3]]);
    });

    test('seq. Takes some iterable structures and returns iterator by them elements', () => {
        expect([...seq([1, 2], new Set([3, 4]), 'bla')]).toEqual([1, 2, 3, 4, 'b', 'l', 'a']);
        expect([...seq([], [1, 2], '', new Set([3, 4]), 'bla', new Set())]).toEqual([1, 2, 3, 4, 'b', 'l', 'a']);
    });

    test('zip. Takes some iterable structures and returns tuples of them elements', () => {
        expect([...zip([1, 2], new Set([3, 4]), 'bl')]).toEqual([[1, 3, 'b'], [2, 4, 'l']]);

        expect([...zip([1, 2, 3], new Set([3, 4]), 'bla')]).toEqual([[1, 3, 'b'], [2, 4, 'l']]);
    });

    test('mapSeq. Takes iterable and iterable handlers list. Returns handled values', () => {
        expect([...mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1])]).toEqual([1, 3, 5]);
    });
})