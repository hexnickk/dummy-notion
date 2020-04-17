import { nanoid } from '~node_modules/nanoid';

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

export interface CheckboxFactory {
    title?: string;
}
export const checkboxFactory = ({ title }: CheckboxFactory = {}) => ({
    id: nanoid(),
    type: 'checkbox' as 'checkbox',
    checked: false,
    title: title ?? '',
    children: [],
    createdAt: new Date(),
    updatedAt: new Date(),
});

export type CheckboxBlockDTO = Omit<
    CheckboxBlock,
    'createdAt' | 'updatedAt'
> & {
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

export type Block = CheckboxBlock | RootBlock | PageBlock;

export type Blocks = Block[];

export type BlockDTO = CheckboxBlockDTO | RootBlockDTO | PageBlockDTO;

export type BlocksDTO = BlockDTO[];
