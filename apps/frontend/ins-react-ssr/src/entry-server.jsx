import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
// ¡Importante! Asegúrate de que esta línea sea correcta y apunte a 'react-router-dom/server'
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';
import AppWrapper from '@/components/AppWrapper'; // Asegúrate de que la ruta sea correcta

/*
  React SSR streaming with Suspense works by adding JS code to the end of the
  HTML to update the suspended element in the client side. However, there are 2
  issues when integrating it in Vite with React's `renderToPipeableStream` API:

  1. The API requires a parent element for Suspense for the above behavior to
     work, otherwise suspended suspended elements will be awaited in-place, resulting in
     slow streaming.

  2. The API stalls the stream to later append the JS code, causing us to unable
     to add the trailing HTML code (the part after `<!--app-html-->` in index.html).
     This is because React assumes full control of the entire HTML output, which
     isn't feasible here as Vite requires HTML files as entrypoints and for bundling.

  The solution here is to ensure a parent element (`<main>` in `<App/>`), and a
  custom element (`<vite-streaming-end>`) to detect when React has finished
  rendering its main content so we can render Vite's HTML after it.
*/

/**
 * @param {string} url - La URL de la solicitud entrante
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
 */
export function render(url, options) {
  return renderToPipeableStream(
    <StrictMode>
      {/* StaticRouter debe envolver toda la aplicación para SSR */}
      <StaticRouter location={url}>
        <AppWrapper>
          <App />
        </AppWrapper>
        <vite-streaming-end></vite-streaming-end>
      </StaticRouter>
    </StrictMode>,
    options,
  );
}
