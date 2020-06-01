import React, { KeyboardEvent, ChangeEvent, useEffect } from 'react';
import './page-block.component.scss';

import { useParams, Redirect } from 'react-router-dom';
import { useStore } from 'effector-react';

import {
    updateBlock,
    findBlockStore,
    PageBlock,
    Block,
    pushChild,
    InputBasedBlock,
    textBlockFactory,
    convertBlock,
    insertNextNeighbour,
} from '~src/stores/blocks';
import { EmptyPageComponent } from '~src/components/empty-page';
import { PageBlockBreadCrumbComponent } from './page-block-breadcrumb.component';
import { FactoryBlockComponent } from '~src/components/factory-block';
import {
    focusNext,
    focusPrevious,
    resetFocus,
    setFocus,
} from '~src/stores/focused';

export function PageBlockComponent() {
    const { blockPageId } = useParams();
    const page = useStore(
        findBlockStore<PageBlock>((block) => block.id === blockPageId)
    );
    useEffect(() => {
        resetFocus();
    }, [blockPageId]);

    if (!page) {
        return <Redirect to="/"></Redirect>;
    }
    const isEmpty = !page.children || page.children.length === 0;

    const pageInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedBlock: Block = {
            ...page,
            title: e.target.value,
        };
        updateBlock({
            target: updatedBlock,
        });
    };

    const blockKeyPressHandler = (
        block: InputBasedBlock,
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        const isEmptyTitle = block.title === '';

        const isHeaderBlock = block.type === 'header';
        const isPageBlock = block.type === 'page';

        switch (e.key) {
            case 'Backspace':
            case 'Delete':
                if (isEmptyTitle) {
                    e.preventDefault();
                    convertBlock({
                        target: block,
                        type: 'text',
                    });
                    break;
                }
                break;
            case 'Enter':
                e.preventDefault();
                if (isEmptyTitle) {
                    convertBlock({
                        target: block,
                        type: 'text',
                    });
                    break;
                }
                const target = textBlockFactory();
                insertNextNeighbour({ source: block, target });
                setFocus({ target });
                break;
            case 'ArrowUp':
                e.preventDefault();
                focusPrevious({ source: block });
                break;
            case 'ArrowDown':
                e.preventDefault();
                focusNext({ source: block });
                break;
            case ']':
                if (block.title === '[' && block.type !== 'checkbox') {
                    e.preventDefault();
                    convertBlock({
                        target: block,
                        type: 'checkbox',
                        options: { title: '' },
                    });
                }
                break;
            case ' ':
            case 'Spacebar':
                if (block.title === '#' && !isHeaderBlock) {
                    e.preventDefault();
                    convertBlock({
                        target: block,
                        type: 'header',
                        options: { title: '', size: 'h1' },
                    });
                    break;
                }
                if (block.title === '##' && !isHeaderBlock) {
                    e.preventDefault();
                    convertBlock({
                        target: block,
                        type: 'header',
                        options: { title: '', size: 'h2' },
                    });
                    break;
                }
                if (block.title === '###' && !isHeaderBlock) {
                    e.preventDefault();
                    convertBlock({
                        target: block,
                        type: 'header',
                        options: { title: '', size: 'h3' },
                    });
                    break;
                }
                if (block.title === '####' && !isHeaderBlock) {
                    e.preventDefault();
                    convertBlock({
                        target: block,
                        type: 'header',
                        options: { title: '', size: 'h4' },
                    });
                    break;
                }
                if (block.title === '/page' && !isPageBlock) {
                    e.preventDefault();
                    convertBlock({
                        target: block,
                        type: 'page',
                    });
                    break;
                }
        }
    };

    const emptyPageClickHandler = () => {
        pushChild({
            parent: page,
            child: textBlockFactory(),
        });
    };

    const blockOnChangeHandler = (block: Block) => {
        updateBlock({ target: block });
    };

    const mapChildren = (children: Block[]) => {
        return children.map((block) => {
            return (
                <FactoryBlockComponent
                    key={block.id}
                    block={block}
                    onChange={blockOnChangeHandler}
                    onKeyDown={blockKeyPressHandler}
                >
                    {mapChildren(block.children)}
                </FactoryBlockComponent>
            );
        });
    };

    const blocksComponents = (
        <div className="page__blocks">{mapChildren(page.children)}</div>
    );
    const emptyPageComponent = (
        <EmptyPageComponent
            onClick={emptyPageClickHandler}
        ></EmptyPageComponent>
    );
    return (
        <div className="page-page" data-cy="page">
            <PageBlockBreadCrumbComponent
                page={page}
            ></PageBlockBreadCrumbComponent>
            <h1>
                <input
                    className="block-component__title"
                    value={page.title}
                    onChange={pageInputChangeHandler}
                ></input>
            </h1>
            {isEmpty ? emptyPageComponent : blocksComponents}
        </div>
    );
}
