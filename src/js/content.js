chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "searchHistory") {
      // Perform asynchronous operation
      console.log("listener here")
      someAsyncFunction().then(results => {
        sendResponse({ results: results });
      });
      return true; // keeps the message channel open
    }
  });
  