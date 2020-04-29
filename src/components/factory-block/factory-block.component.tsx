import React from 'react';
import {
    Block,
    InputBasedBlockComponentProps,
} from '~src/stores/blocks';
import { TextBlockComponent } from '~src/components/text-block';
import { CheckboxBlockComponent } from '~src/components/checkbox-block';
import { HeaderBlockComponent } from '~src/components/header-block';
import { PageLinkBlockComponent } from '~src/components/page-link-block';

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
        focused,
        onChange,
        onClick,
        onKeyDown,
    }: InputBasedBlockComponentProps) => {
        const BlockComponent = blockComponentFactory(block);
        return (
            <BlockComponent
                block={block}
                focused={focused}
                onChange={onChange}
                onClick={onClick}
                onKeyDown={onKeyDown}
            ></BlockComponent>
        );
    }
);
