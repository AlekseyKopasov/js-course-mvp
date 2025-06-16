# Каррирование (Currying)

## Основные концепции

**Каррирование** — это техника преобразования функции с несколькими аргументами в последовательность функций с одним аргументом.

### Ключевые особенности:
- Фиксация части аргументов
- Создание специализированных функций
- Постепенное применение аргументов

## Реализация через `bind()`

### Базовый пример умножения

```javascript
function multiply(a, b) {
  return a * b;
}

// Фиксация первого аргумента
const double = multiply.bind(null, 2);
console.log(double(5)); // 10

const triple = multiply.bind(null, 3);
console.log(triple(5)); // 15
```

## Практические примеры

### 1. Функция приветствия

```javascript
function greet(gender, age, name) {
  return `${gender === 'male' ? 'Уважаемый' : 'Уважаемая'} ${name}, ${age} лет`;
}

// Фиксация аргументов
const greetMale = greet.bind(null, 'male');
console.log(greetMale(30, 'Иван')); // "Уважаемый Иван, 30 лет"

const greetYoungFemale = greet.bind(null, 'female', 16);
console.log(greetYoungFemale('Анна')); // "Уважаемая Анна, 16 лет"
```

### 2. Логирование с префиксом

```javascript
function log(level, message) {
  console.log(`[${level}] ${message}`);
}

const logError = log.bind(null, 'ERROR');
logError('Соединение прервано'); // "[ERROR] Соединение прервано"
```

### 3. Явное каррирование

```javascript
const curryMultiply = a => b => a * b;
const double = curryMultiply(2);
console.log(double(5)); // 10
```

### 4. Универсальная функция каррирования

```javascript
function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length 
      ? fn.apply(this, args)
      : (...moreArgs) => curried.apply(this, args.concat(moreArgs));
  };
}

const curriedSum = curry((a, b, c) => a + b + c);
console.log(curriedSum(1)(2)(3)); // 6
```

### 5. Каррирование для валидации форм

```javascript
const createValidator = (type) => (value) => {
  const validators = {
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    phone: (v) => /^\+?[\d\s-]{10,}$/.test(v),
    password: (v) => v.length >= 8 && /[A-Z]/.test(v) && /[0-9]/.test(v)
  };
  
  return validators[type] ? validators[type](value) : false;
};

// Создаем специализированные валидаторы
const validateEmail = createValidator('email');
const validatePhone = createValidator('phone');
const validatePassword = createValidator('password');

console.log(validateEmail('test@example.com')); // true
console.log(validatePhone('+7 999 123-45-67')); // true
console.log(validatePassword('Password123')); // true
```

### 6. Каррирование для работы с API

```javascript
const createApiRequest = (baseUrl) => (endpoint) => (method) => (data) => {
  return fetch(`${baseUrl}${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined
  }).then(res => res.json());
};

// Создаем специализированные API-клиенты
const api = createApiRequest('https://api.example.com');
const usersApi = api('/users');
const getUsers = usersApi('GET');
const createUser = usersApi('POST');

// Использование
getUsers().then(users => console.log(users));
createUser({ name: 'John' }).then(user => console.log(user));
```

### 7. Каррирование для логирования

```javascript
const createLogger = (level) => (namespace) => (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] [${namespace}] ${message}`;
  
  switch(level) {
    case 'error':
      console.error(logMessage);
      break;
    case 'warn':
      console.warn(logMessage);
      break;
    default:
      console.log(logMessage);
  }
};

// Создаем специализированные логгеры
const errorLogger = createLogger('error');
const warnLogger = createLogger('warn');
const infoLogger = createLogger('info');

// Создаем логгеры для разных модулей
const authLogger = errorLogger('auth');
const apiLogger = warnLogger('api');
const dbLogger = infoLogger('database');

// Использование
authLogger('Неверные учетные данные');
apiLogger('Превышен лимит запросов');
dbLogger('Подключение установлено');
```

### 8. Каррирование для работы с DOM

```javascript
const createElement = (tag) => (attributes) => (content) => {
  const element = document.createElement(tag);
  
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  
  if (typeof content === 'string') {
    element.textContent = content;
  } else if (content instanceof Node) {
    element.appendChild(content);
  }
  
  return element;
};

// Создаем специализированные функции создания элементов
const createButton = createElement('button');
const createInput = createElement('input');
const createDiv = createElement('div');

// Создаем элементы с разными атрибутами
const primaryButton = createButton({ class: 'btn btn-primary' });
const textInput = createInput({ type: 'text', placeholder: 'Введите текст' });
const container = createDiv({ class: 'container' });

// Использование
document.body.appendChild(primaryButton('Нажми меня'));
document.body.appendChild(textInput(''));
document.body.appendChild(container(''));
```

