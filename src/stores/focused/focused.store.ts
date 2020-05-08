import { FocusedState } from './focused.model';
import { focusedDomain } from './focused.domain';
import {
    focusNext,
    focusPrevious,
    resetFocus,
    setFocus,
} from './focused.events';
import { Block, findBlockStore } from '~src/stores/blocks';

const initialState: FocusedState = null;
export const $focusedStore = focusedDomain.createStore<FocusedState>(
    initialState,
    {
        name: 'Focused store',
    }
);

export const isFocused = (block: Block) =>
    $focusedStore.map((state) => state?.id === block?.id);

const min = (a, b) => (a < b ? a : b);

$focusedStore
    .on(setFocus, (_state, { target }) => target)
    .on(focusNext, (state, { source }) => {
        const parent = findBlockStore(
            (block) =>
                block.children.find((child) => child.id === source.id) !==
                undefined
        ).getState();
        const sourceIndex = parent.children.findIndex(
            (child) => child.id === source.id
        );
        return parent.children[min(sourceIndex + 1, parent.children.length)];
    })
    .on(focusPrevious, (state, { source }) => {
        const parent = findBlockStore(
            (block) =>
                block.children.find((child) => child.id === source.id) !==
                undefined
        ).getState();
        const sourceIndex = parent.children.findIndex(
            (child) => child.id === source.id
        );
        const targetIndex = sourceIndex - 1;
        return targetIndex < 0 ? parent : parent.children[targetIndex];
    })
    .on(resetFocus, () => {
        $focusedStore.reset();
    });
