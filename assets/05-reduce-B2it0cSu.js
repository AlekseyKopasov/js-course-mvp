const n=`# Методы reduce() и reduceRight()

## Основные концепции

Методы \`reduce()\` и \`reduceRight()\` используются для преобразования массива в единственное значение (свертка массива).

### Ключевые различия:

| Метод | Направление обхода | Аргументы callback |
|-------|-------------------|-------------------|
| reduce() | Слева направо | accumulator, currentValue, index, array |
| reduceRight() | Справа налево | accumulator, currentValue, index, array |

## Синтаксис

\`\`\`javascript
array.reduce(callback[, initialValue])
array.reduceRight(callback[, initialValue])
\`\`\`

## Практические примеры

### 1. Суммирование элементов

\`\`\`javascript
const numbers = [10, 20, 30, 40];

// Без начального значения
const sum1 = numbers.reduce((acc, curr) => acc + curr); 
// 100 (10 + 20 + 30 + 40)

// С начальным значением
const sum2 = numbers.reduce((acc, curr) => acc + curr, 10); 
// 110 (10 + 10 + 20 + 30 + 40)
\`\`\`

### 2. Преобразование многомерного массива

\`\`\`javascript
const matrix = [[1, 2], [3, 4], [5, 6]];

// С использованием concat
const flat1 = matrix.reduce((acc, curr) => acc.concat(curr), []);

// С использованием spread оператора
const flat2 = matrix.reduce((acc, curr) => [...acc, ...curr], []);

// Оба варианта возвращают [1, 2, 3, 4, 5, 6]
\`\`\`

### 3. Агрегация данных из объектов

\`\`\`javascript
const friends = [
  {name: 'Anna', books: ['1984', 'Метро 2033']},
  {name: 'Ivan', books: ['Война и мир']},
  {name: 'Maria', books: ['Гарри Поттер', 'Властелин колец']}
];

const allBooks = friends.reduce((acc, friend) => [...acc, ...friend.books], []);
// ['1984', 'Метро 2033', 'Война и мир', 'Гарри Поттер', 'Властелин колец']
\`\`\`

## Особенности работы

### 1. Начальное значение (initialValue):
- Если не указано, первый элемент становится начальным значением
- Рекомендуется всегда указывать для сложных операций

### 2. Порядок обработки:
- \`reduce()\`: первый → последний элемент
- \`reduceRight()\`: последний → первый элемент

### 3. Пустые массивы:
- Вызов без initialValue на пустом массиве вызывает ошибку
- С initialValue - возвращает initialValue

## Применение в реальных проектах

### 1. Статистические вычисления

\`\`\`javascript
const stats = [4.5, 3.2, 6.7, 2.1];
const avg = stats.reduce((sum, val) => sum + val, 0) / stats.length;
\`\`\`

### 2. Композиция функций

\`\`\`javascript
const compose = (...funcs) => x => funcs.reduceRight((acc, fn) => fn(acc), x);
\`\`\`

### 3. Группировка данных

\`\`\`javascript
const items = ['apple', 'banana', 'orange', 'apple'];
const count = items.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});
// {apple: 2, banana: 1, orange: 1}
\`\`\`

> Методы \`reduce()\` и \`reduceRight()\` - мощные инструменты для обработки данных, которые позволяют элегантно решать сложные задачи преобразования массивов.

`;export{n as default};
//# sourceMappingURL=05-reduce-B2it0cSu.js.map
