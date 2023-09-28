"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
/*
api for quote generator:
https://jacintodesign.github.io/quotes-api/data/quotes.json
*/

let apiQuotes = [];

// Show new quote
function newQuote() {
  // Pick a random quote from apiQuotes

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // to check if author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;

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

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
// newQuote();
