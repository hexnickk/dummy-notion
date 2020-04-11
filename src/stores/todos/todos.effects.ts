import {todosDomain} from './todos.domain'
import {TodosDTO} from "./todos.model";

const config = {
    todosStorageKey: 'todos',
}

export const fetchTodos = todosDomain.createEffect<void, TodosDTO>({
    name: 'fetchTodos',
    handler: (_ => JSON.parse(localStorage.getItem(config.todosStorageKey)))
})

export type SaveTodosModel = TodosDTO;
export const saveTodos = todosDomain.createEffect<SaveTodosModel, void>({
    name: 'saveTodos',
    handler: params => localStorage.setItem(config.todosStorageKey, JSON.stringify(params))
})
