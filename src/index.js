import React from 'react';
import ReactDOM from 'react-dom';
import AllTabsListing from './AllTabsListing';
import jsonTabsListText from './jsontabslist';

function onError(error) {console.log(`Error: ${error}`);}

function createTabsList(tabs) {
    tabs.sort((a, b) => a.windowId > b.windowId ? true : a.windowId < b.windowId ? false : a.index > b.index);

    return tabs.reduce(function (accumulator, currentTab) {
        if (!accumulator.has(currentTab.windowId)) accumulator.set(currentTab.windowId, new Array(currentTab)); 
        else accumulator.get(currentTab.windowId).push(currentTab);
        return accumulator;
    }, new Map());
}

document.addEventListener('DOMContentLoaded', function() {
    try {
        // eslint-disable-next-line no-undef
        let b = browser;
        let queryAllTabs = b.tabs.query({});
        queryAllTabs.then(tabs => {
            let allWindowTabs = createTabsList(tabs);
            console.log('Start Rendering');
            ReactDOM.render(<AllTabsListing windowTabs={allWindowTabs} />, document.getElementById('all-tabs'));
        }, onError);
    } catch {
        let allWindowTabs = new Map(JSON.parse(jsonTabsListText));
        console.log('Start Rendering');
        ReactDOM.render(<AllTabsListing windowTabs={allWindowTabs} />, document.getElementById('all-tabs'));
    }
});