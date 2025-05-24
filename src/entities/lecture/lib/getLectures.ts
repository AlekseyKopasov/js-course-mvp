import { LectureInfo } from '../model/types';

// Получаем все .md файлы из папки lectures
const lectureModules = import.meta.glob('@entities/lecture/assets/lectures/*.md');

export const getLectures = async (): Promise<LectureInfo[]> => {
  const lectures: LectureInfo[] = [];

  // Преобразуем пути файлов в информацию о лекциях
  for (const [path, loadModule] of Object.entries(lectureModules)) {
    const id = path.split('/').pop()?.replace('.md', '') || '';
    const order = parseInt(id.split('-')[0], 10) || 0;

    try {
      // Загружаем содержимое файла
      const module = await loadModule();
      const content = module.default;

      // Получаем заголовок из содержимого файла
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : id;

      lectures.push({
        id,
        title,
        order,
      });
    } catch (error) {
      console.error(`Ошибка загрузки лекции ${id}:`, error);
    }
  }

  // Сортируем лекции по порядку
  return lectures.sort((a, b) => a.order - b.order);
};
