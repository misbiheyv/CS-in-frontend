const ARABIAN_DIGITS = {
    _positional: true,
    '0x0030': 0,
    '0x0031': 1,
    '0x0032': 2,
    '0x0033': 3,
    '0x0034': 4,
    '0x0035': 5,
    '0x0036': 6,
    '0x0037': 7,
    '0x0038': 8,
    '0x0039': 9,
}

const ROMAN_DIGITS = {
    _positional: false,
    '0x2160': 1,
    '0x2161': 2,
    '0x2162': 3,
    '0x2163': 4,
    '0x2164': 5,
    '0x2165': 6,
    '0x2166': 7,
    '0x2167': 8,
    '0x2168': 9,
    '0x2169': 10,
    '0x216A': 11,
    '0x216B': 12,
    '0x216C': 50,
    '0x216D': 100,
    '0x216E': 500,
    '0x216F': 1000,
    '0x2180': 1000,
    '0x2181': 5000,
    '0x2182': 10000,
}

function isDigit(number, numeralAlphabets) {

    // Если число отрицательное, то отсекаем минус
    number = number[0] === '-' ? number.split('').slice(1).join('') : number;

    const 
        alphabets = numeralAlphabets ?? [ARABIAN_DIGITS, ROMAN_DIGITS],
        alphabet = getAlphabet(number[0], alphabets), // определяем алфавит по первому знаку
        positionalAlphabet = alphabet._positional ?? true; // является ли алфавит позиционным

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
    for (const alphabet of alphabets) {
        if (alphabet[normalizeNumber(char.codePointAt(0).toString(16))] != undefined) {
            return alphabet;
        }
    }

    return undefined;
}


console.log(isDigit('-123123')) // true

console.log(isDigit('123123')) // true

console.log(isDigit('ⅭⅩⅩⅢ')) // true

console.log(isDigit('Ⅻ'))  // true

console.log(isDigit('0'))  // true

console.log(isDigit('ⅭⅩⅫⅩⅢ')) // false

console.log(isDigit('0123123')) // false

console.log(isDigit('ⅭⅩⅩⅢ123123')) // false
