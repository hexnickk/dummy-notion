import React from 'react';
import './sider.component.scss';
import { PageBlock } from '~src/stores/blocks';
import { AppSiderSection } from './sider-section.component';

export function AppSider({
    pages,
    className,
}: {
    pages?: PageBlock[];
    className?: string;
}) {
    return (
        <div className={`${className} sider`} data-cy="sider">
            <div className="sider__block">
                <div className="sider__workspace">👨‍💻 Workspace</div>
                <div className="sider__search">🔎 Quick find</div>
                <div className="sider__updates">🕒 All updates</div>
                <div className="sider__settings">⚙️ Settings & Members</div>
            </div>
            <AppSiderSection pages={pages}></AppSiderSection>
        </div>
    );
}
