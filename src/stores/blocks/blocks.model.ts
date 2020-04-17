import { Page } from '~src/stores/pages';

export interface BlockDTO {
    id: string;
    pageId: Page['id'];
    title: string;
    checked: boolean;
    description?: string;
    createdAt: number;
    updatedAt: number;
}

export type BlocksDTO = BlockDTO[];

export interface Block {
    id: string;
    pageId: Page['id'];
    title: string;
    checked: boolean;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Blocks = Block[];
