import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { IndexPage } from '@/pages/index/IndexPage';
import { MainPage } from '@/pages/main/MainPage';

const isGithubPages = import.meta.env.MODE === 'github';
const basename = isGithubPages ? '/js-course-mvp' : '/';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <IndexPage />,
    },
    {
      path: '/course/:courseId',
      element: <MainPage />,
    },
    {
      path: '/course/:courseId/lecture/:lectureId',
      element: <MainPage />,
    },
  ],
  {
    basename,
  }
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
