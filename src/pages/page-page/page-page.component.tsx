import React from 'react';
import { useStore } from 'effector-react';
import {
    addTodo,
    updateTodo,
    deleteTodo,
    todosByListIdStore,
} from '~src/stores/todos';
import { Form, Input, Button } from 'antd';
import './page-page.component.scss';
import { $pageByIdStore, Page } from '~src/stores/pages';
import { useParams } from 'react-router-dom';
import { TodoComponent } from '~src/components/checkbox-block/todo.component';

interface TodoFormProps {
    listId: Page['id'];
}
const TodoForm = ({ listId }: TodoFormProps) => {
    const [form] = Form.useForm();
    const initialValues = {
        title: '',
    };

    const finishHandler = (values) => {
        addTodo({
            listId,
            ...values,
        });
        form.resetFields();
    };

    return (
        <Form
            form={form}
            onFinish={finishHandler}
            initialValues={initialValues}
        >
            <Form.Item name="title">
                <Input />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit">Add Todo!</Button>
            </Form.Item>
        </Form>
    );
};

export default function PagePage() {
    const { listId } = useParams();
    const list = useStore($pageByIdStore(listId));
    const todos = useStore(todosByListIdStore(listId));

    const todosComponents = todos.map((todo) => (
        <TodoComponent
            key={todo.id}
            todo={todo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
        ></TodoComponent>
    ));
    return (
        <div className="todos-page">
            <h1>{list.title}</h1>
            <TodoForm listId={listId}></TodoForm>
            {todosComponents}
        </div>
    );
}
