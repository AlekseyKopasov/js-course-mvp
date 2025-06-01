import { parseLectureContent } from '@entities/lecture/lib/parseLecture';
import { LectureViewer } from '@widgets/lecture-viewer/ui/LectureViewer';
import { Sidebar } from '@widgets/sidebar/ui/Sidebar';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './MainPage.module.scss';

const CACHE_KEY = 'lecture_content_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export const MainPage = () => {
  const { lectureId } = useParams<{ lectureId: string }>();
  const navigate = useNavigate();
  const [lectureContent, setLectureContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const loadLecture = useCallback(async (id: string | undefined) => {
    if (!id) {
      try {
        const module = await import('@entities/lecture/assets/lectures/0-introduction.md?raw');
        const lecture = parseLectureContent(module.default as string, '0-introduction');
        setLectureContent(String(lecture.content));
      } catch (error) {
        console.error('Ошибка загрузки введения:', error);
        setLectureContent('');
      }
      return;
    }

    setIsLoading(true);
    try {
      // Проверяем кэш
      const cachedData = localStorage.getItem(`${CACHE_KEY}_${id}`);
      if (cachedData) {
        const { content, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          setLectureContent(String(content));
          setIsLoading(false);
          return;
        }
      }

      const module = await import(`@entities/lecture/assets/lectures/${id}.md?raw`);
      const lecture = parseLectureContent(module.default as string, id);

      // Сохраняем в кэш
      localStorage.setItem(
        `${CACHE_KEY}_${id}`,
        JSON.stringify({
          content: lecture.content,
          timestamp: Date.now(),
        })
      );

      setLectureContent(String(lecture.content));
    } catch (error) {
      console.error('Ошибка загрузки лекции:', error);
      setLectureContent('');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadLecture(lectureId);
  }, [lectureId, loadLecture]);

  const handleSelectLecture = (selectedLectureId: string) => {
    navigate(`/lecture/${selectedLectureId}`);
  };

  return (
    <div className={styles.app}>
      <Sidebar onSelectLecture={handleSelectLecture} selectedLectureId={lectureId || null} />
      <main className={styles.content}>
        {isLoading ? <div className={styles.loading}>Загрузка...</div> : <LectureViewer content={lectureContent} />}
      </main>
    </div>
  );
};
