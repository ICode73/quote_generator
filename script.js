"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
//* Show new quote
function newQuote() {
  showLoadingSpinner();
  //* Pick a random quote from apiQuotes
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

  // * Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
  // throw new Error("oops");
  // console.log(error);
  //   * this is pulling for local storage (newQuote)
  //   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  //   console.log(quote);
}

// Get quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();

    newQuote();
  } catch (error) {
    console.log(error);
    // getQuotes();
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
