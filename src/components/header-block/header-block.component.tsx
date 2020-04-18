import React, { ChangeEvent, useRef, useEffect, KeyboardEvent } from 'react';
import { InputBasedBlockComponentProps, HeaderBlock } from '~src/stores/blocks';

export const HeaderBlockComponent = React.memo(
    ({
        block,
        focused,
        onClick,
        onKeyDown,
        onChange,
    }: InputBasedBlockComponentProps<HeaderBlock>) => {
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
            <div
                className="block-component"
                ref={containerNode}
                onClick={onClick}
            >
                <h1>
                    <input
                        className="block-component__title"
                        ref={inputNode}
                        value={block.title}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                    ></input>
                </h1>
            </div>
        );
    }
);
