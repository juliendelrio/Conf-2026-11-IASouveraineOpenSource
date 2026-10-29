import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Presenter } from './Presenter';
import { SpeakerView } from './SpeakerView';

// `?vue=orateur` opens the speaker view (key `p` in the presenter); otherwise the audience view
const speaker = new URLSearchParams(window.location.search).get('vue') === 'orateur';

createRoot(document.getElementById('root')!).render(
  <StrictMode>{speaker ? <SpeakerView /> : <Presenter />}</StrictMode>,
);
