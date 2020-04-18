import React, { ChangeEvent, useRef, useEffect, KeyboardEvent } from 'react';
import {
    CheckboxBlock,
    InputBasedBlockComponentProps,
} from '~src/stores/blocks';
import './checkbox-block.component.scss';

export const CheckboxBlockComponent = React.memo(
    ({
        block,
        focused,
        onClick,
        onChange,
        onKeyDown,
    }: InputBasedBlockComponentProps<CheckboxBlock>) => {
        const containerNode = useRef<HTMLDivElement>();
        const inputNode = useRef<HTMLInputElement>();

        useEffect(() => {
            if (focused) {
                inputNode.current.focus();
            }
        }, [focused]);

        const onCheckChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            onChange?.({
                ...block,
                checked: e.target.checked,
            });
        };
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            onChange?.({ ...block, title: e.target.value });
        };
        const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            onKeyDown?.(block, e);
        };

        return (
            <div
                className="block-component"
                ref={containerNode}
                onClick={onClick}
            >
                <input
                    type="checkbox"
                    checked={block.checked}
                    onChange={onCheckChangeHandler}
                ></input>
                &nbsp;
                <input
                    className="block-component__title"
                    ref={inputNode}
                    value={block.title}
                    onChange={onChangeHandler}
                    onKeyDown={keyDownHandler}
                ></input>
            </div>
        );
    }
);
