import React, { MouseEventHandler } from 'react';
import './empty-page.component.scss';

interface EmptySpaceComponentProps {
    onClick: MouseEventHandler<HTMLDivElement>;
}
export default function EmptySpaceComponent({
    onClick,
}: EmptySpaceComponentProps) {
    return <div className="empty-page" onClick={onClick}>Nothing is here, just click me</div>;
}
