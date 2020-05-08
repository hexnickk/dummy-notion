import {
    Block,
    CheckboxBlock,
    HeaderBlock,
    PageBlock,
    TextBlock,
} from '~src/stores/blocks';
import { nanoid } from 'nanoid';

export const textBlockFactory = (options: Partial<Block> = {}): TextBlock => ({
    id: nanoid(),
    title: '',
    // We need to be able to only override ^
    ...options,
    type: 'text',
    children: [],
    createdAt: new Date(),
    updatedAt: new Date(),
});

export const checkboxBlockFactory = (
    options: Partial<Block> = {}
): CheckboxBlock => ({
    id: nanoid(),
    title: '',
    checked: false,
    // We need to be able to only override ^
    ...options,
    type: 'checkbox',
    children: [],
    createdAt: new Date(),
    updatedAt: new Date(),
});

export const headerBlockFactory = (
    options: Partial<Block> = {}
): HeaderBlock => ({
    id: nanoid(),
    size: 'h1',
    title: '',
    // We need to be able to only override ^
    ...options,
    type: 'header',
    children: [],
    createdAt: new Date(),
    updatedAt: new Date(),
});

export const pageBlockFactory = (options: Partial<Block> = {}): PageBlock => ({
    id: nanoid(),
    title: 'Untitled',
    // We need to be able to only override ^
    ...options,
    type: 'page',
    children: [],
    createdAt: new Date(),
    updatedAt: new Date(),
});
