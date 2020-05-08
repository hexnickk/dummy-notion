import React, {
    ChangeEvent,
    useRef,
    useEffect,
    KeyboardEvent,
    MouseEvent,
} from 'react';
import {
    attachToNeighbour,
    CheckboxBlock,
    checkboxBlockFactory,
    InputBasedBlockComponentProps,
    insertNextNeighbour,
} from '~src/stores/blocks';
import { setFocus } from '~src/stores/focused';

export const CheckboxBlockComponent = React.memo(
    ({
        block,
        focused,
        onChange,
        onKeyDown,
        children,
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
            switch (e.key) {
                case 'Tab':
                    e.preventDefault();
                    attachToNeighbour({ target: block });
                    break;
                case 'Enter':
                    e.preventDefault();
                    const target = checkboxBlockFactory();
                    insertNextNeighbour({
                        source: block,
                        target,
                    });
                    setFocus({ target });
                    break;
                default:
                    onKeyDown?.(block, e);
            }
        };

        const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
            setFocus({ target: block });
            e.stopPropagation();
        };

        return (
            <div
                className="block-component block-component_checkbox"
                ref={containerNode}
                onClick={onClickHandler}
            >
                <input
                    type="checkbox"
                    checked={block.checked}
                    onChange={onCheckChangeHandler}
                ></input>
                &nbsp;
                <div className="block-component__body">
                    <input
                        className="block-component__title"
                        ref={inputNode}
                        value={block.title}
                        onChange={onChangeHandler}
                        onKeyDown={keyDownHandler}
                    ></input>
                    <div className="block-component__children">{children}</div>
                </div>
            </div>
        );
    }
);
