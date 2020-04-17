import React, { ChangeEvent, useRef, KeyboardEvent } from 'react';
import { CheckboxBlock } from '~src/stores/blocks';
import './checkbox-block.component.scss';

interface CheckboxBlockComponentProps {
    block: CheckboxBlock;
    onUpdate?: (todo: CheckboxBlock) => void;
    onDelete?: (todo: CheckboxBlock) => void;
    onPrevious?: () => void;
    onNext?: () => void;
    onSubmit?: (todo: CheckboxBlock) => void;
}

export const CheckboxBlockComponent = React.memo(
    ({
        block,
        onUpdate,
        onDelete,
        onSubmit,
        onPrevious,
        onNext,
    }: CheckboxBlockComponentProps) => {
        const node = useRef<HTMLDivElement>();

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
                        onDelete?.(block);
                    }
                    break;
                case 'Enter':
                    onSubmit?.(block);
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
                    checked={block.checked}
                    onChange={checkHandler}
                ></input>
                &nbsp;
                <input
                    className="checkbox-block__title"
                    value={block.title}
                    onChange={titleChangeHandler}
                    onKeyDown={titleKeyPressHandler}
                ></input>
            </div>
        );
    }
);
