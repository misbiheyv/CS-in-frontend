import { ROMAN_DIGITS, ARABIAN_DIGITS } from './alphabets.js';

export default function isNumber(number, numeralAlphabets) {

    // Если число отрицательное, то отсекаем минус
    number = number[0] === '-' ? Array.from(number).slice(1).join('') : number;

    const 
        alphabets = numeralAlphabets ?? [ARABIAN_DIGITS, ROMAN_DIGITS],
        alphabet = getAlphabet(number[0], alphabets), // определяем алфавит по первому знаку
        positionalAlphabet = alphabet?._positional ?? true; // является ли алфавит позиционным

    let digitArray = [];

    if (alphabet === undefined) return false; // если алфавит для первого знака не найден

    for (const digit of number) {
        const d = alphabet[normalizeNumber(digit.codePointAt(0).toString(16))]

        if (d === undefined) return false;

        digitArray.push(d);
    }

    return arrayIsNumber(digitArray, positionalAlphabet);
}

function arrayIsNumber(numberArray, positional) {
    // убеждаемся, что массив не пустой и ведущий знак не ноль
    if (numberArray[0] === undefined || numberArray.length > 1 && numberArray[0] == 0) return false;
    
    // Если алфавит позиционный, то достаточно проверить parseInt
    if (positional) return !isNaN(parseInt(numberArray.join('')));

    let temp;

    for (let i = numberArray.length - 1; i >= 0 ; i--) {
        // Если алфавит непозиционный, то проверяем, что для всех D справедливо:
        // D(n-1) >= D(n), где D - число, а n - его разряд

        if (
            isNaN(parseInt(numberArray[i])) 
            || temp && temp > numberArray[i]
        ) return false;

        temp = numberArray[i];
    }

    return true;
}

function normalizeNumber(number) {
    if (number.length > 4) throw new Error('This number can not be normalized.');

    const n = `0x${(number.length < 4 ? '0'.repeat(4 - number.length % 4).concat(number) : number).toLocaleUpperCase()}`;

    return n;
}

function getAlphabet(char, alphabets) {
    console.log(alphabets)
    for (const alphabet of alphabets) {
        if (alphabet[normalizeNumber(char.codePointAt(0).toString(16))] != undefined) {
            return alphabet;
        }
    }

    return undefined;
}