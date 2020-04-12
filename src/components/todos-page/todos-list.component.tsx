import React from 'react';
import { Todo, Todos } from '~src/stores/todos';
import { TodoComponent } from './todo.component';

interface TodoListProps {
    todos: Todos;
    onUpdate?: (todo: Todo) => void;
    onDelete?: (todo: Todo) => void;
}
export const TodosListComponent = React.memo(
    ({ todos, onUpdate, onDelete }: TodoListProps) => {
        const todosComponents = todos.map((todo) => (
            <TodoComponent
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
            ></TodoComponent>
        ));
        return <div>{todosComponents}</div>;
    }
);
