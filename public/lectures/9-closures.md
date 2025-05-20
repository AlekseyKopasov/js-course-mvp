# Замыкания в JavaScript

**Замыкание** — функция вместе со всеми внешними переменными, которые ей доступны.

## Лексическое окружение
- Каждая функция создает объект `LexicalEnvironment`
- Содержит: аргументы, локальные переменные и ссылку на внешнее окружение (`[[Scope]]`)
- Пример:

```js
function makeCounter() {
  let count = 0;
  return function() {
    return count++;
  };
}

const counter = makeCounter();
console.log(counter()); // 0
console.log(counter()); // 1