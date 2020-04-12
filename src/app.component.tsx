import React, { useEffect } from 'react';
import AppRouter from './app-router.component';
import { initTodos } from '~src/stores/todos/todos.init';
import './app.component.scss';

export function App() {
    useEffect(() => initTodos());
    return <AppRouter></AppRouter>;
}
