function checkCurrentTabDomain(callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    if (!currentTab || !currentTab.url) {
      callback(false);
      return;
    }
    const url = new URL(currentTab.url);
    const domain = url.hostname;
    console.log("domain", domain)
    const isChatOpenAIDomain = domain === "chat.openai.com";
    callback(isChatOpenAIDomain);
  });
}

// In content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkCurrentTabDomain") {
    const isOnDomain = checkCurrentTabDomain();
    sendResponse({ isOnDomain });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "searchHistory") {
    if (window.location.hostname !== "chat.openai.com") {
      sendResponse({ error: "Not on chat.openai.com" });
      return;
    }

    let results = [];
    try {
      // Query all <li> elements
      const listItems = document.querySelectorAll("li[data-projection-id]");
      console.log("l", listItems)
      listItems.forEach(item => {
        const linkElement = item.querySelector('a');
        const textDiv = item.querySelector('div');

        let link = linkElement ? linkElement.href : null;
        let text = textDiv ? textDiv.innerText : null;

        results.push({ link: link, text: text });
      });

      sendResponse({ results: results });
    } catch (error) {
      sendResponse({ error: error.message });
    }
    return true; // keeps the message channel open
  }
});
