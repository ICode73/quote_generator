"use-strict";

/*
api for quote generator:
https://jacintodesign.github.io/quotes-api/data/quotes.json
*/

let apiQuotes = [];

// Show new quote
function newQuote() {
  // Pick a random quote from apiQuotes

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);

  //   * this is pulling for local storage (newQuote)
  //   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  //   console.log(quote);
}

// Get quotes from API
async function getQuotes() {
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();

    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// On Load
getQuotes();
// newQuote();
