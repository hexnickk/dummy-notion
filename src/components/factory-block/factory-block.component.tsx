import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useStore } from 'effector-react';

import { Block, InputBasedBlockComponentProps } from '~src/stores/blocks';
import { TextBlockComponent } from '~src/components/text-block';
import { CheckboxBlockComponent } from '~src/components/checkbox-block';
import { HeaderBlockComponent } from '~src/components/header-block';
import { PageLinkBlockComponent } from '~src/components/page-link-block';
import { isFocused, setFocus } from '~src/stores/focused';
import { $selectedStore, setSelected } from '~src/stores/selected';
import { $selectionStore } from '~src/stores/selection';

const blockComponentFactory = (block: Block) => {
    switch (block.type) {
        case 'text':
            return TextBlockComponent;
        case 'checkbox':
            return CheckboxBlockComponent;
        case 'header':
            return HeaderBlockComponent;
        case 'page':
            return PageLinkBlockComponent;
        default:
            return (_props: any) => <div>Unsupported block ☹️</div>;
    }
};

const mousePressedEffect = (
    node: Element,
    callback: (payload: { state: boolean; event?: MouseEvent }) => void
) => {
    const mouseDownHandler = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }
        if (node.contains(target)) {
            callback({ state: true, event });
        }
    };
    const mouseUpHandler = (event: MouseEvent) =>
        callback({ state: false, event });
    addEventListener('mousedown', mouseDownHandler);
    addEventListener('mouseup', mouseUpHandler);
    return () => {
        removeEventListener('mousedown', mouseDownHandler);
        removeEventListener('mouseup', mouseUpHandler);
    };
};

const mouseLeftEffect = (
    node: Element,
    callback: (payload: { state: boolean; event?: MouseEvent }) => void
) => {
    const mouseHandler = (handler: (event: MouseEvent) => any) => (
        event: MouseEvent
    ) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }
        if (node.contains(target)) {
            handler(event);
        }
    };
    const mouseleaveHandler = mouseHandler((event) =>
        callback({ state: true, event })
    );
    const mouseEnterHandler = mouseHandler((event) =>
        callback({ state: false, event })
    );
    node.addEventListener('mouseleave', mouseleaveHandler);
    node.addEventListener('mouseenter', mouseEnterHandler);
    return () => {
        node.removeEventListener('mouseleave', mouseleaveHandler);
        node.removeEventListener('mouseenter', mouseEnterHandler);
    };
};

export const FactoryBlockComponent = React.memo(
    ({
        block,
        onChange,
        onKeyDown,
    }: Omit<
        InputBasedBlockComponentProps,
        'focused' | 'selected' | 'onClick'
    >) => {
        const node = useRef<HTMLDivElement>();
        const focused = useStore(isFocused(block));
        // TODO: check why this doesnt work
        const selected = useStore(
            $selectedStore.map((state) => state.indexOf(node.current) !== -1)
        );
        const [mousePressed, setMousePressed] = useState(false);
        const [mouseLeft, setMouseLeft] = useState(false);
        const [mouseEvent, setMouseEvent] = useState<MouseEvent>(undefined);
        useEffect(
            () =>
                mousePressedEffect(node.current, ({ state, event }) => {
                    setMousePressed(state);
                    setMouseEvent(event);
                }),
            [node]
        );
        useEffect(
            () =>
                mouseLeftEffect(node.current, ({ state }) => {
                    setMouseLeft(state);
                }),
            [node]
        );
        const selection = useStore($selectionStore);
        useEffect(() => {
            if (mousePressed && mouseLeft) {
                selection.trigger(mouseEvent);
            }
        }, [mousePressed, mouseLeft]);

        const onClick = useCallback(() => {
            setFocus({ target: block });
            setSelected({ targets: [] });
        }, [block]);

        const BlockComponent = blockComponentFactory(block);
        return (
            <div
                className="block-selectable"
                style={{
                    backgroundColor: selected ? 'red' : 'inherit',
                }}
                ref={node}
            >
                <BlockComponent
                    block={block}
                    focused={focused}
                    selected={selected}
                    onChange={onChange}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                ></BlockComponent>
            </div>
        );
    }
);
