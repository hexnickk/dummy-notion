import { Page } from '~src/stores/pages';

export interface TodoDTO {
    id: string;
    listId: Page['id'];
    title: string;
    checked: boolean;
    description?: string;
    createdAt: number;
    updatedAt: number;
}

export type TodosDTO = TodoDTO[];

export interface Todo {
    id: string;
    listId: Page['id'];
    title: string;
    checked: boolean;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Todos = Todo[];
