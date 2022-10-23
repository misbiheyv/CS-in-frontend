# Функции для работы с iterable объектами:

- random(min, max) - принимает границы диапазона чисел, генерирует случайное число на каждой итерации

- take(iterable, count) - принимает iterable и количество элементов, которые нужно вернуть

- filter(iterable, filterFn) - принимает iterable и функцию фильтрации, возвращает отфильтрованные элементы

- enumerate(iterable) - принимает iterable и возвращает пары из индекса и значения

- seq(...iterable) - принимает множество iterable и возвращает итератор по их элементам

- zip(...iterable) - принимает множество iterable и возвращает итератор по кортежам их элементов

- mapSeq(iterable, iterableFn) - принимает iterable и iterable с функциями и возвращает итератор где каждому элементу iterable последовательно применяются все функции из iterableFn

# Класс Range:

- позволяет создавать диапазоны чисел или символов, а также обходить элементы Range с любого конца

## Пример использования:

```js
const symbolRange = new Range('a', 'f');
console.log(Array.from(symbolRange)); // ['a', 'b', 'c', 'd', 'e', 'f']

const numberRange = new Range(-5, 1);
console.log(Array.from(numberRange.reverse())); // [1, 0, -1, -2, -3, -4, -5]
```