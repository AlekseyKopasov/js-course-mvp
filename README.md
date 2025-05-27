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

- React 18
- TypeScript
- Vite
- React Router DOM
- React Markdown
- React Syntax Highlighter
- ESLint
- Stylelint
- Prettier
- SASS
- PostCSS
- Autoprefixer

## Установка

```bash
npm install --legacy-peer-deps
```

## Разработка

```bash
npm run dev
```

## Сборка

```bash
npm run build
```

## Предпросмотр сборки

```bash
npm run preview
```

## Проверка кода

```bash
# Проверка стилей
npm run lint:styles

# Проверка скриптов
npm run lint:scripts

# Проверка типов
npm run types

# Полная проверка (включая editorconfig)
npm run test
```

## Форматирование кода

```bash
npm run format
```

## Автоматическое исправление ошибок

```bash
npm run lint:fix
```

## Деплой

```bash
npm run deploy
``` 