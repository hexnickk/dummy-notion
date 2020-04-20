import React, {
    ChangeEvent,
    useRef,
    useEffect,
    useMemo,
    KeyboardEvent,
} from 'react';
import { InputBasedBlockComponentProps, HeaderBlock } from '~src/stores/blocks';

const headerWrapperStrategy = (size: HeaderBlock['size']) => {
    switch (size) {
        case 'h1':
            return (props) => <h1>{props.children}</h1>;
        case 'h2':
            return (props) => <h2>{props.children}</h2>;
        case 'h3':
            return (props) => <h3>{props.children}</h3>;
        case 'h4':
            return (props) => <h4>{props.children}</h4>;
        default:
            return (props) => <strong>{props.children}</strong>;
    }
};

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
        const HeaderWrapper = useMemo(() => headerWrapperStrategy(block.size), [
            block.size,
        ]);

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
                <HeaderWrapper>
                    <input
                        className="block-component__title"
                        ref={inputNode}
                        value={block.title}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                    ></input>
                </HeaderWrapper>
            </div>
        );
    }
);
