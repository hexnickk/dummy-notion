import { blocksDomain } from './blocks.domain';
import { Block } from './blocks.model';
import { mapBlock, mapBlockDTO } from './utils';

const config = {
    blocksStorageKey: 'blocks',
};

export const fetchBlocksFx = blocksDomain.createEffect<void, Block>({
    name: 'Fetch blocks',
    handler: (_) => {
        const data = localStorage.getItem(config.blocksStorageKey);
        return data ? mapBlockDTO(JSON.parse(data)) : undefined;
    },
});

export const saveBlocksFx = blocksDomain.createEffect<Block, void>({
    name: 'Save blocks',
    handler: (params) =>
        localStorage.setItem(
            config.blocksStorageKey,
            JSON.stringify(mapBlock(params))
        ),
});
