import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
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
import { CheckboxBlockComponent } from '~src/components/checkbox-block';
import { EmptyPageComponent } from '~src/components/empty-page';
import { TextBlockComponent } from '~src/components/text-block/text-block.components';
import { HeaderBlockComponent } from '~src/components/header-block';
import { PageLinkBlockComponent } from '~src/components/page-link-block';
import { PageBlockBreadCrumbComponent } from '~src/components/page-block-breadcrumb';

const min = (a, b) => (a < b ? a : b);
const max = (a, b) => (a > b ? a : b);

export function PageBlockComponent() {
    const { blockPageId } = useParams();
    const [focused, setFocused] = useState(0);
    const page = useStore(
        findBlockStore<PageBlock>((block) => block.id === blockPageId)
    );
    const children = page.children;
    const isEmpty = !children || children.length === 0;

    const focusNextBlock = () => {
        setFocused(min(focused + 1, children.length - 1));
    };

    const forceFocusNextBlock = () => {
        setFocused(focused + 1);
    };

    const focusPreviousBlock = () => {
        setFocused(max(focused - 1, 0));
    };

    const focusSetBlock = (index: number) => () => {
        setFocused(index);
    };

    const pageInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedBlock: Block = {
            ...page,
            title: e.target.value,
        };
        updateBlock({
            target: updatedBlock,
        });
    };

    const createChildBlockHandler = (initializer: Block, target: Block) => {
        const position = page.children.findIndex(
            (item) => item.id === initializer.id
        );
        insertChild({
            parent: page,
            target: target,
            position,
        });
        forceFocusNextBlock();
    };

    const deleteBlockHandler = (block: Block) => {
        deleteBlock({
            target: block,
        });
        focusPreviousBlock();
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
                focusPreviousBlock();
                break;
            case 'ArrowDown':
                e.preventDefault();
                focusNextBlock();
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

    const blockComponentFactory = (block: Block) => {
        switch (block.type) {
            case 'text':
                return TextBlockComponent;
            case 'checkbox':
                return CheckboxBlockComponent;
            case 'header':
                return HeaderBlockComponent;
            case 'page':
                return PageLinkBlockComponent;
            default:
                return (_props: any) => <div>Unsupported block ☹️</div>;
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

    const blockComponents = children.map((block, index) => {
        const BlockComponent = blockComponentFactory(block);
        return (
            <BlockComponent
                key={block.id}
                block={block}
                focused={index === focused}
                onChange={blockOnChangeHandler}
                onClick={focusSetBlock(index)}
                onKeyDown={blockKeyPressHandler}
            ></BlockComponent>
        );
    });
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
            {isEmpty ? emptyPageComponent : blockComponents}
        </div>
    );
}
