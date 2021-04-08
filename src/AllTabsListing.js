import React from 'react';
import WindowTabsListing from './WindowTabsListing';
import WindowTabsListingFilter from './WindowTabsListingFilter';
import {onError, b, n} from './Utils';

function createTabsList(tabs) {
    console.log('createTabsList');
    tabs.sort((a, b) => a.windowId > b.windowId ? true : a.windowId < b.windowId ? false : a.index > b.index);

    return tabs.reduce(function (accumulator, currentTab) {
        if (!accumulator.has(currentTab.windowId)) accumulator.set(currentTab.windowId, new Array(currentTab)); 
        else accumulator.get(currentTab.windowId).push(currentTab);
        return accumulator;
    }, new Map());
}

class AllTabsListing extends React.Component {
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

    updateView() {
        console.log('updateView called');
        this.viewUpdated = true;

        // @TODO: Filter the search terms in the results.
        b.tabs.query({})
            .then((tabs) => this.setState({windowTabs: createTabsList(tabs)}), onError);
    }

    filterHandler(filterObject) {
        // @TODO: Fixed width of the popup html page so that filter results do not decide its width.

        let filteredResults = new Map();

        this.storedFilterObject = filterObject;

        this.allTabs.forEach(function(windowTabs, windowId, allTabsMap){
            let tempWindowResults = windowTabs.filter(tab => tab.title.toLocaleLowerCase().includes(filterObject.term) || tab.url.toLocaleLowerCase().includes(filterObject.term));
            if (tempWindowResults.length > 0) filteredResults.set(windowId, tempWindowResults);
        });

        this.setState({windowTabs: filteredResults});
    }

    onTabAction(action, tabId, windowId, tab) {
        switch(action) {
            case 'TabGotoActionElement': 
                console.log('Destination: windowId(' + windowId + '), tabId(' + tabId + ')');
                break;
            case 'TabCopyUrlActionElement': 
                console.log('Copied: windowId(' + windowId + '), tabId(' + tabId + ')');
                break;
            case 'TabReloadActionElement': 
                console.log('TabReloadActionElement: windowId(' + windowId + '), tabId(' + tabId + ')');
                this.updateView();
                break;
            case 'TabBookmarkActionElement': 
                console.log('TabBookmarkActionElement: windowId(' + windowId + '), tabId(' + tabId + ')');
                break;
            case 'TabScreenshotActionElement': 
                console.log('TabScreenshotActionElement: windowId(' + windowId + '), tabId(' + tabId + ')');
                break;
            case 'TabMuteActionElement': 
                console.log('TabMuteActionElement: windowId(' + windowId + '), tabId(' + tabId + ')');
                this.updateView();
                break;
            case 'TabCloseActionElement': 
                console.log('TabCloseActionElement: windowId(' + windowId + '), tabId(' + tabId + ')');
                this.updateView();
                break;
            default: 
                console.log('Default: windowId(' + windowId + '), tabId(' + tabId + ')');
                break;
        }
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