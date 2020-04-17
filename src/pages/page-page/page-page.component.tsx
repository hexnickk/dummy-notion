import React from 'react';
import { useStore } from 'effector-react';
import {
    addTodo,
    updateTodo,
    deleteTodo,
    todosByListIdStore,
} from '~src/stores/todos';
import './page-page.component.scss';
import { $pageByIdStore } from '~src/stores/pages';
import { useParams } from 'react-router-dom';
import { CheckboxBlockComponent } from '~src/components/checkbox-block';
import EmptySpaceComponent from '~src/components/empty-page/empty-page.component';

export default function PagePage() {
    const { listId } = useParams();
    const list = useStore($pageByIdStore(listId));
    const todos = useStore(todosByListIdStore(listId));
    const isEmpty = todos.length === 0;

    const handleEmptyPageClick = () => {
        addTodo({
            listId,
        });
    }

    const todosComponents = todos.map((todo) => (
        <CheckboxBlockComponent
            key={todo.id}
            todo={todo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
        ></CheckboxBlockComponent>
    ));
    const emptyPageComponent = <EmptySpaceComponent onClick={handleEmptyPageClick}></EmptySpaceComponent>;
    return (
        <div className="page-page">
            <h1>{list.title}</h1>
            {isEmpty ? emptyPageComponent : todosComponents}
        </div>
    );
}
