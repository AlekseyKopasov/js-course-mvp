# Модули

## Основные концепции

**Модуль** — это паттерн проектирования, который позволяет:
- Инкапсулировать реализацию
- Избегать конфликтов имен
- Контролировать доступ к функциональности

## Проблема глобального пространства имен

```javascript
// Без модуля (переменные в глобальной области видимости)
var message = "Hello";
function showMessage() {
  console.log(message);
}

// Может перезаписать существующую переменную message
```

## Решение: Immediately Invoked Function Expression (IIFE)

### Базовый шаблон

```javascript
(function() {
  var message = "Hello";
  
  function showMessage() {
    console.log(message);
  }
  
  showMessage();
})();
```

### Варианты синтаксиса IIFE

```javascript
// 1. Классический вариант
(function() { /* code */ })();

// 2. С оператором
+function() { /* code */ }();

// 3. С восклицательным знаком
!function() { /* code */ }();

// 4. Альтернативный вариант
(function() { /* code */ }());
```

### Экспорт функциональности

```javascript
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
```

## Современные модули (ES6+)

### Экспорт

```javascript
// module.js
const privateVar = "Секретные данные";

export function publicMethod() {
  console.log(privateVar);
}
```

### Импорт

```javascript
// main.js
import { publicMethod } from './module.js';

publicMethod(); // "Секретные данные"
```

## Преимущества модулей

1. Изоляция кода — переменные не попадают в глобальную область видимости
2. Инкапсуляция — скрытие внутренней реализации
3. Переиспользование — модули можно легко подключать в разных проектах
4. Тестируемость — модули можно тестировать независимо

## Практические примеры

### 1. Модуль для работы с API

```javascript
// api.js
const API_KEY = 'your-secret-key';

export const api = {
  async fetchData(endpoint) {
    const response = await fetch(`https://api.example.com/${endpoint}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    return response.json();
  },
  
  async postData(endpoint, data) {
    const response = await fetch(`https://api.example.com/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};
```

### 2. Модуль для работы с DOM

```javascript
// dom.js
export const dom = {
  createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
    
    return element;
  },
  
  removeElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.remove();
    }
  }
};
```

### 3. Модуль для работы с данными

```javascript
// data.js
const storage = {
  _data: new Map(),
  
  set(key, value) {
    this._data.set(key, value);
    localStorage.setItem(key, JSON.stringify(value));
  },
  
  get(key) {
    if (!this._data.has(key)) {
      const value = localStorage.getItem(key);
      if (value) {
        this._data.set(key, JSON.parse(value));
      }
    }
    return this._data.get(key);
  },
  
  remove(key) {
    this._data.delete(key);
    localStorage.removeItem(key);
  }
};

export default storage;
```

### 4. Модуль для анимаций

```javascript
// animations.js
export const animations = {
  fadeIn(element, duration = 300) {
    element.style.opacity = 0;
    element.style.display = 'block';
    
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      
      element.style.opacity = Math.min(progress / duration, 1);
      
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  },
  
  slideDown(element, duration = 300) {
    element.style.height = '0px';
    element.style.overflow = 'hidden';
    element.style.display = 'block';
    
    const height = element.scrollHeight;
    let start = null;
    
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      
      element.style.height = `${Math.min(progress / duration * height, height)}px`;
      
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }
};
```

## Важно помнить

- Модули помогают организовать код в логические блоки
- Каждый модуль должен иметь четкую ответственность
- Используйте экспорт только того, что действительно нужно извне
- Модули могут зависеть друг от друга, но нужно избегать циклических зависимостей

## Практический пример

### Создание счетчика

```javascript
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
```

> Модули — это фундаментальный паттерн JavaScript, позволяющий создавать структурированный и поддерживаемый код.

----

## Домашнее задание

### Уровень 1
**1. Создание простого модуля**

Создайте IIFE-модуль `greeter`, который:
* Содержит приватную переменную `greeting` со значением "Hello"
* Предоставляет публичный метод `sayHello`, выводящий greeting в консоль
* Вызовите метод после создания модуля

**2. Модуль калькулятора**

Создайте модуль `calculator` с методами:
* `add(a, b)` - сложение
* `subtract(a, b)` - вычитание
* Сделайте эти методы доступными извне

----

### Уровень 2
**3. Модуль с состоянием**

Создайте модуль `counter` с функционалом:
* Приватная переменная `count` (начальное значение 0)
* Публичные методы:
  * `increment()` - увеличивает count на 1
  * `decrement()` - уменьшает count на 1
  * `getCount()` - возвращает текущее значение
* Протестируйте работу всех методов

**4. Модуль валидации**

Создайте модуль `validator` с методами:
* `isEmail(email)` - проверяет строку на email
* `isStrongPassword(pass)` - проверяет на сложность пароля
* Храните регулярные выражения как приватные константы

----

### Уровень 3
**5. Модуль работы с DOM**

Создайте модуль `domHelper` для:
* Добавления/удаления классов у элемента
* Создания новых элементов с заданными атрибутами
* Подключите его к HTML и продемонстрируйте работу

**6. Модуль хранилища**

Реализуйте модуль `storage` с API:
* `set(key, value)` - сохраняет значение
* `get(key)` - получает значение
* `remove(key)` - удаляет значение
* Используйте localStorage внутри

----

### Уровень 4
**7. Модуль анимации**

Создайте модуль `animator` для:
* Плавного изменения opacity элемента
* Анимации перемещения элемента
* Реализуйте очередь анимаций

**8. Модуль HTTP-запросов**

Создайте модуль `http` с методами:
* `get(url)`
* `post(url, data)`
* Обрабатывайте ошибки
* Используйте fetch API внутри

----

### Уровень 5
**9. Плагинная система**

Создайте модуль `app` с возможностью:
* Регистрации плагинов
* Вызова методов плагинов
* Реализуйте 2-3 примера плагинов

**10. Модуль с зависимостями**

Реализуйте модуль, который:
* Принимает зависимости через параметры IIFE
* Использует другие модули (например, ваш `http` модуль)
* Демонстрирует инъекцию зависимостей

----

### Бонусное задание
**11. Система модулей**

Реализуйте простую систему модулей:
* Функцию `define` для объявления модулей
* Функцию `require` для загрузки
* Поддержку асинхронной загрузки
