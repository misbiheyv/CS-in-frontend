# Реализация функции, проверяющей является ли строка числом из unicode

## isNumber - функция, которая говорит, является ли заданная строка числом или нет. По дефолту имеется поддержка не только арабских цифр, но и римских цифр. Также можно любые свои кастомные алфавиты (на основе символов unicode)

### API:

- isNumber(string, alphabets?[]) - Принимает строку и опционально алфавит (по дефолту установлены арабский и римский)

## Пример использования

```js
isNumber('123') // true
isNumber('12a3') // false

isNumber('ⅯⅩⅧ') // true
isNumber('ⅧⅯⅩ') // false

isNumber('123ⅧⅯⅩ') // false

isNumber('٦٥') // false
isNumber('٦٥', [HINDU_ARABIC_DIGITS]) // true
isNumber('123', [HINDU_ARABIC_DIGITS]) // false

```