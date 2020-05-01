import React, { useRef, useCallback } from 'react';
import { useStore } from 'effector-react';

import { Block, InputBasedBlockComponentProps } from '~src/stores/blocks';
import { TextBlockComponent } from '~src/components/text-block';
import { CheckboxBlockComponent } from '~src/components/checkbox-block';
import { HeaderBlockComponent } from '~src/components/header-block';
import { PageLinkBlockComponent } from '~src/components/page-link-block';
import { isFocused, setFocus} from '~src/stores/focused';
import { $selectedStore } from '~src/stores/selected';

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
        const focused = useStore(isFocused(block))
        // TODO: check why this doesnt work
        const selected = useStore($selectedStore.map((state) => state.indexOf(node.current) !== -1));
        const BlockComponent = blockComponentFactory(block);
        const onClick = useCallback(() => {
            setFocus({ target: block });
        }, [block]);

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
