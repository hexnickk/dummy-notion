import React, { useEffect } from 'react';
import AppRouter from './app-router.component';
import { initBlocks } from '~src/stores/blocks';
import { initPages } from '~src/stores/pages';
import { Layout } from 'antd';
import AppSider from '~src/components/sider';
import { BrowserRouter } from 'react-router-dom';
import './app.component.scss';

const { Content } = Layout;

export function App() {
    useEffect(() => initBlocks());
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
