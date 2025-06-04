const n=`# Метод bind()

## Основные концепции

\`bind()\` создает новую функцию с привязанным контекстом \`this\` и/или фиксированными аргументами.

### Синтаксис:

\`\`\`javascript
const boundFunc = originalFunc.bind(context, arg1, arg2, ...)
\`\`\`

## Проблема потери контекста

### Пример с \`setTimeout\`

\`\`\`javascript
const user = {
  name: 'Анна',
  sayHi() {
    console.log(\`Привет, \${this.name}!\`);
  }
};

// Потеря контекста
setTimeout(user.sayHi, 1000); // "Привет, undefined!"

// Решение с bind
setTimeout(user.sayHi.bind(user), 1000); // "Привет, Анна!"
\`\`\`

## Практические примеры

### 1. Фиксация контекста

\`\`\`javascript
function showSum(a, b) {
  console.log(\`\${this.title}: \${a + b}\`);
}

const calculator = { title: 'Сумма' };
const boundShowSum = showSum.bind(calculator);

boundShowSum(2, 3); // "Сумма: 5"
\`\`\`

### 2. Фиксация аргументов (каррирование)

\`\`\`javascript
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10
\`\`\`

### 3. Обработчики событий

\`\`\`javascript
const app = {
  data: ['React', 'Vue', 'Angular'],
  showFirst() {
    console.log(this.data[0]);
  }
};

document.querySelector('button')
  .addEventListener('click', app.showFirst.bind(app)); 
  // "React" при клике
\`\`\`

## Особенности работы

1. Не вызывает функцию сразу — возвращает новую функцию
2. Фиксирует контекст навсегда — нельзя переопределить
3. Позволяет частичное применение (фиксация первых аргументов)

## Сравнение методов управления контекстом

| Метод | Вызов | Аргументы | Возвращает | Фиксирует контекст |
|-------|-------|-----------|------------|-------------------|
| call | Да | Список | Результат | Нет |
| apply | Да | Массив | Результат | Нет |
| bind | Нет | Список | Функцию | Да |

## Современные альтернативы (ES6+)

### Стрелочные функции

\`\`\`javascript
// Аналог bind с стрелочной функцией
setTimeout(() => user.sayHi(), 1000);
\`\`\`

## Применение метода \`bind()\`

Метод \`bind()\` — мощный инструмент для:
- Гарантированного сохранения контекста
- Создания специализированных функций
- Работы с асинхронными вызовами
- Реализации каррирования
`;export{n as default};
//# sourceMappingURL=13-bind-Dez3AFpo.js.map
