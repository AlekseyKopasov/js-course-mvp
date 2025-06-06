const n=`# Метод forEach

## Основные сведения

Метод \`forEach\` — один из перебирающих методов массивов в JavaScript. Он выполняет обход элементов массива и вызывает указанную функцию для каждого элемента.

### Особенности:
- Не возвращает значение (возвращает \`undefined\`)
- Принимает callback-функцию с тремя аргументами:
  1. Текущий элемент массива
  2. Индекс элемента
  3. Сам массив

## Примеры использования

### 1. Базовый пример

\`\`\`javascript
const array = [1, 2, 3, 4, 5];
const newArray = [];

array.forEach(item => {
  newArray.push(item ** 2);
});

console.log(newArray); // [1, 4, 9, 16, 25]
\`\`\`

### 2. Суммирование элементов

\`\`\`javascript
let counter = 0;
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

numbers.forEach(num => {
  counter += num;
});

console.log(counter); // 55
\`\`\`

### 3. Работа с JSON-данными

\`\`\`javascript
const users = [
  { id: 1, name: "Анна" },
  { id: 2, name: "Иван" },
  { id: 3, name: "Мария" }
];

const names = [];
const getNames = user => names.push(user.name);

users.forEach(getNames);
console.log(names); // ["Анна", "Иван", "Мария"]
\`\`\`

## Важно помнить

- \`forEach\` не изменяет исходный массив (но может изменять элементы, если они объекты)
- Для досрочного прекращения перебора нужно использовать исключение (в отличие от \`for...of\`, где можно использовать \`break\`)
- Для преобразования массива лучше подходят \`map\`, \`filter\` или \`reduce\`

> Метод \`forEach\` идеально подходит для случаев, когда нужно просто выполнить операцию для каждого элемента массива без необходимости возвращать новый массив.

`;export{n as default};
//# sourceMappingURL=01-forEach-NcLoR8BC.js.map
