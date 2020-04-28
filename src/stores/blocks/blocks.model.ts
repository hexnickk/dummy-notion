import { KeyboardEvent } from 'react';

export type BlocksState = Block;

interface BaseBlock {
    id: string;
    children: Array<Block>;
    createdAt: Date;
    updatedAt: Date;
}

interface BaseBlockDTO {
    id: string;
    children: Array<BlockDTO>;
    createdAt: number;
    updatedAt: number;
}

export interface CheckboxBlock extends BaseBlock {
    type: 'checkbox';
    title: string;
    checked: boolean;
}

export interface CheckboxBlockDTO extends BaseBlockDTO {
    type: 'checkbox';
    title: string;
    checked: boolean;
}

export interface TextBlock extends BaseBlock {
    type: 'text';
    title: string;
}

export interface TextBlockDTO extends BaseBlockDTO {
    type: 'text';
    title: string;
}

export interface RootBlock extends BaseBlock {
    type: 'root';
}

export interface RootBlockDTO extends BaseBlockDTO {
    type: 'root';
}

export interface PageBlock extends BaseBlock {
    type: 'page';
    title: string;
}

export interface PageBlockDTO extends BaseBlockDTO {
    type: 'page';
    title: string;
}

export interface HeaderBlock extends BaseBlock {
    type: 'header';
    size: 'h1' | 'h2' | 'h3' | 'h4';
    title: string;
}

export interface HeaderBlockDTO extends BaseBlockDTO {
    type: 'header';
    size: 'h1' | 'h2' | 'h3' | 'h4';
    title: string;
}

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

export type InputBasedBlock =
    | TextBlock
    | CheckboxBlock
    | HeaderBlock
    | PageBlock;

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
