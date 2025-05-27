const n=`# Метод apply()

## Основные концепции

\`apply()\` — метод, аналогичный \`call()\`, но принимающий аргументы в виде массива.

### Синтаксис:

\`\`\`javascript
func.apply(context, [arg1, arg2, ...])
\`\`\`

## Практические примеры

### 1. Базовое использование

\`\`\`javascript
function introduce(greeting, punctuation) {
  console.log(\`\${greeting}, я \${this.name}\${punctuation}\`);
}

const person = { name: 'Анна' };

introduce.apply(person, ['Привет', '!']); 
// "Привет, я Анна!"
\`\`\`

### 2. Суммирование элементов массива

\`\`\`javascript
function sum(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
console.log(sum.apply(null, numbers)); // 6
\`\`\`

### 3. Нахождение максимального значения

\`\`\`javascript
const values = [12, 5, 8, 130, 44];
const max = Math.max.apply(null, values);
console.log(max); // 130

// Современная альтернатива (ES6):
console.log(Math.max(...values)); // 130
\`\`\`

## Особенности работы

### 1. Работа с динамическими аргументами

\`\`\`javascript
function dynamicSum() {
  return Array.prototype.reduce.call(arguments, (a, b) => a + b);
}

const args = [1, 2, 3, 4];
console.log(dynamicSum.apply(null, args)); // 10
\`\`\`

### 2. Использование с псевдомассивами

\`\`\`javascript
function logArgs() {
  console.log(Array.prototype.join.apply(arguments, [' | ']));
}

logArgs('JavaScript', 'React', 'Node'); 
// "JavaScript | React | Node"
\`\`\`

## Сравнение с \`call()\`

| Ситуация | \`call()\` | \`apply()\` |
|----------|----------|-----------|
| Передача аргументов | Через запятую | Массивом |
| Динамические аргументы | Неудобно | Идеально |
| Работа с \`arguments\` | Требуется преобразование | Прямая передача |

## Современные альтернативы (ES6+)

### 1. Spread оператор

\`\`\`javascript
// Вместо apply:
const nums = [1, 2, 3];
console.log(Math.max(...nums)); // 3
\`\`\`

### 2. Деструктуризация

\`\`\`javascript
function logUser([firstName, lastName]) {
  console.log(\`\${firstName} \${lastName}\`);
}

const userData = ['Иван', 'Петров'];
logUser(userData); // "Иван Петров"
\`\`\`

> Метод \`apply()\` особенно полезен при работе с функциями, принимающими переменное число аргументов, и при необходимости передачи готового массива параметров.

`;export{n as default};
//# sourceMappingURL=12-apply-C_XyNL7-.js.map
