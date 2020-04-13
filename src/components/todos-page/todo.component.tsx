import React from 'react';
import { Todo, TodoStates } from '~src/stores/todos';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CloseOutlined } from '@ant-design/icons';

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
        const checkHandler = (e: CheckboxChangeEvent) => {
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
                <Checkbox
                    checked={isChecked}
                    onChange={checkHandler}
                ></Checkbox>
                &nbsp;
                <span>{todo.title}</span>
                &nbsp;
                <span onClick={deleteHandler}>
                    <CloseOutlined />
                </span>
                <p>{todo.description}</p>
            </div>
        );
    }
);
