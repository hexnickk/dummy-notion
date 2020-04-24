import { blocksDomain } from './blocks.domain';
import { Block } from './blocks.model';

export interface PushBlock {
    parent: Block;
    target: Block;
}
export const pushBlock = blocksDomain.createEvent<PushBlock>(
    'Push block to the end'
);

export interface InsertBlock {
    parent: Block;
    target: Block;
    position: number;
}
export const insertBlock = blocksDomain.createEvent<InsertBlock>(
    'Add child next to element'
);

export const updateBlock = blocksDomain.createEvent<Block>('Update block');

export interface DeleteBlock {
    parent: Block;
    target: Block;
}
export const deleteBlock = blocksDomain.createEvent<DeleteBlock>(
    'Remove block'
);

export interface ConvertBlock {
    target: Block;
    type: Block['type'];
    options?: Partial<Block>;
}
export const convertBlock = blocksDomain.createEvent<ConvertBlock>(
    'Convert block'
);
