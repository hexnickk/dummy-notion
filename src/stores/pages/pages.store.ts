import { pagesDomain } from './pages.domain';
import { Page, Pages } from './pages.model';
import { fetchPagesFx } from './pages.effects';
import { addPage } from './pages.events';
import { nanoid } from 'nanoid';

const initialState: Pages = [
    {
        id: 'default-page',
        title: 'Page',
    },
];
export const $pageStore = pagesDomain.createStore<Pages>(initialState, {
    name: 'Pages store',
});
export const $pageByIdStore = (id: Page['id']) =>
    $pageStore.map((state) => state.find((page) => page.id === id));

// TODO: add some logging

// effects
$pageStore.on(fetchPagesFx.doneData, (state, payload) => payload ?? state);

// events
$pageStore.on(addPage, (state, _payload) => [
    ...state,
    {
        id: nanoid(),
        title: 'New page',
    },
]);
