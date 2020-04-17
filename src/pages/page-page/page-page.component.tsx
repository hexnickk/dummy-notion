import React from 'react';
import { useStore } from 'effector-react';
import {
    addBlock,
    deleteBlock,
    Block,
    blockByListIdStore,
    updateBlock,
} from '~src/stores/blocks';
import './page-page.component.scss';
import { $pageByIdStore } from '~src/stores/pages';
import { useParams } from 'react-router-dom';
import { CheckboxBlockComponent } from '~src/components/checkbox-block';
import { EmptyPageComponent } from '~src/components/empty-page';

export default function PagePage() {
    const { listId } = useParams();
    const list = useStore($pageByIdStore(listId));
    const todos = useStore(blockByListIdStore(listId));
    const isEmpty = todos.length === 0;

    const blockOnSubmitHandler = (todo: Block) => {
        addBlock({
            pageId: listId,
            position: 'next',
            relativeBlock: todo,
        });
    };
    const emptyPageClickHandler = () => {
        addBlock({
            pageId: listId,
            position: 'end',
        });
    };

    const todosComponents = todos.map((todo) => (
        <CheckboxBlockComponent
            key={todo.id}
            todo={todo}
            onUpdate={updateBlock}
            onDelete={deleteBlock}
            onSubmit={blockOnSubmitHandler}
        ></CheckboxBlockComponent>
    ));
    const emptyPageComponent = (
        <EmptyPageComponent
            onClick={emptyPageClickHandler}
        ></EmptyPageComponent>
    );
    return (
        <div className="page-page">
            <h1>{list.title}</h1>
            {isEmpty ? emptyPageComponent : todosComponents}
        </div>
    );
}
