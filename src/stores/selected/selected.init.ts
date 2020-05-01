import * as Selection from '@simonwep/selection-js';
import { setSelected } from './selected.events';
import { $selectedStore } from './selected.store';

const isEqSelectedArrays = (array1: readonly any[], array2: readonly any[]) =>
    array1.length !== array2.length
        ? false
        : array1.reduce(
              (acc, _, index) => array1[index] === array2[index] && acc,
              true
          );

export const initSelected = () => {
    Selection.create({
        class: 'selected',
        selectables: ['.page-page .block-selectable'],
        boundaries: ['.page-page'],
    })
        // .on('beforestart', (event) => {
        //     return false;
        // })
        .on('move', (event) => {
        const selected = $selectedStore.getState();
        if (!isEqSelectedArrays(selected, event.selected)) {
            setSelected({ targets: event.selected });
        }
    });
};
