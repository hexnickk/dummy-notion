import { List } from '~src/stores/lists/lists.model';

export interface TodoDTO {
    id: string;
    listId: List['id'];
    title: string;
    checked: boolean;
    description?: string;
    createdAt: number;
    updatedAt: number;
}

export type TodosDTO = TodoDTO[];

export interface Todo {
    id: string;
    listId: List['id'];
    title: string;
    checked: boolean;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Todos = Todo[];
