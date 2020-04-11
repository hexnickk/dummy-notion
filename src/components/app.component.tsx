import React, { Suspense } from 'react'
import './app.component.scss';
import { ErrorBoundary } from "./error-boundaries/error-boundaries.component";
const Hello = React.lazy(() => import ('./hello'))

export function App(props) {
    return <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
            <Hello></Hello>
        </Suspense>
    </ErrorBoundary>;
}
