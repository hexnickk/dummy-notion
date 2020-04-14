import React, { useState } from 'react';
import { useStore } from 'effector-react';
import { addTodo, updateTodo, todosStore, deleteTodo } from '~src/stores/todos';
import { TodosListComponent } from './todos-list.component';
import { Form, Input, Button } from 'antd';
import './list-page.component.scss';
import { listsStore } from '~src/stores/lists/lists.store';

const TodoForm = () => {
    const [form] = Form.useForm();
    const [title] = useState('');
    form.setFieldsValue({
        title,
    });

    const finishHandler = (form) => {
        addTodo(form);
        form.resetFields();
    };

    return (
        <Form form={form} onFinish={finishHandler}>
            <Form.Item name="title">
                <Input />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit">Add Todo!</Button>
            </Form.Item>
        </Form>
    );
};

export default function ListPage() {
    const lists = useStore(listsStore);
    const todos = useStore(todosStore);

    return (
        <div className="todos-page">
            <h1>{lists[0]?.title}</h1>
            <TodoForm></TodoForm>
            <TodosListComponent
                todos={todos}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
            ></TodosListComponent>
        </div>
    );
}
