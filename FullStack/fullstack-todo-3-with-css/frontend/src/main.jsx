import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Todo from './todo';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Todo />
        <Toaster />
    </StrictMode>
);
