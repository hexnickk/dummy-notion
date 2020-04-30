import React, { KeyboardEvent, ChangeEvent, useEffect } from 'react';
import './page-block.component.scss';

import { useStore } from 'effector-react';
import {
    deleteBlock,
    updateBlock,
    findBlockStore,
    PageBlock,
    Block,
    pushChild,
    insertChild,
    InputBasedBlock,
    textBlockFactory,
    convertBlock,
    checkboxBlockFactory,
} from '~src/stores/blocks';
import { useParams } from 'react-router-dom';
import { EmptyPageComponent } from '~src/components/empty-page';
import { PageBlockBreadCrumbComponent } from '~src/components/page-block-breadcrumb';
import { FactoryBlockComponent } from '~src/components/factory-block';
import { focusNext, focusPrevious, resetFocus } from '~src/stores/focused';

export function PageBlockComponent() {
    const { blockPageId } = useParams();
    const page = useStore(
        findBlockStore<PageBlock>((block) => block.id === blockPageId)
    );
    const children = page.children;
    const isEmpty = !children || children.length === 0;

    useEffect(() => {
        resetFocus();
    }, [blockPageId]);

    const pageInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedBlock: Block = {
            ...page,
            title: e.target.value,
        };
        updateBlock({
            target: updatedBlock,
        });
    };

    const createChildBlockHandler = (source: Block, target: Block) => {
        const position = page.children.findIndex(
            (item) => item.id === source.id
        );
        insertChild({
            parent: page,
            target: target,
            position,
        });
        focusNext({ source: source });
    };

    const deleteBlockHandler = (block: Block) => {
        focusPrevious({ source: block });
        deleteBlock({
            target: block,
        });
    };

    const blockKeyPressHandler = (
        block: InputBasedBlock,
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        const isEmptyTitle = block.title === '';

        const isTextBlock = block.type === 'text';
        const isCheckBoxBlock = block.type === 'checkbox';
        const isHeaderBlock = block.type === 'header';
        const isPageBlock = block.type === 'page';

        switch (e.key) {
            case 'Backspace':
            case 'Delete':
                if (isEmptyTitle && isTextBlock) {
                    e.preventDefault();
                    deleteBlockHandler(block);
                    break;
                }
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
                if (isEmptyTitle && !isTextBlock) {
                    convertBlock({
                        target: block,
                        type: 'text',
                    });
                    break;
                }
                if (isCheckBoxBlock) {
                    createChildBlockHandler(block, checkboxBlockFactory());
                    break;
                }
                createChildBlockHandler(block, textBlockFactory());
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
                        options: { size: 'h1' },
                    });
                    break;
                }
                if (block.title === '##' && !isHeaderBlock) {
                    e.preventDefault();
                    convertBlock({
                        target: block,
                        type: 'header',
                        options: { size: 'h2' },
                    });
                    break;
                }
                if (block.title === '###' && !isHeaderBlock) {
                    e.preventDefault();
                    convertBlock({
                        target: block,
                        type: 'header',
                        options: { size: 'h3' },
                    });
                    break;
                }
                if (block.title === '####' && !isHeaderBlock) {
                    e.preventDefault();
                    convertBlock({
                        target: block,
                        type: 'header',
                        options: { size: 'h4' },
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

    const blocksComponents = (
        <div className="page__blocks">
            {children.map((block, index) => (
                <FactoryBlockComponent
                    key={block.id}
                    block={block}
                    onChange={blockOnChangeHandler}
                    onKeyDown={blockKeyPressHandler}
                ></FactoryBlockComponent>
            ))}
        </div>
    );
    const emptyPageComponent = (
        <EmptyPageComponent
            onClick={emptyPageClickHandler}
        ></EmptyPageComponent>
    );
    return (
        <div className="page-page">
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
