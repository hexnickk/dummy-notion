import React, { useState } from 'react';
import { useStore } from 'effector-react';
import { addTodo, todosStore } from '~src/stores/todos';
import { TodosListComponent } from './todos-list.component';

const TodoForm = () => {
    const [title, setTitle] = useState('');
    const onSubmit = (event: Event) => {
        event.preventDefault();
        addTodo({
            title,
        })
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                placeholder="What todo?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            ></input>
            <button type="submit">Add Todo!</button>
        </form>
    );
};

const TodosPage = () => {
    const todos = useStore(todosStore);
    return (
        <div>
            <TodoForm></TodoForm>
            <TodosListComponent todos={todos}></TodosListComponent>
        </div>
    );
};
export default TodosPage;
