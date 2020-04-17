import React from 'react';
import { Button, Input, Layout, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons/lib';
import { useStore } from 'effector-react';
import { Link } from 'react-router-dom';
import { addPage, $pageStore } from '~src/stores/pages';
import './sider.component.scss';

const { Search } = Input;
const { Sider } = Layout;

interface AppSiderProps {
    className?: string;
}

export default function AppSider({ className }: AppSiderProps) {
    const pages = useStore($pageStore);
    const menuItems = pages.map((list) => (
        <Menu.Item key={list.id}>
            <Link to={`/${list.id}`}>
                <span>{list.title}</span>
            </Link>
        </Menu.Item>
    ));
    const addListHandler = () => addPage();
    return (
        <Sider className={`${className}`} width="20%">
            <div className="sider">
                <Search className="sider__search" placeholder="input search" />
                <div className="sider__title">Private</div>
                <Menu
                    className="sider__menu"
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[pages[0].id]}
                >
                    {menuItems}
                </Menu>
                <Button
                    className="sider__add-button"
                    block
                    onClick={addListHandler}
                >
                    <PlusOutlined></PlusOutlined>&nbsp;Add page
                </Button>
            </div>
        </Sider>
    );
}
