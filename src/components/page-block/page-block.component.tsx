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
    blockFactoryStrategy,
} from '~src/stores/blocks';
import { useParams } from 'react-router-dom';
import { CheckboxBlockComponent } from '~src/components/checkbox-block';
import { EmptyPageComponent } from '~src/components/empty-page';
import { TextBlockComponent } from '~src/components/text-block/text-block.components';

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

    const createChildBlockHandler = (initializer: Block) => {
        const childFactory = blockFactoryStrategy(initializer.type);
        const target = childFactory();
        const position = page.children.indexOf(initializer.id);
        insertBlock({
            parent: page,
            target,
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
                    break;
                }
                createChildBlockHandler(block);
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
                        type: 'checkbox' as 'checkbox',
                    });
                }
                break;
        }
    };

    const blockFactory = (block: Block, index: number) => {
        switch (block.type) {
            case 'text':
                return (
                    <TextBlockComponent
                        key={block.id}
                        block={block}
                        focused={index === focused}
                        onChange={updateBlock}
                        onClick={focusSetBlock(index)}
                        onKeyDown={blockKeyPressHandler}
                    ></TextBlockComponent>
                );
            case 'checkbox':
                return (
                    <CheckboxBlockComponent
                        key={block.id}
                        block={block}
                        focused={index === focused}
                        onChange={updateBlock}
                        onClick={focusSetBlock(index)}
                        onKeyDown={blockKeyPressHandler}
                    ></CheckboxBlockComponent>
                );
            default:
                return <div>Unsupported block ☹️</div>;
        }
    };

    const emptyPageClickHandler = () => {
        pushBlock({
            parent: page,
            target: textBlockFactory(),
        });
    };

    const todosComponents = children.map(blockFactory);
    const emptyPageComponent = (
        <EmptyPageComponent
            onClick={emptyPageClickHandler}
        ></EmptyPageComponent>
    );
    return (
        <div className="page-page">
            <h1>{page.title}</h1>
            {isEmpty ? emptyPageComponent : todosComponents}
        </div>
    );
}
