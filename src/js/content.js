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
