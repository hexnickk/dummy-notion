import React from 'react';
import { Layout, Menu } from 'antd';
import { useStore } from 'effector-react';
import { listsStore } from '~src/stores/lists';
const { Sider } = Layout;
import './sider.component.scss';

interface AppSiderProps {
    className?: string;
}
export default function AppSider({ className }: AppSiderProps) {
    const lists = useStore(listsStore);
    const menuItems = lists.map((list) => (
        <Menu.Item key={list.id}>
            <span>{list.title}</span>
        </Menu.Item>
    ));
    return (
        <Sider className={`${className} sider`} width="20%">
            <div className="sider__title">My Lists</div>
            <Menu theme="dark" mode="inline" selectedKeys={[lists[0].id]}>
                {menuItems}
            </Menu>
        </Sider>
    );
}
