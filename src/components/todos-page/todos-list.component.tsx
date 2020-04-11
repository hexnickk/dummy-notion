import React from 'react';
import { Todos } from '~src/stores/todos';
import { TodoComponent } from './todo.component';

interface TodoListProps {
    todos: Todos;
}

export const TodosListComponent = React.memo(({ todos }: TodoListProps) => {
    const todosComponents = todos.map((todo) => (
        <TodoComponent key={todo.id} todo={todo}></TodoComponent>
    ));
    return <div>{todosComponents}</div>;
});
