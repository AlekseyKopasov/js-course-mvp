# Псевдомассив arguments

## Основные концепции

**arguments** — это объект, доступный внутри функций, который содержит все переданные аргументы.

### Особенности:
- Доступен во всех функциях (кроме стрелочных)
- Является псевдомассивом (имеет `length` и числовые индексы)
- Не поддерживает методы массивов (`push`, `map` и т.д.)
- Тип — `object` (не `array`)

## Практические примеры

### 1. Базовое использование

```javascript
function showArgs() {
  console.log(arguments); // Псевдомассив аргументов
  console.log(arguments.length); // Количество аргументов
  console.log(typeof arguments); // "object"
}

showArgs(1, 'text', true);
// Arguments(3) [1, "text", true]
// 3
// "object"
```

### 2. Преобразование в настоящий массив

```javascript
// Способ 1: цикл for
function convertToArray() {
  const arr = [];
  for (let i = 0; i < arguments.length; i++) {
    arr.push(arguments[i]);
  }
  return arr;
}

// Способ 2: Array.from (ES6)
const argsArray = Array.from(arguments);

// Способ 3: spread оператор (ES6)
const argsArray = [...arguments];
```

### 3. Функция с переменным числом аргументов

```javascript
function joinWithSeparator(separator) {
  const parts = [];
  // Начинаем с 1, так как 0-й аргумент - separator
  for (let i = 1; i < arguments.length; i++) {
    parts.push(arguments[i]);
  }
  return parts.join(separator);
}

console.log(joinWithSeparator(' - ', 'a', 'b', 'c')); // "a - b - c"
```

## Современные альтернативы (ES6+)

### Rest параметры

```javascript
function modernFunction(...args) {
  // args — настоящий массив
  console.log(args.map(x => x * 2));
}
```

### Отличия от rest параметров:

| Характеристика | arguments | Rest параметры |
|----------------|-----------|----------------|
| Тип | Псевдомассив | Настоящий массив |
| Доступность | Все функции | Только при объявлении |
| Стрелочные функции | ❌ Нет | ✅ Да |
| Явное объявление | ❌ Нет | ✅ Да |

## Важные замечания

1. В строгом режиме (`'use strict'`) `arguments` не связан с параметрами функции
2. Не рекомендуется использовать в новом коде (лучше rest параметры)
3. Может быть полезен при работе с legacy-кодом

> Псевдомассив `arguments` — важная часть JavaScript, хотя в современном коде предпочтительнее использовать rest параметры.

