import { fetchBlocksFx, saveBlocksFx } from './blocks.effects';
import { $blocksStore } from './blocks.store';

export const initBlocks = () => {
    fetchBlocksFx().then(() => {
        $blocksStore.watch((payload) => saveBlocksFx(payload));
    });
};
