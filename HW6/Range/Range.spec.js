import Range from './Range';

describe('class Range', () => {
    test('test default and reverse iterators', () => {
        const symbolRange = new Range('a', 'f');
        expect(Array.from(symbolRange)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);

        const numberRange = new Range(-5, 1);
        expect(Array.from(numberRange.reverse())).toEqual([1, 0, -1, -2, -3, -4, -5]);
    })
});