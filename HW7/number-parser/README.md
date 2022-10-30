# Потоковый парсер чисел на основе генератора numberParser:

## API экземпляра парсера:

- next(value) - принимает строку - чанк числа, возвращает собранные чанки

- return() - завершает выполнение, возвращает итоговое число

## Пример использования:

```js
const parser = numberParser();

parser.next('-');   // {value: '-', done: false}
parser.next('14');  // {value: '-14', done: false}
parser.next('.');   // {value: '-14.', done: false}
parser.next('53');  // {value: '-14.53', done: false}
parser.next('e-');  // {value: '-14.54e-', done: false}
parser.next('454'); // {value: '-14.54e-454', done: false}

parser.return();    // {value: -14.53e-454, done: true}
```