import { Block, BlocksState, PageBlock, RootBlock } from './blocks.model';
import { fetchBlocksFx } from './blocks.effects';
import {
    insertBlock,
    pushBlock,
    convertBlock,
    deleteBlock,
    updateBlock,
} from './blocks.events';
import { blocksDomain } from './blocks.domain';
import { nanoid } from 'nanoid';
import {
    _pushBlock,
    _convertBlockTo,
    _deleteBlock,
    _updateStateBlock,
    _insertBlock,
} from './blocks.utils';

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
    children: [firstPage.id],
    createdAt: new Date(),
    updatedAt: new Date(),
};

const initialState: BlocksState = [rootBlock, firstPage];
export const $blocksStore = blocksDomain.createStore<BlocksState>([], {
    name: 'Blocks store',
});

// Selectors
export const $rootBlockStore = $blocksStore.map((state) =>
    state.find((block) => block.type === 'root')
);

export const childrenBlocksStore = <T extends Block = Block>(parent: Block) =>
    $blocksStore.map((state) => {
        return parent.children.map(
            (child) => state.find((block) => block.id === child) as T
        );
    });

export const findBlockStore = <T extends Block = Block>(
    predicate: (block: Block) => boolean
) => $blocksStore.map<T>((state) => state.find(predicate) as T);

// TODO: add some logging

// Effects
$blocksStore.on(
    fetchBlocksFx.doneData,
    (state, payload) => payload ?? initialState
);

// Events
$blocksStore
    .on(pushBlock, (state, { parent, target }) => {
        return _pushBlock({ state, parent, target });
    })
    .on(insertBlock, (state, { parent, target, position }) => {
        return _insertBlock({
            state,
            parent,
            target,
            position,
        });
    })
    .on(updateBlock, (state, payload) => {
        return _updateStateBlock(state, payload);
    })
    .on(deleteBlock, (state, { parent, target }) => {
        return _deleteBlock({ state, parent, target });
    })
    .on(convertBlock, (state, { parent, target, type }) => {
        return _convertBlockTo({
            state,
            parent,
            target,
            type,
        });
    });
