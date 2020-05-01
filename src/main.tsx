import React from 'react';
import ReactDOM from 'react-dom';
// Global styles first
import './styles.scss';
import { App } from './app.component';
import { initBlocks } from '~src/stores/blocks';
import { initSelected } from '~src/stores/selected';

initBlocks();
initSelected();
ReactDOM.render(<App></App>, document.getElementById('root'));
