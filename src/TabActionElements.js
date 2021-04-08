import React from 'react';
import {onError, b, n} from './Utils';

class ActionElement extends React.Component {

    render() {
        return (
            <button type="button"
                className={'tab-action-element ml-1 p-1 btn btn-sm ' + this.props.actionClassName} 
                title={this.props.title} 
                onClick={this.props.onClickHandler}
            >
                <i className={this.props.iconClassName}></i>
            </button>
        );
    }
}

class TabGotoActionElement extends React.Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(evt) {
        const {windowId, tabId, tabIndex} = this.props;

        evt.preventDefault();
        console.log('On click Handler: Destination TabId: ' + this.props.tabId);
        let tabHighlighting = b.tabs.highlight({
            windowId: windowId,
            populate: false,
            tabs: [tabIndex]
        });
    
        tabHighlighting.then(win => {
            let windowHighlighting = b.windows.update(windowId, {focused: true});
            windowHighlighting.then(win => {console.log('Finished hightlighting tabId:' + tabId + ' windowId:' + windowId);}, onError);
        }, onError);

        this.props.onTabAction('TabGotoActionElement', tabId, windowId, {tabIndex: tabIndex});
    }

    render() {
        return (
            <ActionElement 
                actionClassName='btn-primary'
                iconClassName='fas fa-external-link-alt'
                title='Go to Tab'
                onClickHandler={this.onClickHandler}
            />
        );
    }
}

class TabCopyUrlActionElement extends React.Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(evt) {
        const {tabId, windowId, tabUrl, onTabAction} = this.props;
        evt.preventDefault();
        console.log('On click Handler: Copied URL: ' + tabUrl);

        n.clipboard.writeText(tabUrl)
            .then(() => {
                console.log('clipboard write successful.');
                onTabAction('TabCopyUrlActionElement', tabId, windowId, {tabUrl: tabUrl});
            }, onError);
    }

    render() {
        return (
            <ActionElement 
                actionClassName='btn-light'
                iconClassName='far fa-copy'
                title='Copy Tab URL'
                onClickHandler={this.onClickHandler}
            />
        );
    }
}

class TabReloadActionElement extends React.Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(evt) {
        const {tabId, windowId, onTabAction} = this.props;
        evt.preventDefault();

        console.log('On click Handler: TabReloadActionElement: ' + this.props.tabId);

        b.tabs
            .reload(tabId, {bypassCache: true})
            .then(() => {
                console.log('Finished reload tab: ' + tabId);
                onTabAction('TabReloadActionElement', tabId, windowId, {});
            }, onError);
    }

    render() {
        return (
            <ActionElement 
                actionClassName='btn-light'
                iconClassName='fas fa-redo'
                title='Reload Tab'
                onClickHandler={this.onClickHandler}
            />
        );
    }
}

class TabBookmarkActionElement extends React.Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(evt) {
        evt.preventDefault();
        console.log('On click Handler: TabBookmarkActionElement:' );

        const {tabId, windowId, tabTitle, tabUrl, onTabAction} = this.props;

        let bookmarking = b.bookmarks.create({
            title: tabTitle,
            url: tabUrl
        });
    
        bookmarking.then(function(bookmarkNode) {
            console.log('Successfully created bookmark.');
            onTabAction('TabBookmarkActionElement', tabId, windowId, {tabUrl: tabUrl, tabTitle: tabTitle});
        }, onError);
    }

    render() {
        return (
            <ActionElement 
                actionClassName='btn-light'
                iconClassName='fas fa-bookmark'
                title='Bookmark Tab'
                onClickHandler={this.onClickHandler}
            />
        );
    }
}

class TabScreenshotActionElement extends React.Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(evt) {
        const {tabId, windowId, onTabAction} = this.props;

        evt.preventDefault();
        console.log('On click Handler: TabScreenshotActionElement');


        b.tabs.captureTab(tabId, {format: 'png'}).then(function(imageUri) {
    
            // imageUri example:
            // Image URI: data:image/png;base64,iVBORw0KGgoAAANSUhEUg...
            const imageByteString = atob(imageUri.split(',', 2)[1]);
            const imageMimeType = ((imageUri.split(',', 2)[0]).split(';', 2)[0]).split('data:', 2)[1];
    
            let imageArray = new Uint8Array(imageByteString.length);
            for (let i = 0; i < imageByteString.length; i++) {
                imageArray[i] = imageByteString.charCodeAt(i);
            }
    
            const imageBlob = new Blob([imageArray], {type: imageMimeType});
            const imageUrl = URL.createObjectURL(imageBlob);
    
            const screenshotFileName = 'TabId:' + tabId + '_Screenshot_' + (new Date().toISOString()) + '.' + imageMimeType.split('/')[1];

            // @TODO: Do this properly
            // browser.downloads.onChanged.addListener(function(d) {
            //     if (d.url === imageUrl && ()) {
            //          URL.revokeObjectURL(imageUrl);
            //     } 
            // });
            
            b.downloads
            .download({url: imageUrl, filename: screenshotFileName, conflictAction: 'uniquify'})
            .then(function(id) {
                console.log('download started: ' + id);
                onTabAction('TabScreenshotActionElement', tabId, windowId, {});
            }, function(error) {
                URL.revokeObjectURL(imageUrl); 
                console.log('Failed Download'); 
                onError(error);
            });
        }, onError);
    }

    render() {
        return (
            <ActionElement 
                actionClassName='btn-light'
                iconClassName='fas fa-camera'
                title='Screenshot Tab'
                onClickHandler={this.onClickHandler}
            />
        );
    }
}

class TabMuteActionElement extends React.Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(evt) {
        const {tabId, windowId, tabMutedState, onTabAction} = this.props;

        evt.preventDefault();
        console.log('On click Handler: TabMuteActionElement');

        b.tabs
        .update(tabId, {muted: !tabMutedState})
        .then(function(tab) {
            console.log('successfully ' + (tab.mutedInfo.muted ? 'muted' : 'unmuted') + ' tab:' + tab.id);
            onTabAction('TabMuteActionElement', tabId, windowId, {tabMutedState: tabMutedState});
        }, onError);
    }

    render() {
        return (
            <ActionElement 
                actionClassName='btn-light'
                iconClassName={this.props.tabMutedState ? 'fas fa-volume-mute' : 'fas fa-volume-up'}
                title={this.props.tabMutedState ? 'Unmute Tab' : 'Mute Tab'}
                onClickHandler={this.onClickHandler}
            />
        );
    }
}

class TabCloseActionElement extends React.Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(evt) {
        const {tabId, windowId, onTabAction} = this.props;

        evt.preventDefault();
        console.log('On click Handler: TabCloseActionElement');

        b.tabs
        .remove(tabId)
        .then(() => {
            console.log('close tab successful.');
            onTabAction('TabCloseActionElement', tabId, windowId, {});
        }, onError);
    }

    render() {
        return (
            <ActionElement 
                actionClassName='btn-danger'
                iconClassName='fas fa-times'
                title='Close Tab'
                onClickHandler={this.onClickHandler}
            />
        );
    }
}

export {
    TabGotoActionElement,
    TabCopyUrlActionElement,
    TabReloadActionElement,
    TabBookmarkActionElement,
    TabScreenshotActionElement,
    TabMuteActionElement,
    TabCloseActionElement
}