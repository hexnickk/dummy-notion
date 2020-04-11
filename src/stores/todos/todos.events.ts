import { todosDomain } from './todos.domain';
import { Todo } from './todos.model';

export type AddTodoModel = Pick<Todo, 'title' | 'description'>;
export const addTodo = todosDomain.createEvent<AddTodoModel>('Add todo');
export const checkTodo = todosDomain.createEvent<Todo['id']>('Check todo');
export const uncheckTodo = todosDomain.createEvent<Todo['id']>('Uncheck todo');
export const deleteDTO = todosDomain.createEvent<Todo['id']>('Remove todo');
