import { Block, BlocksState, PageBlock, RootBlock } from './blocks.model';
import { fetchBlocksFx } from './blocks.effects';
import {
    insertChild,
    pushChild,
    convertBlock,
    deleteBlock,
    updateBlock,
    attachToNeighbour,
    insertNextNeighbour,
} from './blocks.events';
import { blocksDomain } from './blocks.domain';
import { nanoid } from 'nanoid';
import {
    _pushChild,
    _convertBlockTo,
    _deleteBlock,
    _insertBlock,
    _pathToPage,
    _findBlock,
    _updateBlock,
    _attachToNeighbour,
    _insertNextNeighbour,
} from './utils';

const firstPage: PageBlock = {
    id: nanoid(),
    type: 'page',
    title: 'First page!',
    children: [],
    createdAt: new Date(),
    updatedAt: new Date(),
};

const rootBlock: RootBlock = {
    id: nanoid(),
    type: 'root',
    children: [firstPage],
    createdAt: new Date(),
    updatedAt: new Date(),
};

const initialState: BlocksState = rootBlock;
export const $blocksStore = blocksDomain.createStore<BlocksState>(
    initialState,
    {
        name: 'Blocks store',
    }
);

// Selectors
export const $rootBlockStore = $blocksStore.map((state) => state);

export const findBlockStore = <T extends Block = Block>(
    predicate: (block: Block) => boolean
) => $blocksStore.map<T>((state) => _findBlock(state, predicate) as T);

export const pathToPageStore = (page: PageBlock) =>
    $blocksStore.map((state) => _pathToPage(state, page));

// TODO: add some logging

// Effects
$blocksStore.on(fetchBlocksFx.doneData, (state, payload) => {
    return payload ?? state;
});

// Events
$blocksStore
    .on(pushChild, (state, { parent, child }) => {
        return _pushChild(state, parent, child);
    })
    .on(updateBlock, (state, { target }) => {
        return _updateBlock(state, target);
    })
    .on(deleteBlock, (state, { target }) => {
        return _deleteBlock(state, target);
    })
    .on(insertChild, (state, { target, position, parent }) => {
        return _insertBlock(state, parent, target, position);
    })
    .on(convertBlock, (state, { target, type, options }) => {
        return target.type === type
            ? state
            : _convertBlockTo(state, target, type, options);
    })
    .on(attachToNeighbour, (state, { target }) => {
        return _attachToNeighbour(state, target);
    })
    .on(insertNextNeighbour, (state, { source, target }) => {
        return _insertNextNeighbour(state, source, target);
    });
