import { fetchTodos, saveTodos } from './todos.effects';
import { todosStore } from './todos.store';
import { mapTodos } from './todos.utils';

export const initTodos = () => {
    fetchTodos().then(() => {
        todosStore.watch((todos) => saveTodos(mapTodos(todos)));
    });
};
