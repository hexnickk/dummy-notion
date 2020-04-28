import { blocksDomain } from './blocks.domain';
import { Block } from './blocks.model';

export interface PushChild {
    parent: Block;
    child: Block;
}
export const pushChild = blocksDomain.createEvent<PushChild>(
    'Push child to the block'
);

export interface UpdateBlock {
    target: Block;
}
export const updateBlock = blocksDomain.createEvent<UpdateBlock>(
    'Update block'
);

export interface InsertChild {
    parent: Block;
    target: Block;
    position: number;
}
export const insertChild = blocksDomain.createEvent<InsertChild>(
    'Insert child to the block'
);

export interface DeleteBlock {
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
