chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "searchHistory") {
    if (window.location.hostname !== "chat.openai.com") {
      sendResponse({ error: "Not on chat.openai.com" });
      return;
    }

    let results = [];
    try {
      // Query all <li> elements
      const listItems = document.querySelectorAll("ul li");
      listItems.forEach(item => {
        results.push(item.innerHTML);
      });
      sendResponse({ results: results });
    } catch (error) {
      sendResponse({ error: error.message });
    }
    return true; // keeps the message channel open
  }
});
