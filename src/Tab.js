import React from 'react';
import {TabGotoActionElement, TabCopyUrlActionElement, TabReloadActionElement, TabBookmarkActionElement, TabScreenshotActionElement, TabMuteActionElement, TabCloseActionElement} from './TabActionElements.js';

class Tab extends React.Component {
    render() {
        return (
            <div className="list-group-item p-1 d-flex justify-content-between align-items-center">
                <img src={this.props.favIconUrl} className="m-1" title="Site Icon" width="16px" height="16px" alt="&nbsp;"/>
                
                <span className="flex-grow-1 mx-2 text-truncate handle">{this.props.title}</span>

                <TabGotoActionElement
                    onTabAction={this.props.onTabAction} tabId={this.props.id} windowId={this.props.windowId} tabIndex={this.props.index}/>
                <TabCopyUrlActionElement
                    onTabAction={this.props.onTabAction} tabId={this.props.id} windowId={this.props.windowId} tabUrl={this.props.url}/>
                <TabReloadActionElement
                    onTabAction={this.props.onTabAction} tabId={this.props.id} windowId={this.props.windowId}/>
                <TabBookmarkActionElement
                    onTabAction={this.props.onTabAction} tabId={this.props.id} windowId={this.props.windowId} tabTitle={this.props.title} tabUrl={this.props.url}/>
                <TabScreenshotActionElement
                    onTabAction={this.props.onTabAction} tabId={this.props.id} windowId={this.props.windowId}/>
                <TabMuteActionElement
                    onTabAction={this.props.onTabAction} tabId={this.props.id} windowId={this.props.windowId} tabMutedState={this.props.mutedInfo.muted}/>
                <TabCloseActionElement
                    onTabAction={this.props.onTabAction} tabId={this.props.id} windowId={this.props.windowId}/>
            </div>
        );
    }
}

export default Tab;