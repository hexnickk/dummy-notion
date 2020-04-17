import React from 'react';
import { useStore } from 'effector-react';
import {
    addTodo,
    updateTodo,
    deleteTodo,
    todosByListIdStore,
} from '~src/stores/todos';
import { TodosListComponent } from './todos-list.component';
import { Form, Input, Button } from 'antd';
import './list-page.component.scss';
import { $pageByIdStore, Page } from '~src/stores/pages';
import { useParams } from 'react-router-dom';

interface TodoFormProps {
    listId: Page['id'];
}
const TodoForm = ({ listId }: TodoFormProps) => {
    const [form] = Form.useForm();
    const initialValues = {
        title: '',
    };

    const finishHandler = (values) => {
        console.log(values);
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

export default function ListPage() {
    const { listId } = useParams();
    const list = useStore($pageByIdStore(listId));
    const todos = useStore(todosByListIdStore(listId));

    return (
        <div className="todos-page">
            <h1>{list.title}</h1>
            <TodoForm listId={listId}></TodoForm>
            <TodosListComponent
                todos={todos}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
            ></TodosListComponent>
        </div>
    );
}
