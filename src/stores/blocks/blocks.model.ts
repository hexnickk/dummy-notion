import { KeyboardEvent } from 'react';

export type BlocksState = Blocks;

export interface BaseBlock {
    id: string;
    children: Array<BaseBlock['id']>;
    createdAt: Date;
    updatedAt: Date;
}

export type BaseBlocks = BaseBlock[];

export type BaseBlockDTO = Omit<BaseBlock, 'createdAt' | 'updatedAt'> & {
    createdAt: number;
    updatedAt: number;
};

export type BaseBlocksDTO = BaseBlockDTO[];

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

export type Block = CheckboxBlock | RootBlock | PageBlock | TextBlock;

export type Blocks = Block[];

export type BlockDTO =
    | RootBlockDTO
    | CheckboxBlockDTO
    | PageBlockDTO
    | TextBlockDTO;

export type BlocksDTO = BlockDTO[];

export type InputBasedBlock = TextBlock | CheckboxBlock;

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
