import { getLectures } from '@entities/lecture/lib/getLectures';
import { getLectureMetadata } from '@entities/lecture/lib/parseLecture';
import type { LectureMetadata } from '@entities/lecture/model/types';
import { useState, useEffect, useCallback } from 'react';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  onSelectLecture: (lectureId: string) => void;
  selectedLectureId: string | null;
}

const CACHE_KEY = 'lecture_metadata_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export const Sidebar = ({ onSelectLecture, selectedLectureId }: SidebarProps) => {
  const [lectures, setLectures] = useState<LectureMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLectures = useCallback(async () => {
    try {
      // Проверяем кэш
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          setLectures(data as LectureMetadata[]);
          setIsLoading(false);
          return;
        }
      }

      const lectureFiles = await getLectures();
      const metadataPromises = lectureFiles.map(async lecture => {
        const module = await import(`@entities/lecture/assets/lectures/${lecture.id}.md`);
        return getLectureMetadata(lecture.id, module.default as string);
      });

      const metadata = await Promise.all(metadataPromises);

      // Сохраняем в кэш
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: metadata,
          timestamp: Date.now(),
        })
      );

      setLectures(prev => [...prev, ...(metadata as LectureMetadata[])]);
    } catch (error) {
      console.error('Error loading lectures:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadLectures();
  }, [loadLectures]);

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
            onClick={() => {
              onSelectLecture(lecture.id);
            }}
          >
            {lecture.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
