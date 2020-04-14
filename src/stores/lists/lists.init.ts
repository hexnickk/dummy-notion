import { fetchLists, saveLists } from './lists.effects';
import { listsStore } from './lists.store';

export const initLists = () => {
    fetchLists().then(() => {
        listsStore.watch(saveLists);
    });
};
