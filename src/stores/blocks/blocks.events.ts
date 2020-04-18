import { blocksDomain } from './blocks.domain';
import { Block } from './blocks.model';

export interface AddChildToEnd {
    parent: Block;
    child: Block;
}
export const addChildToEnd = blocksDomain.createEvent<AddChildToEnd>(
    'Add child to the end'
);
export interface AddChildNextTo {
    parent: Block;
    child: Block;
    neighbour: Block;
}
export const addChildNextTo = blocksDomain.createEvent<AddChildNextTo>(
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
