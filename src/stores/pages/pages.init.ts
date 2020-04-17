import { fetchPagesFx, savePagesFx } from './pages.effects';
import { $pageStore } from './pages.store';

export const initPages = () => {
    fetchPagesFx().then(() => {
        $pageStore.watch(savePagesFx);
    });
};
