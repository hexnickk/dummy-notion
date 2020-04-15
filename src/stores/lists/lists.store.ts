import { listsDomain } from './lists.domain';
import { List, Lists } from './lists.model';
import { fetchLists } from './lists.effects';

const initialState: Lists = [
    {
        id: 'default-todo',
        title: 'Todos',
    },
];
export const listsStore = listsDomain.createStore<Lists>(initialState);
export const listByIdStore = (id: List['id']) =>
    listsStore.map((state) => state.find((list) => list.id === id));

listsStore.on(fetchLists.doneData, (state, payload) => payload ?? state);
