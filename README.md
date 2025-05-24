# Lectures Viewer

Приложение для просмотра лекций в формате Markdown с подсветкой синтаксиса кода.

## Структура проекта

Проект построен на основе методологии Feature-Sliced Design (FSD):

- `app/` - инициализация приложения, провайдеры, глобальные стили
- `processes/` - бизнес-процессы приложения
- `pages/` - страницы приложения
- `widgets/` - композиционные компоненты
- `features/` - функциональные модули
- `entities/` - бизнес-сущности
- `shared/` - переиспользуемый код

## Технологии

- React
- TypeScript
- Redux Toolkit
- React Router
- React Markdown
- React Syntax Highlighter
- ESLint
- Prettier

## Установка

```bash
npm install
```

## Запуск

```bash
npm start
```

## Сборка

```bash
npm run build
```

## Линтинг

```bash
npm run lint
```

## Форматирование кода

```bash
npm run format
``` 