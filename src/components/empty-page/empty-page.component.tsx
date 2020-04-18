import React, { MouseEventHandler } from 'react';
import './empty-page.component.scss';

interface EmptyPageComponentProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
}
export function EmptyPageComponent({ onClick }: EmptyPageComponentProps) {
    return (
        <div className="empty-page" onClick={onClick}>
            Nothing is here, just click me
        </div>
    );
}
