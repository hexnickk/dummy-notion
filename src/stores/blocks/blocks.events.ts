import { blocksDomain } from './blocks.domain';
import { Block } from './blocks.model';
import {Page} from "~src/stores/pages";

interface AddNextBlock {
    pageId: Page['id'];
    position: 'next';
    relativeBlock: Block;
}
interface AddEndBlock {
    pageId: Page['id'];
    position: 'end';
}
export type AddBlockModel = AddNextBlock | AddEndBlock;
export const addBlock = blocksDomain.createEvent<AddBlockModel>('Add block');
export const updateBlock = blocksDomain.createEvent<Block>('Update block');
export const deleteBlock = blocksDomain.createEvent<Block>('Remove block');
