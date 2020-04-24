import React from 'react';
import { Link } from 'react-router-dom';
import { InputBasedBlockComponentProps, PageBlock } from '~src/stores/blocks';

export const PageLinkBlockComponent = React.memo(
    ({ block }: InputBasedBlockComponentProps<PageBlock>) => {
        return <Link to={block.id}>{block.title}</Link>;
    }
);
