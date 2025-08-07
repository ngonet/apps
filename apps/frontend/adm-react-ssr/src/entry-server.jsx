import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import AppServer from './App-server'

/**
 * @param {string} _url
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
 */
export function render(_url, options) {
  return renderToPipeableStream(
    <StrictMode>
      <AppServer />
    </StrictMode>,
    options,
  )
}