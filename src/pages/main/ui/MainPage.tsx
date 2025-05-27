import { parseLectureContent } from '@entities/lecture/lib/parseLecture';
import { LectureViewer } from '@widgets/lecture-viewer/ui/LectureViewer';
import { Sidebar } from '@widgets/sidebar/ui/Sidebar';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './MainPage.module.scss';

export const MainPage = () => {
  const { lectureId } = useParams<{ lectureId: string }>();
  const navigate = useNavigate();
  const [lectureContent, setLectureContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadLecture = async () => {
      if (!lectureId) {
        // Load introduction content when no lecture is selected
        try {
          const module = await import('@entities/lecture/assets/lectures/0-introduction.md?raw');
          const lecture = parseLectureContent(module.default as string, '0-introduction');
          setLectureContent(lecture.content);
        } catch (error) {
          console.error('Ошибка загрузки введения:', error);
          setLectureContent('');
        }
        return;
      }

      setIsLoading(true);
      try {
        const module = await import(`@entities/lecture/assets/lectures/${lectureId}.md?raw`);
        const lecture = parseLectureContent(module.default as string, lectureId);
        setLectureContent(lecture.content);
      } catch (error) {
        console.error('Ошибка загрузки лекции:', error);
        setLectureContent('');
      } finally {
        setIsLoading(false);
      }
    };

    void loadLecture();
  }, [lectureId]);

  const handleSelectLecture = (selectedLectureId: string) => {
    navigate(`/lecture/${selectedLectureId}`);
  };

  return (
    <div className={styles.app}>
      <Sidebar onSelectLecture={handleSelectLecture} selectedLectureId={lectureId || null} />
      <main className={styles.content}>
        {isLoading ? (
          <div className={styles.loading}>Загрузка...</div>
        ) : lectureContent ? (
          <LectureViewer content={lectureContent} />
        ) : (
          <div className={styles.loading}>Ошибка загрузки контента</div>
        )}
      </main>
    </div>
  );
};
