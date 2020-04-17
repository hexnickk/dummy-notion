import React, {
    ChangeEvent,
    useEffect,
    useRef,
    useState,
    KeyboardEvent,
} from 'react';
import { Todo } from '~src/stores/todos';
import { Checkbox, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import './todo.component.scss';

const enum ComponentStates {
    VIEW,
    EDIT,
}

interface TodoComponentProps {
    todo: Todo;
    onUpdate?: (todo: Todo) => void;
    onDelete?: (todo: Todo) => void;
}

export const TodoComponent = React.memo(
    ({ todo, onUpdate, onDelete }: TodoComponentProps) => {
        const node = useRef<HTMLDivElement>();
        const [componentState, setComponentState] = useState<ComponentStates>(
            ComponentStates.VIEW
        );
        const [title, setTitle] = useState<string>(todo.title);

        const saveAndCloseInput = () => {
            // TODO: refactor onDelete and onUpdate checks
            if (componentState === ComponentStates.EDIT) {
                if (title === '') {
                    onDelete?.(todo);
                    return;
                }
                onUpdate?.({
                    ...todo,
                    title,
                });
                setComponentState(ComponentStates.VIEW);
            }
        };
        const handleDocumentClick = (e: MouseEvent) => {
            if (
                e.target instanceof HTMLElement &&
                node.current.contains(e.target)
            ) {
                // inside click
                return;
            } // outside click
            saveAndCloseInput();
        };
        useEffect(() => {
            document.addEventListener('mousedown', handleDocumentClick);
            return () => {
                document.removeEventListener('mousedown', handleDocumentClick);
            };
        });

        const checkHandler = (e: CheckboxChangeEvent) => {
            onUpdate?.({
                ...todo,
                checked: e.target.checked,
            });
        };
        const titleClickHandler = () => {
            setComponentState(ComponentStates.EDIT);
        };
        const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
        };
        const titleKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            const isDeleteKey = e.key === 'Backspace' || e.key === 'Delete';
            const isSubmitKey = e.key === 'Enter' || e.key === 'Escape';
            const isEmptyTitle = title === '';
            if (isDeleteKey && isEmptyTitle) {
                onDelete?.(todo);
                return;
            }
            if (isSubmitKey && isEmptyTitle) {
                onDelete?.(todo);
                return;
            }
            if (isSubmitKey) {
                saveAndCloseInput();
                return;
            }
        };

        const viewComponent = (
            <div className="todo__title" onClick={titleClickHandler}>
                {todo.title}
            </div>
        );
        const editComponent = (
            <Input
                className="todo__title todo__title_input"
                value={title}
                onChange={titleChangeHandler}
                onKeyDown={titleKeyPressHandler}
            ></Input>
        );
        return (
            <div className="todo" ref={node}>
                <Checkbox
                    className="todo__checkbox"
                    checked={todo.checked}
                    onChange={checkHandler}
                ></Checkbox>
                &nbsp;
                {componentState === ComponentStates.VIEW
                    ? viewComponent
                    : editComponent}
            </div>
        );
    }
);
