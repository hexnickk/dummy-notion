import React from 'react';
import { deleteBlock, PageBlock } from '~src/stores/blocks';
import { NavLink } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons/lib';

export const AppSiderSectionItem = React.memo(
    ({ page }: { page: PageBlock }) => {
        const route = `/${page.id}`;
        const handleDelete = () => {
            deleteBlock({ target: page });
        };

        const menu = (
            <Menu>
                <Menu.Item onClick={handleDelete}>Delete</Menu.Item>
            </Menu>
        );

        return (
            <NavLink
                className="sider__menu-item"
                activeClassName="sider__menu-item_selected"
                to={route}
            >
                <span>{page.title}</span>
                <Dropdown overlay={menu} trigger={['click']}>
                    <EllipsisOutlined></EllipsisOutlined>
                </Dropdown>
            </NavLink>
        );
    }
);
