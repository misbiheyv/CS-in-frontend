import * as regex from './regex';

const str = `
Какой-то текст (10 + 15 - 24) ** 2
Еще какой-то текст 2 * 10
`;

const calculatedStr = `
Какой-то текст 1
Еще какой-то текст 20
`;

describe('regex', () => {
    test('function check the string has different symbols of latin, digits, dollar sign and slash.', () => {
        expect(regex.isLatinNumericOrDollar('вфвфвыфвф123ы')).toBe(false)
        expect(regex.isLatinNumericOrDollar('asd$_123')).toBe(true)
    })

    test('function split the string by symbols: "." "," ";" and spaces.', () => {
        expect(regex.split('foo    bla.bar,gd;4')).toEqual(['foo', 'bla', 'bar', 'gd', '4'])
    })

    test('function split the string by symbols: "." "," ";" and spaces.', () => {
        expect(regex.format('Hello, ${user}! Your age is ${age}.', {user: 'Misha', age: 20})).toBe('Hello, Misha! Your age is 20.')
    })

    test('Remove a groups of repeating 1-3 symbols.', () => {
        expect(regex.normalize('aaaabbbbczzzz')).toBe('abcz');
        expect(regex.normalize('abababbbabcabc')).toBe('abbabc');
        expect(regex.normalize('foofoobabaaaazze')).toBe('foobaaze');
    })

    test('Calculate math expressions in string and replace them by result.', () => {
        expect(regex.calc(str)).toBe(calculatedStr)
    })
})
