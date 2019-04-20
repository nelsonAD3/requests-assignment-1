'use strict';

const apiKey = "31c77d07a6ff4f1895fef3ba47d948d6";

// const searchURL = 'https://api.github.com/users/nelsonad3/repos';


function formatQueryParams(userName) {
  // const queryItems = Object.keys(params)
  //   .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  // return queryItems.join('&');
  return `https://api.github.com/users/${userName}/repos`;
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  console.log(responseJson[0].html_url);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++){
  //   // for each repo in the response
  //   //array, add a list item to the results 
  //   //list with the article title, source, author,
  //   //description, and image
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>


      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNews(userName) {

  const queryString = formatQueryParams(userName)
  const url = queryString;

  console.log(url);

  // const options = {
  //   headers: new Headers({
  //     "X-Api-Key": apiKey})
  // };

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userName = $('#js-search-term').val();
    getNews(userName);
  });
}

$(watchForm);