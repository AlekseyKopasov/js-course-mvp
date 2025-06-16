export interface Lecture {
  id: string;
  title: string;
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
    lectures: [{ id: '0-introduction', title: 'Введение' }],
  },
  {
    id: 'js-advanced',
    title: 'Продвинутый JavaScript',
    description: 'Углубленное изучение JavaScript: замыкания, прототипы, асинхронное программирование.',
    lectures: [
      { id: '0-introduction', title: 'Введение' },
      { id: '01-forEach', title: 'Метод forEach' },
      { id: '02-map', title: 'Метод map' },
      { id: '03-filter', title: 'Метод filter' },
      { id: '04-every-some', title: 'Методы every и some' },
      { id: '05-reduce', title: 'Метод reduce' },
      { id: '06-arguments', title: 'Объект arguments' },
      { id: '07-types', title: 'Типы функций' },
      { id: '08-this', title: 'Ключевое слово this' },
      { id: '09-closures', title: 'Замыкания' },
      { id: '10-modules', title: 'Модули' },
      { id: '11-call', title: 'Метод call' },
      { id: '12-apply', title: 'Метод apply' },
      { id: '13-bind', title: 'Метод bind' },
      { id: '14-currying', title: 'Каррирование' },
    ],
  },
  {
    id: 'react-basics',
    title: 'Основы React',
    description: 'Начните работу с React: компоненты, пропсы, состояние и основные хуки.',
    lectures: [{ id: '0-introduction', title: 'Введение' }],
  },
];
