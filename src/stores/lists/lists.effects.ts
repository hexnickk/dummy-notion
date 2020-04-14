import { listsDomain } from './lists.domain';
import { Lists } from './lists.model';
import { mapLists, mapListsDTO } from './lists.utils';

const config = {
    listsStorageKey: 'lists',
};

export const fetchLists = listsDomain.createEffect<void, Lists>({
    name: 'fetchLists',
    handler: () => {
        const data = localStorage.getItem(config.listsStorageKey);
        return data ? mapListsDTO(JSON.parse(data)) : undefined;
    },
});

export const saveLists = listsDomain.createEffect<Lists, void>({
    name: 'saveLists',
    handler: (params) =>
        localStorage.setItem(
            config.listsStorageKey,
            JSON.stringify(mapLists(params))
        ),
});
