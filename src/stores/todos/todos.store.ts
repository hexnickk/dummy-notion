import {Todos, TodoStates} from './todos.model';
import {fetchTodos} from './todos.effects';
import {addTodo, deleteTodo, updateTodo} from './todos.events';
import {todosDomain} from './todos.domain';
import {nanoid} from 'nanoid';
import {List} from '~src/stores/lists/lists.model';

const initialState: Todos = [
    {
        id: nanoid(),
        listId: 'default-todo',
        state: TodoStates.CHECKED,
        title: 'Open this app!',
        description: 'You are awesome!',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: nanoid(),
        listId: 'default-todo',
        state: TodoStates.UNCHECKED,
        title: 'Create a new TODO!',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: nanoid(),
        listId: 'default-todo',
        state: TodoStates.UNCHECKED,
        title: 'Share TODO with friends!',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

type TodosState = Todos;
export const todosStore = todosDomain.createStore<TodosState>([]);

// Selectors
export const todosByListIdStore = (listId: List['id']) =>
    todosStore.map((state) => state.filter((todo) => todo.listId === listId));

// Effects
todosStore.on(fetchTodos.doneData, (state, payload) => payload ?? initialState);

// Events
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
