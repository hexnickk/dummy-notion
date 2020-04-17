import { todosDomain } from './todos.domain';
import { Todo } from './todos.model';

export type AddTodoModel = Pick<Todo, 'listId'>;
export const addTodo = todosDomain.createEvent<AddTodoModel>('Add todo');
export const updateTodo = todosDomain.createEvent<Todo>('Update todo');
export const deleteTodo = todosDomain.createEvent<Todo>('Remove todo');
