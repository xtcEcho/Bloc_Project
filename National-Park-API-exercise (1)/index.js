'use strict';

// put your own value below!
const apiKey = 'q5aeqe41ie0zvjPEMSd60nemVRLmfZrG6mvP3UxO'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';
const max_field = 10;
let x = 0;
let y = 0;
// let totalPC = [];
// let totalSC = [];
// let tryout = {
//   key :apiKey
// };
// console.log(tr);
function formatQueryParams(params){
  let result = [];
  let keys = Object.keys(params);
  for (let i = 0; i< keys.length; i++){
    if (Array.isArray(params[keys[i]])){
      console.log(params[keys[i]]);
      // for(let eachValue in params[keys[i]]){
      //   result.push(`${encodeURIComponent(keys[i])}=${encodeURIComponent(eachValue)}`);
      // }
      
        for (let j = 0; j < params[keys[i]].length; j++){
          
            console.log(`${encodeURIComponent(keys[i])}=${encodeURIComponent(params[keys[i]][j])}`);
            result.push(`${encodeURIComponent(keys[i])}=${encodeURIComponent(params[keys[i]][j])}`);
          
        }
      
      
    }else{
      result.push(`${encodeURIComponent(keys[i])}=${encodeURIComponent(params[keys[i]])}`);
    }
  }
  console.log(result);
  return result.join('&');
}


function displayResults(responseJson){
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i ++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].name}</h3>
      <p>${responseJson.data[i].description}</p>
      <p><a href ='${responseJson.data[i].url}'>website</p>
      </li>`);
  }
  $('#results').removeClass('hidden');
}

function getYourParks(parks, states, maxResults){
  const params = {
    parkCode: parks,
    stateCode: states,
    limit : maxResults,
    api_key :apiKey
  }
 console.log(states);
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url);

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
    let theParks = $('.js-park-code').map( function(){return $(this).val(); }).get();
    let theStates = $('.js-state-code').map( function(){return $(this).val().toUpperCase(); }).get();
    console.log(theStates);
    let maxR = $('#js-max-results').val();
    getYourParks(theParks, theStates, maxR);
  });
}

function addPark(){
  $('#add_parkcode_button').click(event => {
    event.preventDefault();
    if (x < 10){
      $('#js-parkCode').append('<input type="text" name="parkCode" class="js-park-code">');
      x++;
      // console.log('worded');
    }
    // console.log('worded');
  });
}

function addState(){
  $('#add_statecode_button').click(event => {
    event.preventDefault();
    if (y < 10){
      $('#js-stateCode').append('<input type="text" name="stateCode" class="js-state-code">');
      y++;
    }
  });
}

function startNewSearch(){
  $('#clear').click(event => {
    event.preventDefault();
    $('.js-park-code').remove();
    console.log($('div#js-parkCode').html());
    $('div#js-parkCode').append('<input type="text" name="parkCode" class="js-park-code">');
    $('.js-state-code').remove();
    $('div#js-stateCode').append('<input type="text" name="stateCode" class="js-state-code">');
  })
}

$(addPark);
$(addState);
$(startNewSearch);
$(watchForm);