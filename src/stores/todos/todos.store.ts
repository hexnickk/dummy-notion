import { Todos, TodoStates } from './todos.model';
import { fetchTodos } from './todos.effects';
import { mapTodosDTO } from './todos.utils';
import { addTodo, deleteTodo, updateTodo } from './todos.events';
import { nanoid } from 'nanoid';
import { todosDomain } from '~src/stores/todos/todos.domain';

const initialState: Todos = [
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
];

type TodosState = Todos;
export const todosStore = todosDomain.createStore<TodosState>([]);

todosStore.on(fetchTodos.doneData, (state, payload) =>
    payload ? mapTodosDTO(payload) : initialState
);

todosStore
    .on(addTodo, (state, payload) => {
        const todo = {
            id: nanoid(),
            ...payload,
            state: TodoStates.UNCHECKED,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return [...state, todo];
    })
    .on(updateTodo, (state, payload) => {
        return state.map((todo) => (todo.id === payload.id ? payload : todo));
    })
    .on(deleteTodo, (state, payload) => {
        return state.filter((todo) => todo.id !== payload.id);
    });