## Преимущества каррирования

1. Специализация функций - создание более конкретных версий
2. Переиспользование кода - избегание дублирования
3. Композиция функций - возможность комбинировать простые функции
4. Отложенное выполнение - применение аргументов по мере необходимости

## Сравнение подходов

| Подход | Фиксация аргументов | Гибкость | Читаемость |
|--------|---------------------|----------|------------|
| bind | Да | Низкая | Средняя |
| Явное каррирование | Да | Высокая | Высокая |
| Универсальное каррирование | Да | Максимальная | Средняя |

> Каррирование — мощный инструмент функционального программирования, позволяющий создавать гибкие и переиспользуемые функции.

----

## Домашнее задание

### Уровень 1
**1. Базовое каррирование**

Напишите функцию `add`, которая принимает два числа и возвращает их сумму.  
Создайте каррированную версию этой функции и используйте ее для создания:
* Функции `addFive`, которая добавляет 5 к любому числу
* Функции `addTen`, которая добавляет 10 к любому числу

**2. Фиксация аргументов через bind**

Дана функция:
```javascript
function greet(time, name) {
  return `Добр${time === 'утро' ? 'ое' : 'ый'} ${time}, ${name}!`;
}
```
Создайте новые функции с фиксированным первым аргументом:
* `greetMorning` - приветствие для утра
* `greetEvening` - приветствие для вечера

----

### Уровень 2
**3. Каррирование для математических операций**

Создайте каррированные версии основных математических операций:
* Умножение
* Деление
* Возведение в степень

Пример использования:
```javascript
const double = multiply(2);
console.log(double(5)); // 10
```

**4. Логирование с уровнями**

Создайте каррированную функцию `createLogger`, которая:
* Принимает уровень логирования ('info', 'warn', 'error')
* Возвращает функцию, которая принимает сообщение
* Выводит сообщение в формате: `[УРОВЕНЬ] Сообщение`

----

### Уровень 3
**5. Композиция каррированных функций**

Создайте три каррированные функции:
* `addPrefix` - добавляет префикс к строке
* `addSuffix` - добавляет суффикс к строке
* `wrapInTags` - оборачивает строку в HTML-теги

Реализуйте функцию `createHtmlElement`, которая комбинирует эти три функции.

**6. Универсальный валидатор**

Создайте каррированную функцию `createValidator`, которая:
* Принимает функцию-предикат
* Возвращает функцию, которая принимает значение
* Возвращает `true`, если значение удовлетворяет предикату

Пример использования:
```javascript
const isNumber = createValidator(x => typeof x === 'number');
console.log(isNumber('text')); // false
```

----

### Уровень 4
**7. Каррирование с переменным числом аргументов**

Напишите универсальную функцию `curry`, которая:
* Принимает функцию с произвольным количеством аргументов
* Возвращает каррированную версию этой функции
* Поддерживает как поэтапное применение аргументов, так и передачу всех сразу

**8. Применение в цепочках промисов**

Создайте каррированную функцию `then`, которая:
* Принимает функцию-обработчик
* Возвращает функцию, которая принимает промис
* Применяет обработчик к результату промиса

Пример использования:
```javascript
const processData = then(parseJSON);
fetch(url).then(processData);
```

----

### Уровень 5
**9. Мемоизация каррированных функций**

Реализуйте каррированную функцию с мемоизацией:
* Запоминает результаты вызовов
* Эффективно работает с рекурсивными вызовами
* Оптимально использует память

**10. Ленивое каррирование**

Создайте вариант каррирования, где:
* Функция вычисляется только при получении всех аргументов
* Поддерживается отложенное выполнение
* Возможна частичная передача аргументов без немедленных вычислений

----

### Бонусное задание
**11. Каррирование методов объекта**

Напишите функцию `curryMethod`, которая:
* Принимает имя метода и объект
* Возвращает каррированную версию этого метода
* Сохраняет контекст (`this`) исходного объекта

Пример:
```javascript
const calculator = {
  add(a, b) { return a + b; }
};
const curriedAdd = curryMethod('add', calculator);
console.log(curriedAdd(2)(3)); // 5
```

## Важно помнить

- Каррирование позволяет создавать специализированные функции из более общих
- Каждый вызов каррированной функции возвращает новую функцию
- Каррирование полезно для создания переиспользуемого кода
- Каррированные функции можно комбинировать для создания сложной функциональности
- Каррирование особенно полезно в функциональном программировании
