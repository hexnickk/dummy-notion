import { Todos, TodoStates } from './todos.model';
import { fetchTodos, saveTodos } from './todos.effects';
import { mapTodos, mapTodosDTO } from './todos.utils';
import { addTodo } from './todos.events';
import { nanoid } from 'nanoid';
import { todosDomain } from '~src/stores/todos/todos.domain';

type TodosState = Todos;
export const todosStore = todosDomain.createStore<TodosState>([
    {
        id: nanoid(),
        state: TodoStates.CHECKED,
        title: 'Open this app!',
        description: 'You are awesome!',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: nanoid(),
        state: TodoStates.UNCHECKED,
        title: 'Create a new TODO!',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: nanoid(),
        state: TodoStates.UNCHECKED,
        title: 'Share TODO with friends!',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]);

todosStore.on(fetchTodos.doneData, (state, payload) => ({
    ...state,
    ...mapTodosDTO(payload),
}));

todosStore.on(addTodo, (state, payload) => {
    const todo = {
        id: nanoid(),
        ...payload,
        state: TodoStates.UNCHECKED,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    return [...state, todo];
});

todosStore.watch((state) => {
    saveTodos(mapTodos(state));
});
