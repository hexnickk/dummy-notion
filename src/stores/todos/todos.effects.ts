import { todosDomain } from './todos.domain';
import { Todos } from './todos.model';
import { mapTodos, mapTodosDTO } from '~src/stores/todos/todos.utils';

const config = {
    todosStorageKey: 'todos',
};

export const fetchTodos = todosDomain.createEffect<void, Todos>({
    name: 'fetchTodos',
    handler: (_) => {
        const data = localStorage.getItem(config.todosStorageKey);
        return data ? mapTodosDTO(JSON.parse(data)) : undefined;
    },
});

export const saveTodos = todosDomain.createEffect<Todos, void>({
    name: 'saveTodos',
    handler: (params) =>
        localStorage.setItem(
            config.todosStorageKey,
            JSON.stringify(mapTodos(params))
        ),
});
