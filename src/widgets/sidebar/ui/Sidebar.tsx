import { useState, useEffect } from 'react';
import { LectureMetadata } from '@entities/lecture/model/types';
import { getLectureMetadata } from '@entities/lecture/lib/parseLecture';
import { getLectures } from '@entities/lecture/lib/getLectures';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  onSelectLecture: (lectureId: string) => void;
  selectedLectureId: string | null;
}

interface Lecture {
  id: string;
  title: string;
}

export const Sidebar = ({ onSelectLecture, selectedLectureId }: SidebarProps) => {
  const [lectures, setLectures] = useState<LectureMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLectures = async () => {
      try {
        const lectureFiles = await getLectures();
        const metadataPromises = lectureFiles.map(async (lecture: Lecture) => {
          const module = await import(`@entities/lecture/assets/lectures/${lecture.id}.md`);
          return getLectureMetadata(lecture.id, module.default);
        });

        const metadata = await Promise.all(metadataPromises);
        setLectures(metadata);
      } catch (error) {
        console.error('Error loading lectures:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLectures();
  }, []);

  if (isLoading) {
    return <div className={styles.sidebar}>Loading...</div>;
  }

  return (
    <div className={styles.sidebar}>
      <h2>Лекции</h2>
      <ul className={styles.lectureList}>
        {lectures.map(lecture => (
          <li
            key={lecture.id}
            className={`${styles.lectureItem} ${lecture.id === selectedLectureId ? styles.active : ''}`}
            onClick={() => onSelectLecture(lecture.id)}
          >
            {lecture.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
