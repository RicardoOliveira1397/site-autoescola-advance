import { createRoot } from 'react-dom/client';
import Site from './Site';
import { MotionProvider } from './Motion';
createRoot(document.getElementById('root')!).render(<MotionProvider><Site /></MotionProvider>);
