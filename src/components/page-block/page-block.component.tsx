import React, { useState, KeyboardEvent } from 'react';
import './page-block.component.scss';

import { useStore } from 'effector-react';
import {
    deleteBlock,
    updateBlock,
    findBlockStore,
    PageBlock,
    childrenBlocksStore,
    Block,
    pushBlock,
    insertBlock,
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

const min = (a, b) => (a < b ? a : b);
const max = (a, b) => (a > b ? a : b);

export function PageBlockComponent() {
    const { blockPageId } = useParams();
    const [focused, setFocused] = useState(0);
    const page = useStore(
        findBlockStore<PageBlock>((block) => block.id === blockPageId)
    );
    const children = useStore(childrenBlocksStore(page));
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

    const createChildBlockHandler = (
        initializer: Block,
        target: Block = textBlockFactory()
    ) => {
        const position = page.children.indexOf(initializer.id);
        insertBlock({
            parent: page,
            target: target,
            position,
        });
        forceFocusNextBlock();
    };

    const deleteBlockHandler = (block: Block) => {
        deleteBlock({
            parent: page,
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
        const isCheckBox = block.type === 'checkbox';
        const isHeaderBlock = block.type === 'header';
        switch (e.key) {
            case 'Backspace':
            case 'Delete':
                if (isEmptyTitle && (isTextBlock || isHeaderBlock)) {
                    e.preventDefault();
                    deleteBlockHandler(block);
                    break;
                }
                if (isEmptyTitle) {
                    e.preventDefault();
                    convertBlock({
                        parent: page,
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
                        parent: page,
                        target: block,
                        type: 'text' as 'text',
                    });
                } else if (isCheckBox) {
                    createChildBlockHandler(block, checkboxBlockFactory());
                } else {
                    createChildBlockHandler(block);
                }
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
                        parent: page,
                        target: block,
                        type: 'checkbox',
                    });
                }
                break;
            case ' ':
            case 'Spacebar':
                const isNotHeader = block.type !== "header";
                if (block.title === '#' && isNotHeader) {
                    e.preventDefault();
                    convertBlock({
                        parent: page,
                        target: block,
                        type: 'header',
                        options: { size: 'h1' },
                    });
                } else if (block.title === '##' && isNotHeader) {
                    e.preventDefault();
                    convertBlock({
                        parent: page,
                        target: block,
                        type: 'header',
                        options: { size: 'h2' },
                    });
                } else if (block.title === '###' && isNotHeader) {
                    e.preventDefault();
                    convertBlock({
                        parent: page,
                        target: block,
                        type: 'header',
                        options: { size: 'h3' },
                    });
                } else if (block.title === '####' && isNotHeader) {
                    e.preventDefault();
                    convertBlock({
                        parent: page,
                        target: block,
                        type: 'header',
                        options: { size: 'h4' },
                    });
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
            default:
                return (_props: any) => <div>Unsupported block ☹️</div>;
        }
    };

    const emptyPageClickHandler = () => {
        pushBlock({
            parent: page,
            target: textBlockFactory(),
        });
    };

    const blockComponents = children.map((block, index) => {
        const BlockComponent = blockComponentFactory(block);
        return (
            <BlockComponent
                key={block.id}
                block={block}
                focused={index === focused}
                onChange={updateBlock}
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
            <h1>{page.title}</h1>
            {isEmpty ? emptyPageComponent : blockComponents}
        </div>
    );
}
