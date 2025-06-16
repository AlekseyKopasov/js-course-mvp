# Метод call()

## Основные концепции

`call()` — метод, позволяющий явно установить контекст (`this`) для вызова функции.

### Синтаксис:

```javascript
func.call(context, arg1, arg2, ...)
```

## Практические примеры

### 1. Базовое использование

```javascript
function showFullName() {
  console.log(`${this.firstName} ${this.lastName}`);
}

const user = {
  firstName: 'Иван',
  lastName: 'Петров'
};

showFullName.call(user); // "Иван Петров"
```

### 2. Передача аргументов

```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: 'Мария' };

greet.call(person, 'Привет', '!'); // "Привет, Мария!"
```

### 3. Заимствование методов (method borrowing)

```javascript
// Преобразование arguments в массив
function listArgs() {
  const args = Array.prototype.slice.call(arguments);
  console.log(args);
}

listArgs(1, 'text', true); // [1, "text", true]
```

### 4. Работа с контекстом в классах

```javascript
class Logger {
  constructor(prefix) {
    this.prefix = prefix;
  }
  
  log(message) {
    console.log(`[${this.prefix}] ${message}`);
  }
}

const appLogger = new Logger('App');
const errorLogger = new Logger('Error');

// Используем метод одного объекта в контексте другого
appLogger.log.call(errorLogger, 'Тестовое сообщение');
// Выведет: [Error] Тестовое сообщение
```

### 5. Вызов методов с разными аргументами

```javascript
function formatMessage(template, ...args) {
  return template.replace(/{(\d+)}/g, (match, index) => args[index]);
}

const messages = {
  welcome: 'Добро пожаловать, {0}! Ваш баланс: {1}',
  error: 'Ошибка: {0} в {1}'
};

// Используем один метод для разных шаблонов
console.log(formatMessage.call(null, messages.welcome, 'Иван', 1000));
// Выведет: Добро пожаловать, Иван! Ваш баланс: 1000

console.log(formatMessage.call(null, messages.error, 'Соединение прервано', '14:30'));
// Выведет: Ошибка: Соединение прервано в 14:30
```

### 6. Работа с псевдомассивами

```javascript
function findMax() {
  // Преобразуем arguments в массив и находим максимум
  return Math.max.apply(null, arguments);
}

console.log(findMax(1, 5, 3, 9, 2)); // 9
```

### 7. Вызов конструкторов

```javascript
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price, category) {
  // Вызываем конструктор Product в контексте нового объекта
  Product.call(this, name, price);
  this.category = category;
}

const apple = new Food('Яблоко', 2.5, 'Фрукты');
console.log(apple); // { name: 'Яблоко', price: 2.5, category: 'Фрукты' }
```

### 8. Работа с DOM-элементами

```javascript
const elements = document.querySelectorAll('.item');

// Применяем метод массива к коллекции DOM-элементов
Array.prototype.forEach.call(elements, (element, index) => {
  element.style.backgroundColor = index % 2 === 0 ? '#f0f0f0' : '#ffffff';
});
```

## Особенности работы

1. В нестрогом режиме:
   - `null` и `undefined` заменяются на глобальный объект
   - Примитивы преобразуются в объекты
2. В строгом режиме:
   - Значения передаются как есть

## Сравнение с другими методами

| Метод | Вызов функции | Аргументы | Возвращает |
|-------|---------------|-----------|------------|
| call | Немедленно | Через запятую | Результат функции |
| apply | Немедленно | Массив | Результат функции |
| bind | Позже | Через запятую | Новую функцию |

## Полезные применения

### 1. Вызов родительского конструктора

```javascript
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}
```

### 2. Работа с псевдомассивами

```javascript
function getMax() {
  return Math.max.apply(null, arguments);
}

console.log(getMax(1, 3, 2)); // 3
```

> Метод `call()` — мощный инструмент для управления контекстом выполнения функций в JavaScript.

----

## Домашнее задание

### Уровень 1
**1. Базовое использование call()**

Создайте функцию `showAge`, которая выводит в консоль строку вида "Мой возраст: [age]", где `age` берется из контекста.  
Создайте объект `person` с свойством `age` и вызовите `showAge` с контекстом этого объекта.

**2. Передача аргументов**

Создайте функцию `introduce` которая принимает два параметра (город, профессия) и выводит:  
"Я [name], я из [город] и работаю [профессия]".  
Вызовите ее с контекстом объекта `{name: "Анна"}` и аргументами "Москва", "разработчик".

----

### Уровень 2
**3. Заимствование метода**

Дан объект `calculator` с методом `sum(a, b)`.  
Создайте объект `mathOperations` без этого метода, но вызовите `sum` с контекстом `mathOperations`.

**4. Работа с псевдомассивами**

Создайте функцию `getMin`, которая использует `Math.min` и `call` для нахождения минимального значения среди аргументов (не массив!).

----

### Уровень 3
**5. Цепочка вызовов**

Создайте три объекта с разными значениями свойства `id`.  
Напишите функцию `logId`, которая выводит `id` текущего контекста.  
Вызовите ее последовательно для всех трех объектов.

**6. Наследование конструкторов**

Создайте конструктор `Animal` с параметрами `name` и `speed`.  
Создайте конструктор `Rabbit`, который вызывает `Animal.call` и добавляет свойство `jumpHeight`.

----

### Уровень 4
**7. Динамический контекст**

Напишите функцию `bindContext(func, context)`, которая:  
* Принимает функцию и контекст  
* Возвращает новую функцию, которая вызывает оригинальную с нужным контекстом (аналог bind)

**8. Полифил для call()**

Реализуйте собственную версию метода `call` (myCall), которая будет работать аналогично встроенному.

----

### Уровень 5
**9. Композиция функций**

Создайте функцию `compose`, которая:  
* Принимает несколько функций  
* Возвращает новую функцию, которая последовательно вызывает их с передачей контекста через `call`

**10. Декоратор методов**

Создайте декоратор `decorateWithCall`, который:  
* Принимает метод объекта  
* Возвращает новый метод, вызывающий оригинальный с фиксированным контекстом

----

### Бонусное задание
**11. Каррирование через call**

Реализуйте функцию `curry` с использованием `call`, которая:  
* Преобразует функцию от многих аргументов в последовательность функций от одного аргумента  
* Сохраняет контекст вызова

## Важно помнить

- `call()` позволяет явно указать контекст выполнения функции
- Первый аргумент `call()` определяет значение `this`
- Последующие аргументы передаются в функцию
- `call()` полезен для заимствования методов у других объектов
- В строгом режиме значение `this` не преобразуется в объект
