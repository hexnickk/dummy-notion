import { fetchListsfx, saveListsfx } from './lists.effects';
import { listsStore$ } from './lists.store';

export const initLists = () => {
    fetchListsfx().then(() => {
        listsStore$.watch(saveListsfx);
    });
};
