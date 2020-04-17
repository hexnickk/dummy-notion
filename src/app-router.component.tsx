import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ErrorBoundary from './components/error-boundaries';
import { useStore } from 'effector-react';
import { $pageStore } from '~src/stores/pages';

const PagePage = React.lazy(() => import('./pages/page-page'));
const ErrorPage = React.lazy(() => import('./pages/error-page'));
const NotFoundPage = React.lazy(() => import('./pages/not-found-page'));

const Loading = () => <div>Loading...</div>;

export default function AppRouter() {
    const lists = useStore($pageStore);
    return (
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
                        <PagePage></PagePage>
                    </Suspense>
                </ErrorBoundary>
            </Route>
        </Switch>
    );
}
