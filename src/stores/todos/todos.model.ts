import { List } from '~src/stores/lists/lists.model';

export const enum TodoStates {
    UNCHECKED,
    CHECKED,
}

export interface TodoDTO {
    id: string;
    listId: List['id'];
    title: string;
    state: TodoStates;
    description?: string;
    createdAt: number;
    updatedAt: number;
}

export type TodosDTO = TodoDTO[];

export interface Todo {
    id: string;
    listId: List['id'];
    title: string;
    state: TodoStates;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Todos = Todo[];
