import { Block, Blocks, PageBlock, RootBlock } from './blocks.model';
import { fetchBlocksFx } from './blocks.effects';
import {
    addChildNextTo,
    addChildToEnd,
    deleteBlock,
    updateBlock,
} from './blocks.events';
import { blocksDomain } from './blocks.domain';
import { nanoid } from 'nanoid';

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

type BlocksState = Blocks;

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
    .on(addChildToEnd, (state, { parent, child }) => {
        return [...state, child].map((block) =>
            block.id === parent.id
                ? {
                      ...parent,
                      children: [...parent.children, child.id],
                  }
                : block
        );
    })
    .on(addChildNextTo, (state, { parent, child, neighbour }) => {
        return [...state, child].map((block) =>
            block.id === parent.id
                ? {
                      ...parent,
                      children: parent.children.reduce(
                          (acc, cur) =>
                              cur === neighbour.id
                                  ? [...acc, cur, child.id]
                                  : [...acc, cur],
                          []
                      ),
                  }
                : block
        );
    })
    .on(updateBlock, (state, payload) => {
        return state.map((item) => (item.id === payload.id ? payload : item));
    })
    .on(deleteBlock, (state, { parent, target }) => {
        return state
            .filter((item) => item.id !== target.id)
            .map((item) =>
                item.id === parent.id
                    ? {
                          ...parent,
                          children: parent.children.filter(
                              (child) => child !== target.id
                          ),
                      }
                    : item
            );
    });
