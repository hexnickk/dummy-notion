import React from 'react';
import ReactDOM from 'react-dom';
// Global styles first
import './styles.scss';
import { App } from './app.component';
import { initBlocks } from '~src/stores/blocks';
import { initSelection } from '~src/stores/selection/selection.init';

initBlocks();
initSelection();
ReactDOM.render(<App></App>, document.getElementById('root'));
