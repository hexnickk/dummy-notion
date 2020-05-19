import React, { useCallback } from 'react';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons/lib';
import { useStore } from 'effector-react';
import { NavLink } from 'react-router-dom';

import './sider.component.scss';
import {
    $rootBlockStore,
    PageBlock,
    pageBlockFactory,
    pushChild,
} from '~src/stores/blocks';

const AppSiderSectionItem = React.memo(({ page }: { page: PageBlock }) => {
    const route = `/${page.id}`;

    return (
        <NavLink
            className="sider__menu-item"
            activeClassName="sider__menu-item_selected"
            to={route}
        >
            <span>{page.title}</span>
            <MoreOutlined></MoreOutlined>
        </NavLink>
    );
});

const AppSiderSection = React.memo(
    ({ pages, onAdd }: { pages: PageBlock[]; onAdd: () => void }) => {
        return (
            <>
                <div className="sider__section-title">
                    <span>Private</span>{' '}
                    <PlusOutlined onClick={onAdd}></PlusOutlined>
                </div>
                <div className="sider__section">
                    {pages.map((page) => (
                        <AppSiderSectionItem page={page} key={page.id}></AppSiderSectionItem>
                    ))}
                </div>
            </>
        );
    }
);

export function AppSider({
    pages,
    className,
}: {
    pages?: PageBlock[];
    className?: string;
}) {
    const rootBlock = useStore($rootBlockStore);
    const onAdd = useCallback(
        () =>
            pushChild({
                parent: rootBlock,
                child: pageBlockFactory({ title: 'New page' }),
            }),
        [rootBlock]
    );

    return (
        <div className={`${className} sider`} data-cy="sider">
            <div className="sider__workspace">Workspace</div>
            <div className="sider__search">🔎 Quick find</div>
            <AppSiderSection pages={pages} onAdd={onAdd}></AppSiderSection>
        </div>
    );
}
