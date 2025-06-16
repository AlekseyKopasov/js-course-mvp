# Метод bind()

## Основные концепции

`bind()` создает новую функцию с привязанным контекстом `this` и/или фиксированными аргументами.

### Синтаксис:

```javascript
const boundFunc = originalFunc.bind(context, arg1, arg2, ...)
```

## Проблема потери контекста

### Пример с `setTimeout`

```javascript
const user = {
  name: 'Анна',
  sayHi() {
    console.log(`Привет, ${this.name}!`);
  }
};

// Потеря контекста
setTimeout(user.sayHi, 1000); // "Привет, undefined!"

// Решение с bind
setTimeout(user.sayHi.bind(user), 1000); // "Привет, Анна!"
```

## Практические примеры

### 1. Фиксация контекста

```javascript
function showSum(a, b) {
  console.log(`${this.title}: ${a + b}`);
}

const calculator = { title: 'Сумма' };
const boundShowSum = showSum.bind(calculator);

boundShowSum(2, 3); // "Сумма: 5"
```

### 2. Фиксация аргументов (каррирование)

```javascript
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10
```

### 3. Обработчики событий

```javascript
const app = {
  data: ['React', 'Vue', 'Angular'],
  showFirst() {
    console.log(this.data[0]);
  }
};

document.querySelector('button')
  .addEventListener('click', app.showFirst.bind(app)); 
  // "React" при клике
```

### 4. Работа с событиями в React-подобном компоненте

```javascript
class Button {
  constructor(text) {
    this.text = text;
    this.clickCount = 0;
  }
  
  handleClick() {
    this.clickCount++;
    console.log(`Кнопка "${this.text}" нажата ${this.clickCount} раз`);
  }
  
  render() {
    const button = document.createElement('button');
    button.textContent = this.text;
    // Привязываем контекст к обработчику
    button.addEventListener('click', this.handleClick.bind(this));
    return button;
  }
}

const button = new Button('Нажми меня');
document.body.appendChild(button.render());
```

### 5. Создание специализированных функций

```javascript
function formatDate(date, format) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year);
}

// Создаем специализированные функции форматирования
const formatShortDate = formatDate.bind(null, new Date(), 'DD.MM.YYYY');
const formatLongDate = formatDate.bind(null, new Date(), 'DD месяца YYYY года');

console.log(formatShortDate()); // "01.01.2024"
console.log(formatLongDate()); // "01 января 2024 года"
```

### 6. Работа с API и промисами

```javascript
class API {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  
  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    return response.json();
  }
  
  get(endpoint) {
    return this.request.bind(this, endpoint, { method: 'GET' });
  }
  
  post(endpoint) {
    return this.request.bind(this, endpoint, { method: 'POST' });
  }
}

const api = new API('https://api.example.com');
const getUsers = api.get('/users');
const createUser = api.post('/users');

// Использование
getUsers().then(users => console.log(users));
createUser({ name: 'John' }).then(user => console.log(user));
```

### 7. Создание декораторов с привязкой контекста

```javascript
function debounce(func, delay) {
  let timeout;
  
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

class SearchInput {
  constructor() {
    this.value = '';
    // Привязываем контекст и создаем дебаунс версию
    this.handleInput = debounce(this.handleInput.bind(this), 300);
  }
  
  handleInput(event) {
    this.value = event.target.value;
    console.log('Поиск:', this.value);
  }
  
  render() {
    const input = document.createElement('input');
    input.addEventListener('input', this.handleInput);
    return input;
  }
}
```

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

```javascript
// Аналог bind с стрелочной функцией
setTimeout(() => user.sayHi(), 1000);
```

## Применение метода `bind()`

Метод `bind()` — мощный инструмент для:
- Гарантированного сохранения контекста
- Создания специализированных функций
- Работы с асинхронными вызовами
- Реализации каррирования

## Важно помнить

- `bind()` создает новую функцию с фиксированным контекстом
- Привязанный контекст нельзя изменить повторным вызовом `bind()`
- `bind()` полезен для создания специализированных функций
- При работе с классами и событиями `bind()` помогает сохранить контекст
- `bind()` можно использовать для частичного применения аргументов

----

## Домашнее задание

### Уровень 1
**1. Фиксация контекста**

Создайте объект `counter` с методами:
* `increment()` - увеличивает свойство `value` на 1
* `showValue()` - выводит текущее значение `value`

Используйте `bind()`, чтобы создать новую функцию `showBound`, которая всегда будет показывать значение `counter` независимо от контекста вызова.

**2. Каррирование**

Создайте функцию `pow(a, b)`, возвращающую a в степени b.  
С помощью `bind()` создайте новую функцию `square`, которая будет возводить любое число в квадрат (фиксируя второй аргумент как 2).

----

### Уровень 2
**3. Обработчики событий**

Дан объект:
```javascript
const menu = {
  items: ['Главная', 'О нас', 'Контакты'],
  showItems() {
    this.items.forEach(item => console.log(item));
  }
};
```
Привяжите метод `showItems` к контексту объекта `menu` с помощью `bind()` и назначьте как обработчик клика на кнопку с `id="menuBtn"`.

**4. Частичное применение**

Создайте функцию `format(text, style1, style2)`, которая возвращает строку в формате:
`<${style1}><${style2}>${text}</${style2}></${style1}>`

Используя `bind()`, создайте функцию `formatBold`, которая автоматически применяет первый стиль как "b" (bold).

----

### Уровень 3
**5. Цепочка привязок**

Создайте функцию `log(level, message, date)`, которая выводит сообщение в формате:
`[${date}] ${level}: ${message}`

С помощью `bind()`:
* Создайте функцию `logError`, фиксирующую level как "ERROR"
* На ее основе создайте `logTodayError`, фиксирующую date как текущую дату

**6. Эмуляция приватных методов**

Используя `bind()`, реализуйте модуль калькулятора с "приватными" методами:
```javascript
const calculator = (function() {
  // Ваша реализация
})();
```
Где публичные методы `add` и `sub` вызывают "приватные" методы `_add` и `_sub` через правильный контекст.

----

### Уровень 4
**7. Декоратор с привязкой контекста**

Напишите декоратор `bindDecorator(func, context)`, который:
* Принимает функцию и контекст
* Возвращает новую функцию, которая вызывает оригинальную с привязанным контекстом
* Сохраняет все аргументы оригинальной функции

**8. Автоматическая привязка методов**

Создайте функцию `autoBind(obj)`, которая автоматически привязывает все методы объекта к его контексту (аналог автоматического bind в классах React).

----

### Уровень 5
**9. Полифил для bind()**

Напишите собственную реализацию метода `bind()` (полифил), которая будет работать аналогично нативному методу.

**10. Bind с промисами**

Создайте функцию `promiseBind(func, context)`, которая:
* Принимает функцию и контекст
* Возвращает новую функцию, возвращающую промис
* Автоматически привязывает контекст при вызове

----

### Бонусное задание
**11. Каррирование с переменным числом аргументов**

Реализуйте функцию `curry(func, arity)`, которая:
* Принимает функцию и количество ожидаемых аргументов
* Возвращает каррированную версию функции
* Использует `bind()` для реализации
* Поддерживает как фиксированное, так и переменное число аргументов
