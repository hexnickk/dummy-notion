import { pagesDomain } from './pages.domain';
import { Pages } from './pages.model';
import { mapPages, mapPagesDTO } from './pages.utils';

const config = {
    pagesStorageKey: 'pages',
};

export const fetchPagesFx = pagesDomain.createEffect<void, Pages>({
    name: 'Fetch pages',
    handler: () => {
        const data = localStorage.getItem(config.pagesStorageKey);
        return data ? mapPagesDTO(JSON.parse(data)) : undefined;
    },
});

export const savePagesFx = pagesDomain.createEffect<Pages, void>({
    name: 'Save pages',
    handler: (params) =>
        localStorage.setItem(
            config.pagesStorageKey,
            JSON.stringify(mapPages(params))
        ),
});
