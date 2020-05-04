import * as Selection from '@simonwep/selection-js';
import { setSelection } from './selection.events';
import { resetFocus } from '~src/stores/focused';
import { $selectedStore, setSelected } from '~src/stores/selected';

const isEqSelectedArrays = (array1: readonly any[], array2: readonly any[]) =>
    array1.length !== array2.length
        ? false
        : array1.reduce(
              (acc, _, index) => array1[index] === array2[index] && acc,
              true
          );

export const initSelection = () => {
    const selection = Selection.create({
        class: 'selection',
        selectables: ['.page-page .block-selectable'],
        boundaries: ['.page-page'],
    })
        .on('beforestart', (event) => {
            const target = event.oe.target as Element;
            return target?.tagName !== 'INPUT';
        })
        .on('start', () => {
            resetFocus();
        })
        .on('move', (event) => {
            const selected = $selectedStore.getState();
            if (!isEqSelectedArrays(selected, event.selected)) {
                setSelected({ targets: event.selected });
            }
        });
    setSelection({ target: selection });
};
