import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserManagement from './screens/user-master/UserManagement.tsx'
import CharacterMaster from './screens/character-master/character-master.tsx'
import 'antd/dist/reset.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/users',
    element: <UserManagement />,
  },
  {
    path: '/characters',
    element: <CharacterMaster />,
  },
  {
    path: '/about',
    element: <div>About Page</div>,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}  />
  </StrictMode>,
)
