import React, { useCallback } from 'react';
import { Block, InputBasedBlockComponentProps } from '~src/stores/blocks';
import { TextBlockComponent } from '~src/components/text-block';
import { CheckboxBlockComponent } from '~src/components/checkbox-block';
import { HeaderBlockComponent } from '~src/components/header-block';
import { PageLinkBlockComponent } from '~src/components/page-link-block';
import { useStore } from 'effector-react';
import { $focusedStore, setFocus } from '~src/stores/focused';

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
    }: Omit<InputBasedBlockComponentProps, 'focused' | 'onClick'>) => {
        const focusedBlock = useStore($focusedStore);
        const BlockComponent = blockComponentFactory(block);
        const onClick = useCallback(() => setFocus({ target: block }), []);
        return (
            <BlockComponent
                block={block}
                focused={block.id === focusedBlock?.id}
                onChange={onChange}
                onClick={onClick}
                onKeyDown={onKeyDown}
            ></BlockComponent>
        );
    }
);
