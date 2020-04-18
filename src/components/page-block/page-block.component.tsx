import React from 'react';
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

export function PageBlockComponent() {
    const { blockPageId } = useParams();
    const page = useStore(
        findBlockStore<PageBlock>((block) => block.id === blockPageId)
    );
    const children = useStore(childrenBlocksStore(page));
    const isEmpty = !children || children.length === 0;

    const blockOnSubmitHandler = (block: Block) => {
        addChildNextTo({
            parent: page,
            child: checkboxFactory(),
            neighbour: block,
        });
    };

    const blockFactory = (block: Block) => {
        switch (block.type) {
            case 'checkbox':
                return (
                    <CheckboxBlockComponent
                        key={block.id}
                        block={block}
                        onUpdate={updateBlock}
                        onDelete={deleteBlock}
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
