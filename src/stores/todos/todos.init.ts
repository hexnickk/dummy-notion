import { fetchTodos, saveTodos } from './todos.effects';
import { todosStore } from './todos.store';

export const initTodos = () => {
    fetchTodos().then(() => {
        todosStore.watch((todos) => saveTodos(todos));
    });
};
