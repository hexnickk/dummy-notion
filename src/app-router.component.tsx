import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ErrorBoundary from './components/error-boundaries';

const TodosPage = React.lazy(() => import('./components/list-page'));
const ErrorPage = React.lazy(() => import('./components/error-page'));
const NotFoundPage = React.lazy(() => import('./components/not-found-page'));

const Loading = () => <div>Loading...</div>;

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <ErrorBoundary>
                    <Suspense fallback={<Loading></Loading>}>
                        <TodosPage></TodosPage>
                    </Suspense>
                </ErrorBoundary>
            </Route>
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
        </Switch>
    </BrowserRouter>
);
