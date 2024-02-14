<template>
  <div class="container w-[1000px]">
    <h1 class="title text-center">ChatGPT Search History</h1>

    <div class="flex flex-col p-2 py-6 m-h-screen">

      <!-- Search Bar -->
      <div class="bg-white items-center justify-between w-full flex rounded-full shadow-lg p-2 mb-5 sticky" style="top: 5px">
        <input class="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" type="text" placeholder="Search" v-model="searchQuery">

        <div @click="searchHistory" class="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
          <svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <!-- Dropdown for Search History -->
      <div class="flex flex-col gap-4 lg:p-4 p-2 rounded-lg m-2">
        <div class="lg:text-2xl md:text-xl text-lg lg:p-3 p-1 font-black text-gray-700">Select a Previous Search</div>
        <div v-for="result in historyResults" :key="result.id" class="flex items-center justify-between w-full p-2 lg:rounded-full md:rounded-full hover:bg-gray-100 cursor-pointer border-2 rounded-lg">
          <div class="flex flex-col">
            <div class="text-sm leading-3 text-gray-700 font-bold w-full">{{ result.title }}</div>
            <div class="text-xs text-gray-600 w-full">{{ result.subtitle }}</div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      state: {
        quote: "Tailwind test",
        author: "Me",
        searchQuery: '',
        historyResults: [],
      },
    };
  },
  methods: {
    searchHistory() {
      if (chrome.tabs) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { action: "searchHistory", query: this.searchQuery }, (response) => {
            if (response && response.results) {
              this.historyResults = response.results;

              console.log("search results", this.historyResults)
            } else {
              // Handle the case where there is no data
              console.error('No results received or response is undefined');
            }
          });
        });
      }
    }
  },
  created() {
    this.state.quote = "Tailwind test" // Extract the quote from the response
    this.state.author = "ME"     
  },
};
</script>