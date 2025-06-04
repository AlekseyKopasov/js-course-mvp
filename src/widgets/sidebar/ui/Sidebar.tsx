import { courses } from '@app/config/courses';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  onSelectLecture: (lectureId: string) => void;
  selectedLectureId: string | null;
  courseId: string;
}

export const Sidebar = ({ onSelectLecture, selectedLectureId, courseId }: SidebarProps) => {
  const currentCourse = courses.find(course => course.id === courseId);

  if (!currentCourse) {
    return <div className={styles.sidebar}>Курс не найден</div>;
  }

  return (
    <div className={styles.sidebar}>
      <Link to="/" className={styles.backButton}>
        ← Назад к списку курсов
      </Link>
      <h2>{currentCourse.title}</h2>
      <ul className={styles.lectureList}>
        {currentCourse.lectures.map(lecture => (
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
