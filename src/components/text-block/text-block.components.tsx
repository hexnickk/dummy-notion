import React, { ChangeEvent, useRef, useEffect, KeyboardEvent } from 'react';
import {
    TextBlock,
    InputBasedBlockComponentProps,
    deleteBlock,
    textBlockFactory,
    insertNextNeighbour,
} from '~src/stores/blocks';
import { focusPrevious, setFocus } from '~src/stores/focused';

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
            switch (e.key) {
                case 'Backspace':
                case 'Delete':
                    if (block.title === '') {
                        e.preventDefault();
                        focusPrevious({ source: block });
                        deleteBlock({ target: block });
                        break;
                    }
                    onKeyDown?.(block, e);
                    break;
                case 'Enter':
                    if (block.title === '') {
                        e.preventDefault();
                        const target = textBlockFactory();
                        insertNextNeighbour({ source: block, target });
                        setFocus({ target });
                        break;
                    }
                    onKeyDown?.(block, e);
                    break;
                default:
                    onKeyDown?.(block, e);
            }
        };

        return (
            <div
                className="block-component"
                ref={containerNode}
                onClick={onClick}
            >
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
