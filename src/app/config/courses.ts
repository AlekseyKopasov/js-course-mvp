export interface Lecture {
  id: string;
  title: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lectures: Lecture[];
}

export const courses: Course[] = [
  {
    id: 'js-basics',
    title: 'Основы JavaScript',
    description: 'Изучите базовые концепции JavaScript, включая переменные, типы данных, функции и объекты.',
    lectures: [{ id: '0-introduction', title: 'Введение', order: 0 }],
  },
  {
    id: 'js-advanced',
    title: 'Продвинутый JavaScript',
    description: 'Углубленное изучение JavaScript: замыкания, прототипы, асинхронное программирование.',
    lectures: [
      { id: '0-introduction', title: 'Введение', order: 0 },
      { id: '01-forEach', title: 'Метод forEach', order: 1 },
      { id: '02-map', title: 'Метод map', order: 2 },
      { id: '03-filter', title: 'Метод filter', order: 3 },
      { id: '04-every-some', title: 'Методы every и some', order: 4 },
      { id: '05-reduce', title: 'Метод reduce', order: 5 },
      { id: '06-arguments', title: 'Объект arguments', order: 6 },
      { id: '07-types', title: 'Типы данных', order: 7 },
      { id: '08-this', title: 'Ключевое слово this', order: 8 },
      { id: '09-closures', title: 'Замыкания', order: 9 },
      { id: '10-modules', title: 'Модули', order: 10 },
      { id: '11-call', title: 'Метод call', order: 11 },
      { id: '12-apply', title: 'Метод apply', order: 12 },
      { id: '13-bind', title: 'Метод bind', order: 13 },
      { id: '14-currying', title: 'Каррирование', order: 14 },
    ],
  },
  {
    id: 'react-basics',
    title: 'Основы React',
    description: 'Начните работу с React: компоненты, пропсы, состояние и основные хуки.',
    lectures: [{ id: '0-introduction', title: 'Введение', order: 0 }],
  },
];
