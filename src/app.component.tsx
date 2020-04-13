import React, { useEffect } from 'react';
import AppRouter from './app-router.component';
import { initTodos } from '~src/stores/todos/todos.init';
import { Layout, Menu } from 'antd';
import './app.component.scss';

const { Sider, Content } = Layout;

export function App() {
    useEffect(() => initTodos());
    return (
        <Layout className="app">
            <Sider className="app__sider sider" width="20%">
                <div className="sider__title">My lists</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <span>Default todo</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Content className="app__content">
                <AppRouter></AppRouter>
            </Content>
        </Layout>
    );
}
