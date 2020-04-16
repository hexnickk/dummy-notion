import { listsDomain } from './lists.domain';
import { List, Lists } from './lists.model';
import { fetchListsfx } from './lists.effects';
import { addList } from './lists.events';
import { nanoid } from 'nanoid';

const initialState: Lists = [
    {
        id: 'default-todo',
        title: 'Todos',
    },
];
export const listsStore$ = listsDomain.createStore<Lists>(initialState);
export const listByIdStore = (id: List['id']) =>
    listsStore$.map((state) => state.find((list) => list.id === id));

// effects
listsStore$.on(fetchListsfx.doneData, (state, payload) => payload ?? state);

// events
listsStore$.on(addList, (state, _payload) => [
    ...state,
    {
        id: nanoid(),
        title: 'New list',
    },
]);
