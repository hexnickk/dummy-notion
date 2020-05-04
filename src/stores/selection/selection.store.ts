import { SelectionState } from './selection.model';
import { selectionDomain } from './selection.domain';
import { setSelection } from './selection.events';

const initialState: SelectionState = null;
export const $selectionStore = selectionDomain.createStore<SelectionState>(
    initialState,
    {
        name: 'Selection store',
    }
);

$selectionStore.on(setSelection, (_state, { target }) => target);
