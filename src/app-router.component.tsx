import React, {Suspense} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import ErrorBoundary from "./components/error-boundaries";

const Hello = React.lazy(() => import('./components/hello'))
const ErrorPage = React.lazy(() => import('./components/error-page'));
const NotFoundPage = React.lazy(() => import('./components/not-found-page'));

const Loading = (props) => <div>Loading...</div>

export default (props) => <BrowserRouter>
    <Switch>
        <Route exact path="/">
            <ErrorBoundary>
                <Suspense fallback={<Loading></Loading>}>
                    <Hello></Hello>
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
