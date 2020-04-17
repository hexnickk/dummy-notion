import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ErrorBoundary from './components/error-boundaries';
import { AppSider } from '~src/components/sider';
import { Layout } from 'antd';
import { useStore } from 'effector-react';
import { $rootBlockStore, childrenBlocksStore, PageBlock } from '~src/stores/blocks';

const { Content } = Layout;

const PagePage = React.lazy(() => import('./pages/page-page'));
const ErrorPage = React.lazy(() => import('./pages/error-page'));
const NotFoundPage = React.lazy(() => import('./pages/not-found-page'));

const Loading = () => <div>Loading...</div>;

export default function AppRouter() {
    const root = useStore($rootBlockStore);
    const rootPages = useStore(
        childrenBlocksStore<PageBlock>(root)
    );

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
                <Layout className="app">
                    <AppSider
                        className="app__sider"
                        pages={rootPages}
                    ></AppSider>
                    <Content className="app__content">
                        <Switch>
                            <Route exact path="/:blockPageId">
                                <ErrorBoundary>
                                    <Suspense fallback={<Loading></Loading>}>
                                        <PagePage></PagePage>
                                    </Suspense>
                                </ErrorBoundary>
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Route>
        </Switch>
    );
}
