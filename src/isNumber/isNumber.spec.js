import isNumber from './isNumber';
import { HINDU_ARABIC_DIGITS } from './alphabets';

describe('isNumber function', () => {

    test('valid arabian positive, negative and zero numbers', () => {
        expect(isNumber('1000')).toBe(true)

        expect(isNumber('-1000')).toBe(true)

        expect(isNumber('0')).toBe(true)
    })

    test('invalid arabian positive, negative numbers', () => {
        expect(isNumber('01000')).toBe(false)

        expect(isNumber('-01000')).toBe(false)

        expect(isNumber('010a00')).toBe(false)

        expect(isNumber('010-00')).toBe(false)
    })

    test('valid roman numbers', () => {
        expect(isNumber('Ⅷ')).toBe(true)

        expect(isNumber('ⅯⅩⅩⅧ')).toBe(true)

        expect(isNumber('ↂⅯⅩⅩⅧ')).toBe(true)
    })

    test('invalid roman numbers', () => {
        expect(isNumber('Ⅹ-Ⅷ')).toBe(false)

        expect(isNumber('ⅩⅧa')).toBe(false)
    })

    test('roman numbers with breaking digits order', () => {
        expect(isNumber('ⅧⅯ')).toBe(false)

        expect(isNumber('ⅩⅧⅯ')).toBe(false)

        expect(isNumber('ⅩⅧⅯ')).toBe(false)
    })


    test('invalid numbers with alphabets mix', () => {
        expect(isNumber('1Ⅿ')).toBe(false)

        expect(isNumber('ⅩⅧⅯ100')).toBe(false)

        expect(isNumber('ⅩⅧ12312Ⅿ')).toBe(false)
    })


    test('using other alphabet', () => {
        expect(isNumber('٦٥', [HINDU_ARABIC_DIGITS])).toBe(true)

        expect(isNumber('٥٦', [HINDU_ARABIC_DIGITS])).toBe(true)

        expect(isNumber('1٦٥', [HINDU_ARABIC_DIGITS])).toBe(false)

        expect(isNumber('٦Ⅷa٥', [HINDU_ARABIC_DIGITS])).toBe(false)

        expect(isNumber('1', [HINDU_ARABIC_DIGITS])).toBe(false)

        expect(isNumber('Ⅷ', [HINDU_ARABIC_DIGITS])).toBe(false)
    })

})