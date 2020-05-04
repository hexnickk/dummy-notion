import { Block } from '~src/stores/blocks';
import { focusedDomain } from './focused.domain';

export interface SetFocus {
    target: Block;
}
export const setFocus = focusedDomain.createEvent<SetFocus>(
    'Set focus on block'
);

export interface FocusNext {
    source: Block;
}
export const focusNext = focusedDomain.createEvent<FocusNext>(
    'Focus next block'
);

export interface FocusPrevious {
    source: Block;
}
export const focusPrevious = focusedDomain.createEvent<FocusPrevious>(
    'Focus previous block'
);

export const resetFocus = focusedDomain.createEvent('Reset focus');
