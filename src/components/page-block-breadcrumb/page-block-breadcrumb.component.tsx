import React from 'react';
import { Breadcrumb } from 'antd';
import { PageBlock, pathToPageStore } from '~src/stores/blocks';
import { useStore } from 'effector-react';
import { Link } from 'react-router-dom';

interface PageBlockBreadCrumbComponentProps {
    page: PageBlock;
}
// TODO: think about proper memoization
export const PageBlockBreadCrumbComponent = React.memo(
    ({ page }: PageBlockBreadCrumbComponentProps) => {
        const pagePath = useStore(pathToPageStore(page));
        return (
            <Breadcrumb>
                {pagePath.map((page) => (
                    <Breadcrumb.Item key={page.id}>
                        <Link to={page.id}>{page.title}</Link>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        );
    }
);
