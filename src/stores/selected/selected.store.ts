import { SelectedState } from './selected.model';
import { selectedDomain } from './selected.domain';
import { setSelected } from './selected.events';

const initialState: SelectedState = [];
export const $selectedStore = selectedDomain.createStore<SelectedState>(
    initialState,
    {
        name: 'Selected store',
    }
);

export const isSelected = (node: Element) => (state: SelectedState) =>
    state.indexOf(node) !== -1;

$selectedStore.on(setSelected, (_state, { targets }) => targets);
