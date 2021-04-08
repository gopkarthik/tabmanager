// Currently maintains tab count & updates badge with tab count.

// Maintaining tab count state because the tab.onRemoved event is fired too early. See
// https://bugzilla.mozilla.org/show_bug.cgi?id=1396758
// https://phabricator.services.mozilla.com/D26619
var tabCount = 0; 

function updateBadgeCount(count) {
    browser.browserAction.setBadgeBackgroundColor({'color': 'green'});
    browser.browserAction.setBadgeText({text: count.toString()});
}

function registerListeners() {
    browser.tabs.onCreated.addListener(tab => {tabCount++;updateBadgeCount(tabCount);});
    browser.tabs.onRemoved.addListener((tabId, removeInfo) => {tabCount--;updateBadgeCount(tabCount);});
}

function initialSetup() {
    var tabsQuery = browser.tabs.query({});
    tabsQuery.then(
        tabs => {
            registerListeners();
            tabCount = tabs.length
            updateBadgeCount(tabs.length)
        }, 
        error => console.log(`Error: $(error)`)
    );
}

initialSetup();