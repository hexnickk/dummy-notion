import { Blocks } from './blocks.model';
import { fetchBlocksFx } from './blocks.effects';
import { addBlock, deleteBlock, updateBlock } from './blocks.events';
import { blocksDomain } from './blocks.domain';
import { nanoid } from 'nanoid';
import { Page } from '~src/stores/pages';

const initialState: Blocks = [
    {
        id: nanoid(),
        pageId: 'default-page',
        checked: true,
        title: 'Open this app!',
        description: 'You are awesome!',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: nanoid(),
        pageId: 'default-page',
        checked: false,
        title: 'Note something!',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: nanoid(),
        pageId: 'default-page',
        checked: false,
        title: 'Share it with friends!',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

type BlocksState = Blocks;
export const $blocksStore = blocksDomain.createStore<BlocksState>([], {
    name: 'Blocks store',
});

// Selectors
export const blockByListIdStore = (listId: Page['id']) =>
    $blocksStore.map((state) =>
        state.filter((block) => block.pageId === listId)
    );

// TODO: add some logging

// Effects
$blocksStore.on(
    fetchBlocksFx.doneData,
    (state, payload) => payload ?? initialState
);

// Events
$blocksStore
    .on(addBlock, (state, payload) => {
        const block = {
            id: nanoid(),
            title: 'New item',
            pageId: payload.pageId,
            checked: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return [...state, block];
    })
    .on(updateBlock, (state, payload) => {
        return state.map((item) => (item.id === payload.id ? payload : item));
    })
    .on(deleteBlock, (state, payload) => {
        return state.filter((item) => item.id !== payload.id);
    });
