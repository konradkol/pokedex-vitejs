import { createBrowserRouter } from 'react-router-dom';

import { RequireAuth } from './components/RequireAuth';

import {
  Home,
  Favourites,
  Arena,
  Login,
  Registration,
  Edit,
  PageNotFound,
  PokemonDetails,
} from './components/subpages/index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  { path: '/PokemonDetails/:id', element: <PokemonDetails /> },
  {
    path: '/favourites',
    element: <Favourites />,
  },
  {
    path: '/arena',
    element: <Arena />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/edit',
    element: (
      <RequireAuth>
        <Edit />
      </RequireAuth>
    ),
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);
