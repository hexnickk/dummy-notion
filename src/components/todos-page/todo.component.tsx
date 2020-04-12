import React, { ChangeEvent } from 'react';
import { Todo, TodoStates } from '~src/stores/todos';

interface TodoComponentProps {
    todo: Todo;
    onUpdate?: (todo: Todo) => void;
    onDelete?: (todo: Todo) => void;
}
export const TodoComponent = React.memo(
    ({ todo, onUpdate, onDelete }: TodoComponentProps) => {
        const deleteHandler = () => {
            onDelete?.(todo);
        };
        const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
            onUpdate?.({
                ...todo,
                state: e.target.checked
                    ? TodoStates.CHECKED
                    : TodoStates.UNCHECKED,
            });
        };
        const isChecked = todo.state === TodoStates.CHECKED;
        return (
            <div>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={checkHandler}
                ></input>
                &nbsp;
                <span>{todo.title}</span>
                &nbsp;
                <button onClick={deleteHandler}>x</button>
                <p>{todo.description}</p>
            </div>
        );
    }
);
