import React from 'react';
import {Todo, TodoStates} from "~src/stores/todos";

interface TodoComponentProps {
    todo: Todo;
}
export const TodoComponent = React.memo(({ todo }: TodoComponentProps) => {
    return <div>
        <input type="checkbox" checked={todo.state === TodoStates.CHECKED}></input>
        &nbsp;
        <span>{todo.title}</span>
        <p>{todo.description}</p>
    </div>;
});
