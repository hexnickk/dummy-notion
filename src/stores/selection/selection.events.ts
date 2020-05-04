import { selectionDomain } from './selection.domain';
import Selection from '@simonwep/selection-js';

export interface SetSelection {
    target: Selection;
}
export const setSelection = selectionDomain.createEvent<SetSelection>(
    'Set selection'
);
