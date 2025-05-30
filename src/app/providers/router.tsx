import { MainPage } from '@pages/main/ui/MainPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: '/lecture/:lectureId',
      element: <MainPage />,
    },
  ],
  {
    basename: '/js-course-mvp',
  }
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
