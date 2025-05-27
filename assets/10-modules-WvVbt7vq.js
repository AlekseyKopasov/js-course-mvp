const n=`# Модули

## Основные концепции

**Модуль** — это паттерн проектирования, который позволяет:
- Инкапсулировать реализацию
- Избегать конфликтов имен
- Контролировать доступ к функциональности

## Проблема глобального пространства имен

\`\`\`javascript
// Без модуля (переменные в глобальной области видимости)
var message = "Hello";
function showMessage() {
  console.log(message);
}

// Может перезаписать существующую переменную message
\`\`\`

## Решение: Immediately Invoked Function Expression (IIFE)

### Базовый шаблон

\`\`\`javascript
(function() {
  var message = "Hello";
  
  function showMessage() {
    console.log(message);
  }
  
  showMessage();
})();
\`\`\`

### Варианты синтаксиса IIFE

\`\`\`javascript
// 1. Классический вариант
(function() { /* code */ })();

// 2. С оператором
+function() { /* code */ }();

// 3. С восклицательным знаком
!function() { /* code */ }();

// 4. Альтернативный вариант
(function() { /* code */ }());
\`\`\`

### Экспорт функциональности

\`\`\`javascript
var myModule = (function() {
  var privateVar = "Привет";
  
  function privateMethod() {
    console.log(privateVar);
  }
  
  return {
    publicMethod: function() {
      privateMethod();
    }
  };
})();

myModule.publicMethod(); // "Привет"
\`\`\`

## Современные модули (ES6+)

### Экспорт

\`\`\`javascript
// module.js
const privateVar = "Секретные данные";

export function publicMethod() {
  console.log(privateVar);
}
\`\`\`

### Импорт

\`\`\`javascript
// main.js
import { publicMethod } from './module.js';

publicMethod(); // "Секретные данные"
\`\`\`

## Преимущества модулей

1. Изоляция кода — переменные не попадают в глобальную область видимости
2. Инкапсуляция — скрытие внутренней реализации
3. Переиспользование — модули можно легко подключать в разных проектах
4. Тестируемость — модули можно тестировать независимо

## Практический пример

### Создание счетчика

\`\`\`javascript
var counterModule = (function() {
  var count = 0;
  
  return {
    increment: function() {
      return ++count;
    },
    reset: function() {
      count = 0;
    },
    getCount: function() {
      return count;
    }
  };
})();

console.log(counterModule.increment()); // 1
console.log(counterModule.getCount()); // 1
counterModule.reset();
\`\`\`

> Модули — это фундаментальный паттерн JavaScript, позволяющий создавать структурированный и поддерживаемый код.

`;export{n as default};
//# sourceMappingURL=10-modules-WvVbt7vq.js.map
