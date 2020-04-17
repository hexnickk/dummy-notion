import React, { ChangeEvent, useRef, KeyboardEvent } from 'react';
import { Block } from '~src/stores/blocks';
import './checkbox-block.component.scss';

interface CheckboxBlockComponentProps {
    todo: Block;
    onUpdate?: (todo: Block) => void;
    onDelete?: (todo: Block) => void;
    onPrevious?: () => void;
    onNext?: () => void;
    onSubmit?: (todo: Block) => void;
}

export const CheckboxBlockComponent = React.memo(
    ({
        todo,
        onUpdate,
        onDelete,
        onSubmit,
        onPrevious,
        onNext,
    }: CheckboxBlockComponentProps) => {
        const node = useRef<HTMLDivElement>();

        const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
            onUpdate?.({
                ...todo,
                checked: e.target.checked,
            });
        };
        const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            onUpdate?.({ ...todo, title: e.target.value });
        };
        const titleKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            switch (e.key) {
                case 'Backspace':
                case 'Delete':
                    if (todo.title === '') {
                        onDelete?.(todo);
                    }
                    break;
                case 'Enter':
                    onSubmit?.(todo);
                    break;
                case 'ArrowUp':
                    onPrevious?.();
                    break;
                case 'ArrowDown':
                    onNext?.();
                    break;
            }
        };

        return (
            <div className="checkbox-block" ref={node}>
                <input
                    type="checkbox"
                    className="checkbox-block__checkbox"
                    checked={todo.checked}
                    onChange={checkHandler}
                ></input>
                &nbsp;
                <input
                    className="checkbox-block__title"
                    value={todo.title}
                    onChange={titleChangeHandler}
                    onKeyDown={titleKeyPressHandler}
                ></input>
            </div>
        );
    }
);
