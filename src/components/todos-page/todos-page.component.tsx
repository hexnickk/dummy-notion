import React, { useState, FormEvent } from 'react';
import { useStore } from 'effector-react';
import { addTodo, updateTodo, todosStore, deleteTodo } from '~src/stores/todos';
import { TodosListComponent } from './todos-list.component';

const TodoForm = () => {
    const [title, setTitle] = useState('');

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addTodo({
            title,
        });
        setTitle('');
    };

    return (
        <form onSubmit={submitHandler}>
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
            <TodosListComponent
                todos={todos}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
            ></TodosListComponent>
        </div>
    );
};
export default TodosPage;
