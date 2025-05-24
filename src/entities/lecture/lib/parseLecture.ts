import { Lecture, LectureMetadata } from '../model/types';

export const getLectureTitle = (content: string): string => {
  const firstLine = content.split('\n')[0];
  return firstLine.replace(/^#\s+/, '');
};

export const parseLectureContent = (content: string, id: string): Lecture => {
  const title = getLectureTitle(content);
  const order = parseInt(id.split('-')[0], 10);

  return {
    id,
    title,
    content,
    order,
  };
};

export const getLectureMetadata = (id: string, content: string): LectureMetadata => {
  const title = getLectureTitle(content);
  const order = parseInt(id.split('-')[0], 10);

  return {
    id,
    title,
    order,
  };
};
