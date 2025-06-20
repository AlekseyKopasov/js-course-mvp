import { courses } from '@app/config/courses';
import { parseLectureContent } from '@entities/lecture/lib/parseLecture';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './MainPage.module.scss';

import { LectureViewer } from '@/widgets/lecture-viewer/LectureViewer';
import { Sidebar } from '@/widgets/sidebar/Sidebar';

const CACHE_KEY = 'lecture_content_cache';
const isGithubPages = import.meta.env.MODE === 'github';
const basePath = isGithubPages ? '/js-course-mvp' : '';

// Функция для очистки кеша лекций
const clearLectureCache = () => {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(CACHE_KEY)) {
      localStorage.removeItem(key);
    }
  });
};

export const MainPage = () => {
  const { courseId, lectureId } = useParams<{ courseId: string; lectureId: string }>();
  const navigate = useNavigate();
  const [lectureContent, setLectureContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Очищаем кеш при монтировании компонента (начало новой сессии)
  useEffect(() => {
    clearLectureCache();
  }, []);

  const loadLecture = useCallback(async (courseId: string | undefined, lectureId: string | undefined) => {
    if (!courseId || !lectureId) {
      setLectureContent('');
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      try {
        const lecturePath = `${basePath}/courses/${courseId}/${lectureId}.md`;

        const response = await fetch(lecturePath);

        if (!response.ok) {
          throw new Error(`Файл лекции не найден (${response.status})`);
        }
        const content = await response.text();

        if (!content) {
          throw new Error('Файл лекции пуст');
        }

        const lecture = parseLectureContent(content, lectureId);
        setLectureContent(String(lecture.content));
      } catch (fetchError) {
        console.error('Ошибка загрузки лекции:', fetchError);
        throw new Error('Файл лекции не найден');
      }
    } catch (error) {
      console.error('Ошибка загрузки лекции:', error);
      setError(error instanceof Error ? error.message : 'Неизвестная ошибка');
      setLectureContent('');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Перенаправление на первую лекцию, если мы на странице курса без лекции
  useEffect(() => {
    const loadFirstLecture = async () => {
      if (courseId && !lectureId) {
        const currentCourse = courses.find(course => course.id === courseId);
        if (currentCourse && currentCourse.lectures.length > 0) {
          const firstLecture = currentCourse.lectures[0];
          try {
            const lecturePath = `${basePath}/courses/${courseId}/${firstLecture.id}.md`;

            const response = await fetch(lecturePath);

            if (response.ok) {
              navigate(`/course/${courseId}/lecture/${firstLecture.id}`);
            } else {
              setError(`Файл лекции не найден (${response.status})`);
            }
          } catch (error) {
            console.error('Ошибка при проверке файла лекции:', error);
            setError('Ошибка загрузки лекции');
          }
        }
      }
    };

    void loadFirstLecture();
  }, [courseId, lectureId, navigate]);

  useEffect(() => {
    void loadLecture(courseId, lectureId);
  }, [courseId, lectureId, loadLecture]);

  const handleSelectLecture = (selectedLectureId: string) => {
    navigate(`/course/${courseId}/lecture/${selectedLectureId}`);
  };

  return (
    <div className={styles.app}>
      <Sidebar onSelectLecture={handleSelectLecture} selectedLectureId={lectureId || null} courseId={courseId || ''} />
      <main className={styles.content}>
        {isLoading ? (
          <div className={styles.loading}>Загрузка...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <LectureViewer content={lectureContent} />
        )}
      </main>
    </div>
  );
};
