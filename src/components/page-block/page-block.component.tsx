import React, { useState } from 'react';
import { useStore } from 'effector-react';
import {
    deleteBlock,
    updateBlock,
    findBlockStore,
    PageBlock,
    childrenBlocksStore,
    Block,
    addChildToEnd,
    checkboxFactory,
    addChildNextTo,
} from '~src/stores/blocks';
import './page-block.component.scss';
import { useParams } from 'react-router-dom';
import { CheckboxBlockComponent } from '~src/components/checkbox-block';
import { EmptyPageComponent } from '~src/components/empty-page';

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

    const blockOnSubmitHandler = (block: Block) => {
        addChildNextTo({
            parent: page,
            child: checkboxFactory(),
            neighbour: block,
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

    const blockFactory = (block: Block, index: number) => {
        switch (block.type) {
            case 'checkbox':
                return (
                    <CheckboxBlockComponent
                        key={block.id}
                        block={block}
                        focused={index === focused}
                        onUpdate={updateBlock}
                        onDelete={deleteBlockHandler}
                        onNext={focusNextBlock}
                        onClick={focusSetBlock(index)}
                        onPrevious={focusPreviousBlock}
                        onSubmit={blockOnSubmitHandler}
                    ></CheckboxBlockComponent>
                );
            default:
                return <div>Unsupported block ☹️</div>;
        }
    };

    const emptyPageClickHandler = () => {
        addChildToEnd({
            parent: page,
            child: checkboxFactory(),
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
