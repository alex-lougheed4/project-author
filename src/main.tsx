import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Homepage from './Homepage.tsx';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
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
        clientId="lmSsemCB4uGHAz7mR5k9E49dU5MRaGid"
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </StrictMode>,
  );
});
