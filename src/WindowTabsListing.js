import React from 'react';
import Tab from './Tab';

class WindowTabsListing extends React.Component {
    render() {
        console.log('Render WindowTabsListing: ' + this.props.windowIndex);

        let tabRows = this.props.tabs.map(tab => 
            <Tab
                key={tab.id}

                onTabAction={this.props.onTabAction}

                id={tab.id}  
                index={tab.index}
                windowId={tab.windowId}
                status={tab.status}
                title={tab.title}
                url={tab.url}
                favIconUrl={tab.favIconUrl}  // unsupported in Firefox for Android
                height={tab.height}
                width={tab.width}
                // cookieStoreId={tab.cookieStoreId} // Unsupported in Chrome, Firefox for Android
                pinned={tab.pinned}
                incognito={tab.incognito}
                hidden={tab.hidden}
                active={tab.active}
                attention={tab.attention}
                highlighted={tab.highlighted}
                discarded={tab.discarded}
                audible={tab.audible}
                mutedInfo={tab.mutedInfo}
                // isArticle={tab.isArticle} // Unsupported in Chrome, Firefox for Android
                // isInReaderMode={tab.isInReaderMode} // Unsupported in Chrome, Firefox for Android
                lastAccessed={tab.lastAccessed} // Unsupported in Chrome
                openerTabId={tab.openerTabId} // Unsupported in Firefox for Android
                successorId={tab.successorId} // Unsupported in Firefox for Android
            />
        );

        return (
            <div className="window-container">
                <div className="d-flex flex-row justify-content-start align-items-center p-2 window-title-container bg-light">
                    <h4 className="m-0 p-0 window-title" title="Go to Window">{'Window - ' + this.props.windowIndex}</h4>
                </div>
                <div className="list-group window-tabs-container">
                    {tabRows}
                </div>
            </div>
        );
    }
}

export default WindowTabsListing;