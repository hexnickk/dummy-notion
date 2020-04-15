import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ErrorBoundary from './components/error-boundaries';
import {useStore} from "effector-react";
import {listsStore} from "~src/stores/lists";

const TodosPage = React.lazy(() => import('./components/list-page'));
const ErrorPage = React.lazy(() => import('./components/error-page'));
const NotFoundPage = React.lazy(() => import('./components/not-found-page'));

const Loading = () => <div>Loading...</div>;

export default function AppRouter() {
    const lists = useStore(listsStore);
    return (
        <BrowserRouter>
            <Switch>
                <Redirect from="/" exact={true} to={lists[0].id}></Redirect>
                <Route path="/404">
                    <Suspense fallback={<Loading></Loading>}>
                        <NotFoundPage></NotFoundPage>
                    </Suspense>
                </Route>
                <Route path="/500">
                    <Suspense fallback={<Loading></Loading>}>
                        <ErrorPage></ErrorPage>
                    </Suspense>
                </Route>
                <Route exact path="/:listId">
                    <ErrorBoundary>
                        <Suspense fallback={<Loading></Loading>}>
                            <TodosPage></TodosPage>
                        </Suspense>
                    </ErrorBoundary>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
