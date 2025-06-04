import { courses } from '@app/config/courses';
import { Link } from 'react-router-dom';
import styles from './IndexPage.module.scss';

export const IndexPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Доступные курсы</h1>
      <div className={styles.courses}>
        {courses.map(course => (
          <Link to={`/course/${course.id}`} key={course.id} className={styles.courseCard}>
            <h2 className={styles.courseTitle}>{course.title}</h2>
            <p className={styles.courseDescription}>{course.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
