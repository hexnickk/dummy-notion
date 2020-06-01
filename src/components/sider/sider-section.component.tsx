import React, { useCallback } from 'react';
import {
    $rootBlockStore,
    PageBlock,
    pageBlockFactory,
    pushChild,
} from '~src/stores/blocks';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons/lib';
import { AppSiderSectionItem } from './sider-section-item.component';

export const AppSiderSection = React.memo(
    ({ pages }: { pages: PageBlock[] }) => {
        const rootBlock = useStore($rootBlockStore);
        const history = useHistory();
        const handleAddNewBlock = useCallback(() => {
            const newPageBlock = pageBlockFactory({ title: 'New page' });
            pushChild({
                parent: rootBlock,
                child: newPageBlock,
            });
            history.push(`${newPageBlock.id}`);
        }, [rootBlock]);

        return (
            <>
                <div className="sider__section-title">
                    <span>Private</span>{' '}
                    <PlusOutlined
                        data-cy="sider-new-page-button"
                        onClick={handleAddNewBlock}
                    ></PlusOutlined>
                </div>
                <div className="sider__section">
                    {pages.map((page) => (
                        <AppSiderSectionItem
                            page={page}
                            key={page.id}
                        ></AppSiderSectionItem>
                    ))}
                </div>
            </>
        );
    }
);
