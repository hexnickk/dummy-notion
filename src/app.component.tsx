import React from 'react';
import AppRouter from './app-router.component';
import { BrowserRouter } from 'react-router-dom';
import './app.component.scss';

export function App() {
    return (
        <BrowserRouter>
            <AppRouter></AppRouter>
        </BrowserRouter>
    );
}
