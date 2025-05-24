import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '@widgets/sidebar/ui/Sidebar';
import { LectureViewer } from '@widgets/lecture-viewer/ui/LectureViewer';
import { parseLectureContent } from '@entities/lecture/lib/parseLecture';
import styles from './MainPage.module.scss';

export const MainPage = () => {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const [lectureContent, setLectureContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadLecture = async () => {
      if (!lectureId) {
        setLectureContent('');
        return;
      }

      setIsLoading(true);
      try {
        const module = await import(`@entities/lecture/assets/lectures/${lectureId}.md?raw`);
        const lecture = parseLectureContent(module.default, lectureId);
        setLectureContent(lecture.content);
      } catch (error) {
        console.error('Ошибка загрузки лекции:', error);
        setLectureContent('');
      } finally {
        setIsLoading(false);
      }
    };

    loadLecture();
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
          <h1>Выберите лекцию из меню слева</h1>
        )}
      </main>
    </div>
  );
};
