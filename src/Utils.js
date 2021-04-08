const onError = error => console.log(`Error: ${error}`);

let b,n;

try {
    // eslint-disable-next-line no-undef
    b = browser; 
    n = navigator;
} catch {
    b = {
        tabs: {
            highlight: function() {},
            reload: function() {}
        },
        windows: {
            update: function() {}
        },
    };
    b = {
        clipboard: {
            writeText: function(text) {console.log('write: ' + text);}
        }
    }
}

export {onError, b, n}