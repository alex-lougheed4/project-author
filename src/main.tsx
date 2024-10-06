import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Homepage from './Homepage.tsx';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import About from './About.tsx';
import Explore from './Explore.tsx';
import ErrorPage from './ErrorPage.tsx';
import PromptDetailedCard from './components/PromptDetailedCard.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  { path: '/About', element: <About /> },
  { path: '/Explore', element: <Explore /> },
  { path: 'prompt/:promptId', element: <PromptDetailedCard /> },
]);

const deferRender = async () => {
  const { worker } = await import('./mocks/browser.ts');
  return worker.start();
};

deferRender().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Auth0Provider
        domain="project-author.uk.auth0.com"
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </StrictMode>,
  );
});
