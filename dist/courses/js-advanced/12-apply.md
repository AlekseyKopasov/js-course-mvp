# Метод apply()

## Основные концепции

`apply()` — метод, аналогичный `call()`, но принимающий аргументы в виде массива.

### Синтаксис:

```javascript
func.apply(context, [arg1, arg2, ...])
```

## Практические примеры

### 1. Базовое использование

```javascript
function introduce(greeting, punctuation) {
  console.log(`${greeting}, я ${this.name}${punctuation}`);
}

const person = { name: 'Анна' };

introduce.apply(person, ['Привет', '!']); 
// "Привет, я Анна!"
```

### 2. Суммирование элементов массива

```javascript
function sum(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
console.log(sum.apply(null, numbers)); // 6
```

### 3. Нахождение максимального значения

```javascript
const values = [12, 5, 8, 130, 44];
const max = Math.max.apply(null, values);
console.log(max); // 130

// Современная альтернатива (ES6):
console.log(Math.max(...values)); // 130
```

## Особенности работы

### 1. Работа с динамическими аргументами

```javascript
function dynamicSum() {
  return Array.prototype.reduce.call(arguments, (a, b) => a + b);
}

const args = [1, 2, 3, 4];
console.log(dynamicSum.apply(null, args)); // 10
```

### 2. Использование с псевдомассивами

```javascript
function logArgs() {
  console.log(Array.prototype.join.apply(arguments, [' | ']));
}

logArgs('JavaScript', 'React', 'Node'); 
// "JavaScript | React | Node"
```

## Сравнение с `call()`

| Ситуация | `call()` | `apply()` |
|----------|----------|-----------|
| Передача аргументов | Через запятую | Массивом |
| Динамические аргументы | Неудобно | Идеально |
| Работа с `arguments` | Требуется преобразование | Прямая передача |

## Современные альтернативы (ES6+)

### 1. Spread оператор

```javascript
// Вместо apply:
const nums = [1, 2, 3];
console.log(Math.max(...nums)); // 3
```

### 2. Деструктуризация

```javascript
function logUser([firstName, lastName]) {
  console.log(`${firstName} ${lastName}`);
}

const userData = ['Иван', 'Петров'];
logUser(userData); // "Иван Петров"
```

> Метод `apply()` особенно полезен при работе с функциями, принимающими переменное число аргументов, и при необходимости передачи готового массива параметров.

----

## Домашнее задание

### Уровень 1
**1. Базовое применение**

Создайте функцию `greet`, которая принимает два параметра (приветствие и имя) и выводит в консоль строку вида: `${приветствие}, ${имя}!`.  
Вызовите эту функцию с помощью `apply()`, передав контекст `null` и массив аргументов `["Привет", "Анна"]`.

**2. Суммирование чисел**

Напишите функцию `sumThree(a, b, c)`, которая возвращает сумму трех чисел.  
Используя `apply()`, вызовите эту функцию с массивом `[5, 10, 15]` в качестве аргументов.

----

### Уровень 2
**3. Поиск минимального значения**

Дан массив чисел: `[24, 13, 56, 8, 42]`.  
Используя `Math.min` и `apply()`, найдите минимальное значение в массиве.

**4. Конкатенация строк**

Создайте функцию `joinStrings(separator)`, которая принимает разделитель и любое количество строк, а возвращает их объединение через разделитель.  
Вызовите функцию через `apply()`, передав массив `["-", "JavaScript", "React", "Node.js"]` (первый элемент - разделитель).

----

### Уровень 3
**5. Работа с контекстом**

Создайте объект `calculator` с методом `multiply(factor)`, который умножает свойство `value` объекта на переданный множитель.  
Используя `apply()`, вызовите этот метод с массивом аргументов `[5]` для объекта `{value: 10}`.

**6. Динамические аргументы**

Напишите функцию `logArguments()`, которая выводит в консоль все переданные аргументы через запятую.  
Используя `apply()`, передайте ей псевдомассив `arguments` из другой функции.

----

### Уровень 4
**7. Наследование методов**

Создайте объект `parent` с методом `introduce(greeting)`, который выводит `${greeting}, я ${this.name}`.  
Создайте объект `child` с свойством `name: "Анна"`.  
Используя `apply()`, вызовите метод `introduce` родительского объекта в контексте дочернего объекта с аргументом `"Привет"`.

**8. Комбинирование массивов**

Напишите функцию `combineArrays()`, которая принимает несколько массивов и возвращает один объединенный массив.  
Используйте `apply()` для реализации этой функции.

----

### Уровень 5
**9. Каррирование с apply()**

Реализуйте каррированную функцию `multiply(a)(b)(c)`, которая возвращает произведение трех чисел.  
Используя `apply()`, вызовите эту функцию с массивом аргументов `[2, 3, 4]`.

**10. Полифил для apply()**

Напишите собственную реализацию метода `apply()` (Function.prototype.myApply), которая будет работать аналогично стандартному методу.

----

### Бонусное задание
**11. Декоратор с apply()**

Создайте декоратор `delay(ms, func)`, который вызывает функцию через указанное время, сохраняя все переданные аргументы.
Реализуйте его с использованием `apply()`.
