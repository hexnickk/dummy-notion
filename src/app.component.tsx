import React  from 'react';
import AppRouter from './app-router.component';
import {$rootBlockStore, childrenBlocksStore, PageBlock} from '~src/stores/blocks';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import './app.component.scss';
import { useStore } from 'effector-react';


export function App() {
    return (
        <BrowserRouter>
            <AppRouter></AppRouter>
        </BrowserRouter>
    );
}
