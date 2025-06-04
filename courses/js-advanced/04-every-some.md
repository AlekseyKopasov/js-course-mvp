# Методы every() и some()

## Основные концепции

### `every()`

- Проверяет, **все** ли элементы массива удовлетворяют условию
- Возвращает `true` только если **все** элементы проходят проверку
- Пустой массив всегда возвращает `true`

### `some()`

- Проверяет, **хотя бы один** элемент массива удовлетворяет условию
- Возвращает `true` если **хотя бы один** элемент проходит проверку
- Пустой массив всегда возвращает `false`

## Синтаксис

```javascript
arr.every(callback(element[, index[, array]]))
arr.some(callback(element[, index[, array]]))
```

## Практические примеры

### 1. Проверка числовых значений

```javascript
const numbers = [10, 20, 30, 40];

// Все числа больше 5?
const allAbove5 = numbers.every((n) => n > 5); // true

// Хотя бы одно число больше 25?
const anyAbove25 = numbers.some((n) => n > 25); // true
```

### 2. Работа с объектами

```javascript
const users = [
  { name: 'Anna', age: 25 },
  { name: 'Ivan', age: 30 },
  { name: 'Maria', age: 17 },
];

// Все пользователи совершеннолетние?
const allAdults = users.every((u) => u.age >= 18); // false

// Есть хотя бы один совершеннолетний?
const hasAdults = users.some((u) => u.age >= 18); // true
```

## Особенности работы

| Ситуация             | every()          | some()          |
| -------------------- | ---------------- | --------------- |
| Пустой массив        | true             | false           |
| Прекращение проверки | При первом false | При первом true |
| Мутация массива      | Нет              | Нет             |

## Применение в реальных проектах

### 1. Валидация форм

```javascript
const formFields = [true, true, false];
const isFormValid = formFields.every((field) => field); // false
```

### 2. Проверка прав доступа

```javascript
const userPermissions = ['read', 'write'];
const canEdit = userPermissions.some((p) => p === 'write'); // true
```

### 3. Фильтрация данных перед обработкой

```javascript
const dataSet = [15, 20, 'text', 30];
const isNumbersOnly = dataSet.every(Number.isFinite); // false
```

## Производительность

- Оба метода прекращают проверку при достижении результата
- `every()` оптимален для проверки негативных условий
- `some()` оптимален для проверки позитивных условий

> Методы `every()` и `some()` - мощные инструменты для декларативной проверки условий в массивах.
