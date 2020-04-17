import { Todos } from './todos.model';
import { fetchTodos } from './todos.effects';
import { addTodo, deleteTodo, updateTodo } from './todos.events';
import { todosDomain } from './todos.domain';
import { nanoid } from 'nanoid';
import { Page } from '~src/stores/pages';

const initialState: Todos = [
    {
        id: nanoid(),
        listId: 'default-todo',
        checked: true,
        title: 'Open this app!',
        description: 'You are awesome!',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: nanoid(),
        listId: 'default-todo',
        checked: false,
        title: 'Create a new TODO!',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: nanoid(),
        listId: 'default-todo',
        checked: false,
        title: 'Share TODO with friends!',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

type TodosState = Todos;
export const $todosStore = todosDomain.createStore<TodosState>([], {
    name: 'Todos store',
});

// Selectors
export const todosByListIdStore = (listId: Page['id']) =>
    $todosStore.map((state) => state.filter((todo) => todo.listId === listId));

// TODO: add some logging

// Effects
$todosStore.on(
    fetchTodos.doneData,
    (state, payload) => payload ?? initialState
);

// Events
$todosStore
    .on(addTodo, (state, payload) => {
        const todo = {
            id: nanoid(),
            title: 'New item',
            listId: payload.listId,
            checked: false,
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
