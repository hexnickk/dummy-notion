import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons/lib';
import { Link, useLocation } from 'react-router-dom';
import './sider.component.scss';
import { PageBlock } from '~src/stores/blocks';

const { Sider } = Layout;

interface AppSiderProps {
    className?: string;
    pages?: PageBlock[];
}

export function AppSider({ className, pages }: AppSiderProps) {
    const location = useLocation();

    const menuItems = pages?.map((page) => {
        const route = `/${page.id}`;
        return (
            <Menu.Item key={route} data-cy="sider-menu-item">
                <Link to={route}>
                    <span>{page.title}</span>
                </Link>
            </Menu.Item>
        );
    });
    // const addListHandler = () => addPage();
    return (
        <Sider className={`${className}`} width="20%">
            <div className="sider" data-cy="sider">
                <div className="sider__title">Private</div>
                <Menu
                    className="sider__menu"
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                >
                    {menuItems}
                </Menu>
                <Button
                    className="sider__add-button"
                    block
                    // onClick={addListHandler}
                >
                    <PlusOutlined></PlusOutlined>&nbsp;Add page
                </Button>
            </div>
        </Sider>
    );
}
