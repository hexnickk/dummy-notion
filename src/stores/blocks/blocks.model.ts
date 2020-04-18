import { KeyboardEvent } from 'react';

export type BlocksState = Blocks;

interface BaseBlock {
    id: string;
    children: Array<BaseBlock['id']>;
    createdAt: Date;
    updatedAt: Date;
}

export interface CheckboxBlock extends BaseBlock {
    type: 'checkbox';
    title: string;
    checked: boolean;
    description?: string;
}

export type CheckboxBlockDTO = Omit<
    CheckboxBlock,
    'createdAt' | 'updatedAt'
> & {
    createdAt: number;
    updatedAt: number;
};

export interface TextBlock extends BaseBlock {
    type: 'text';
    title: string;
}

export type TextBlockDTO = Omit<TextBlock, 'createdAt' | 'updatedAt'> & {
    createdAt: number;
    updatedAt: number;
};

export interface RootBlock extends BaseBlock {
    type: 'root';
}

export type RootBlockDTO = Omit<RootBlock, 'createdAt' | 'updatedAt'> & {
    createdAt: number;
    updatedAt: number;
};

export interface PageBlock extends BaseBlock {
    type: 'page';
    title: string;
}

export type PageBlockDTO = Omit<PageBlock, 'createdAt' | 'updatedAt'> & {
    createdAt: number;
    updatedAt: number;
};

export interface HeaderBlock extends BaseBlock {
    type: 'header';
    size: 'h1' | 'h2' | 'h3' | 'h4';
    title: string;
}

export type HeaderBlockDTO = Omit<HeaderBlock, 'createdAt' | 'updatedAt'> & {
    createdAt: number;
    updatedAt: number;
};

export type Block =
    | CheckboxBlock
    | RootBlock
    | PageBlock
    | TextBlock
    | HeaderBlock;

export type Blocks = Block[];

export type BlockDTO =
    | RootBlockDTO
    | CheckboxBlockDTO
    | PageBlockDTO
    | TextBlockDTO
    | HeaderBlockDTO;

export type BlocksDTO = BlockDTO[];

export type InputBasedBlock = TextBlock | CheckboxBlock | HeaderBlock;

export interface BlockComponentProps<T extends Block = Block> {
    block: T;
    focused?: boolean;
    onClick?: () => void;
    onChange?: (block: T) => void;
}

export interface InputBasedBlockComponentProps<T extends Block = Block>
    extends BlockComponentProps<T> {
    onKeyDown?: (
        block: InputBasedBlock,
        e: KeyboardEvent<HTMLInputElement>
    ) => void;
}
