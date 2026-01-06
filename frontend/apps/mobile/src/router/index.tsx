import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../App';
import { RequireAuth } from './guards';
import { Home } from '../pages/Home';
import { Search } from '../pages/Search';
import { PostDetail } from '../pages/PostDetail';
import { PostCreate } from '../pages/PostCreate';
import { PostEdit } from '../pages/PostEdit';
import { Mine } from '../pages/Mine';
import { Profile } from '../pages/Profile';
import { MyPosts } from '../pages/MyPosts';
import { MyFollows } from '../pages/MyFollows';
import { ContactRequests } from '../pages/ContactRequests';
import { Notifications } from '../pages/Notifications';
import { Settings } from '../pages/Settings';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/search', element: <Search /> },
      { path: '/post/:id', element: <PostDetail /> },
      {
        element: <RequireAuth />,
        children: [
          { path: '/post/create', element: <PostCreate /> },
          { path: '/post/:id/edit', element: <PostEdit /> },
          { path: '/mine', element: <Mine /> },
          { path: '/mine/profile', element: <Profile /> },
          { path: '/mine/posts', element: <MyPosts /> },
          { path: '/mine/follows', element: <MyFollows /> },
          { path: '/mine/contact-requests', element: <ContactRequests /> },
          { path: '/notifications', element: <Notifications /> },
          { path: '/settings', element: <Settings /> },
        ],
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]);
