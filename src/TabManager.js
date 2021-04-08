import React from 'react';
import AllTabsListing from './AllTabsListing';
import WindowTabsListing from './WindowTabsListing';
import WindowTabsListingFilter from './WindowTabsListingFilter';
import {onError, b, n} from './Utils';


class TabManager extends React.Component {
    constructor(props) {
        super(props);
        
        this.storedFilterObject = {term: ''};
        this.allTabs = props.windowTabs;
        this.state = {windowTabs: props.windowTabs};

        this.viewUpdated = false;

        this.onTabAction = this.onTabAction.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
        this.updateView = this.updateView.bind(this);
    }

    render() {
        console.log('Rendering AllTabsListing');

        if (this.viewUpdated) {
            // @TODO: simplify this logic of setting allTabs;
            this.viewUpdated = false;
            this.allTabs = this.state.windowTabs;
        }

        let windowTabsList = [];
        let windowIndex = 1;
        for (let [windowId, windowTab] of this.state.windowTabs) {
            windowTabsList.push(<WindowTabsListing key={windowId} windowId={windowId} windowIndex={windowIndex++} tabs={windowTab} onTabAction={this.onTabAction}/>);
        }

        return (
            <div id="all-tabs-container">
                <div id="all-tabs-listing-search">
                    <WindowTabsListingFilter filterHandler={this.filterHandler}/>
                </div>
                <div id="all-tabs-listing">
                    {windowTabsList}
                </div>
            </div>
        );
    }
}

export default AllTabsListing;