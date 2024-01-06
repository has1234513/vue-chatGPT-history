chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "searchHistory") {
    // Logic to search the chat history
    // Example: let results = searchChatHistory(request.query);
    sendResponse({ results: results });
  }
});