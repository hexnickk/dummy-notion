import {Todo, TodoDTO, Todos, TodosDTO} from "./todos.model";

export const mapTodo = (todo: Todo): TodoDTO => ({
    ...todo,
    createdAt: Number(todo.createdAt),
    updatedAt: Number(todo.updatedAt),
})
export const mapTodos = (todos: Todos): TodosDTO => todos.map(mapTodo);

export const mapTodoDTO = (todo: TodoDTO): Todo => ({
    ...todo,
    createdAt: new Date(todo.createdAt),
    updatedAt: new Date(todo.updatedAt),
})
export const mapTodosDTO = (todos: TodosDTO): Todos => todos.map(mapTodoDTO);
