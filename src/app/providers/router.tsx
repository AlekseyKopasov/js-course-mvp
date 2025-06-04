import { IndexPage } from '@pages/index/ui/IndexPage';
import { MainPage } from '@pages/main/ui/MainPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
    basename: '/',
  }
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
