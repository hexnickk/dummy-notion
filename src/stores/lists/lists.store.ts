import { listsDomain } from './lists.domain';
import { Lists } from './lists.model';
import { fetchLists } from './lists.effects';
import { nanoid } from 'nanoid';

const initialState: Lists = [
    {
        id: nanoid(),
        title: 'Todos',
    },
];
export const listsStore = listsDomain.createStore<Lists>(initialState);

listsStore.on(fetchLists.doneData, (state, payload) => payload ?? state);
