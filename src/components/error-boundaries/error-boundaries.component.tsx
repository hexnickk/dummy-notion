import React from 'react';
import { Redirect } from 'react-router-dom';

export default class ErrorBoundary extends React.Component {
    state = { hasError: false };

    constructor(props) {
        super(props);
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch() {
        // You can also log the error to an error reporting service
    }

    render() {
        return this.state.hasError ? (
            <Redirect to="/500"></Redirect>
        ) : (
            this.props.children
        );
    }
}
