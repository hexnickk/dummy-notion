import React, { ChangeEvent, useRef, useEffect, KeyboardEvent } from 'react';
import { CheckboxBlock } from '~src/stores/blocks';
import './checkbox-block.component.scss';

interface CheckboxBlockComponentProps {
    block: CheckboxBlock;
    focused?: boolean;
    onClick?: () => void;
    onUpdate?: (block: CheckboxBlock) => void;
    onDelete?: (block: CheckboxBlock) => void;
    onPrevious?: () => void;
    onNext?: () => void;
    onSubmit?: (todo: CheckboxBlock) => void;
}

export const CheckboxBlockComponent = React.memo(
    ({
        block,
        focused,
        onClick,
        onUpdate,
        onDelete,
        onSubmit,
        onPrevious,
        onNext,
    }: CheckboxBlockComponentProps) => {
        const containerNode = useRef<HTMLDivElement>();
        const inputNode = useRef<HTMLInputElement>();

        useEffect(() => {
            if (focused) {
                inputNode.current.focus();
            }
        }, [focused]);

        const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
            onUpdate?.({
                ...block,
                checked: e.target.checked,
            });
        };
        const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            onUpdate?.({ ...block, title: e.target.value });
        };
        const titleKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            switch (e.key) {
                case 'Backspace':
                case 'Delete':
                    if (block.title === '') {
                        e.preventDefault();
                        onDelete?.(block);
                    }
                    break;
                case 'Enter':
                    e.preventDefault();
                    onSubmit?.(block);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    onPrevious?.();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    onNext?.();
                    break;
            }
        };

        return (
            <div
                className="checkbox-block"
                ref={containerNode}
                onClick={onClick}
            >
                <input
                    type="checkbox"
                    className="checkbox-block__checkbox"
                    checked={block.checked}
                    onChange={checkHandler}
                ></input>
                &nbsp;
                <input
                    className="checkbox-block__title"
                    ref={inputNode}
                    value={block.title}
                    onChange={titleChangeHandler}
                    onKeyDown={titleKeyPressHandler}
                ></input>
            </div>
        );
    }
);
