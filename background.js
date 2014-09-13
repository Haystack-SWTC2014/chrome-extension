(function () {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        console.log("a tab changed", tab.url);
    });

    chrome.tabs.onActivated.addListener(function (activeInfo) {
        chrome.tabs.get(activeInfo.tabId, function (tab) {
            console.log("a new tab activated", tab.url);
        });
    });
})();
