import {
    Block,
    CheckboxBlock,
    HeaderBlock,
    PageBlock,
    TextBlock,
} from '~src/stores/blocks';
import { nanoid } from 'nanoid';

export const textBlockFactory = (options: Partial<Block> = {}): TextBlock => ({
    title: '',
    // We need to be able to only override ^
    ...options,
    id: nanoid(),
    type: 'text',
    children: [],
    createdAt: new Date(),
    updatedAt: new Date(),
});

export const checkboxBlockFactory = (
    options: Partial<Block> = {}
): CheckboxBlock => ({
    checked: false,
    title: '',
    // We need to be able to only override ^
    ...options,
    id: nanoid(),
    type: 'checkbox',
    children: [],
    createdAt: new Date(),
    updatedAt: new Date(),
});

export const headerBlockFactory = (
    options: Partial<Block> = {}
): HeaderBlock => ({
    size: 'h1',
    title: '',
    // We need to be able to only override ^
    ...options,
    id: nanoid(),
    type: 'header',
    children: [],
    createdAt: new Date(),
    updatedAt: new Date(),
});

export const pageBlockFactory = (options: Partial<Block> = {}): PageBlock => ({
    title: 'Untitled',
    // We need to be able to only override ^
    ...options,
    id: nanoid(),
    type: 'page',
    children: [],
    createdAt: new Date(),
    updatedAt: new Date(),
});
