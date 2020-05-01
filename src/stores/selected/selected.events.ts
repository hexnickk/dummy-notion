import { selectedDomain } from './selected.domain';

export interface SetSelected {
    targets: readonly Element[];
}
export const setSelected = selectedDomain.createEvent<SetSelected>(
    'Set selected nodes'
);
