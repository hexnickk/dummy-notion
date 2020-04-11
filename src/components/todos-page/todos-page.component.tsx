import React from 'react';
import { useStore } from 'effector-react';
import { todosStore } from '~src/stores/todos';
import { TodosListComponent } from './todos-list.component';

// const NewTodoForm = () => {
//     return (
//         <div>
//             <input></input>
//             <button></button>
//         </div>
//     );
// };

const TodosPage = () => {
    const todos = useStore(todosStore);
    return (
        <div>
            <TodosListComponent todos={todos}></TodosListComponent>
        </div>
    );
};
export default TodosPage;
