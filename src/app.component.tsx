import React, { useEffect } from 'react';
import AppRouter from './app-router.component';
import { initTodos } from '~src/stores/todos';
import { initPages } from '~src/stores/pages';
import { Layout } from 'antd';
import AppSider from '~src/components/sider';
import { BrowserRouter } from 'react-router-dom';
import './app.component.scss';

const { Content } = Layout;

export function App() {
    useEffect(() => initTodos());
    useEffect(() => initPages());
    return (
        <BrowserRouter>
            <Layout className="app">
                <AppSider className="app__sider"></AppSider>
                <Content className="app__content">
                    <AppRouter></AppRouter>
                </Content>
            </Layout>
        </BrowserRouter>
    );
}
