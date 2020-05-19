import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ErrorBoundary from './components/error-boundaries';
import { AppSider } from '~src/components/sider';
import { useStore } from 'effector-react';
import { $rootBlockStore, PageBlock } from '~src/stores/blocks';
import { PageBlockComponent } from './components/page-block';

const ErrorPage = React.lazy(() => import('./pages/error-page'));
const NotFoundPage = React.lazy(() => import('./pages/not-found-page'));

const Loading = () => <div>Loading...</div>;

export default function AppRouter() {
    const root = useStore($rootBlockStore);
    const rootPages = root.children as PageBlock[];

    return (
        <Switch>
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
            <Redirect from="/" exact={true} to={rootPages[0]?.id}></Redirect>
            <Route>
                {/*TODO: move to lazy loaded Home component*/}
                <div className="app">
                    <AppSider
                        className="app__sider"
                        pages={rootPages}
                    ></AppSider>
                    <div className="app__content">
                        <ErrorBoundary>
                            <Switch>
                                <Route exact path="/:blockPageId">
                                    <PageBlockComponent></PageBlockComponent>
                                </Route>
                            </Switch>
                        </ErrorBoundary>
                    </div>
                </div>
            </Route>
        </Switch>
    );
}
