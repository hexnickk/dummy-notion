import React, { ChangeEvent, useRef, useEffect, KeyboardEvent } from 'react';
import { TextBlock, InputBasedBlockComponentProps } from '~src/stores/blocks';
import './text-block.components.scss';

export const TextBlockComponent = React.memo(
    ({
        block,
        focused,
        onClick,
        onKeyDown,
        onChange,
    }: InputBasedBlockComponentProps<TextBlock>) => {
        const containerNode = useRef<HTMLDivElement>();
        const inputNode = useRef<HTMLInputElement>();

        useEffect(() => {
            if (focused) {
                inputNode.current.focus();
            }
        }, [focused]);

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            onChange?.({ ...block, title: e.target.value });
        };
        const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            onKeyDown?.(block, e);
        };

        return (
            <div className="block-component" ref={containerNode} onClick={onClick}>
                <input
                    className="block-component__title"
                    ref={inputNode}
                    value={block.title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                ></input>
            </div>
        );
    }
);
