import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Presenter } from './Presenter';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Presenter />
  </StrictMode>,
);
