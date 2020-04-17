import { blocksDomain } from './blocks.domain';
import { Blocks } from './blocks.model';
import { mapBlocks, mapBlocksDTO } from './blocks.utils';

const config = {
    blocksStorageKey: 'blocks',
};

export const fetchBlocksFx = blocksDomain.createEffect<void, Blocks>({
    name: 'Fetch blocks',
    handler: (_) => {
        const data = localStorage.getItem(config.blocksStorageKey);
        return data ? mapBlocksDTO(JSON.parse(data)) : undefined;
    },
});

export const saveBlocksFx = blocksDomain.createEffect<Blocks, void>({
    name: 'Save blocks',
    handler: (params) =>
        localStorage.setItem(
            config.blocksStorageKey,
            JSON.stringify(mapBlocks(params))
        ),
});
