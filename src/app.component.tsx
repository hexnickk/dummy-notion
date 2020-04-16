import React, { useEffect } from 'react';
import AppRouter from './app-router.component';
import { initTodos } from '~src/stores/todos';
import { initLists } from '~src/stores/lists';
import { Layout } from 'antd';
import './app.component.scss';
import AppSider from '~src/components/sider';
import { BrowserRouter } from 'react-router-dom';

const { Content } = Layout;

export function App() {
    useEffect(() => initTodos());
    useEffect(() => initLists());
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
