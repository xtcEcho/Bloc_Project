'use strict';


const futureLaunchURL = 'https://api.spacexdata.com/v3/launches/upcoming';
//rocket is the value that user put in in the dropdown select, all is default
let rocket;
let rocketName;



function displayResults(responseJson){
    // $('#results-list').empty();
    console.log(responseJson);
    
    if (responseJson.length != 0){
        $('#results-list').append(
            `<div class= "next title">Next Launch</div>
            <button class="next launch_entry">
                <h2 class="mission_name">Mission name: ${responseJson[0].mission_name}</h2>
                <h3 class="vehical">Vehical: ${responseJson[0].rocket.rocket_name}</h3>
                <h3 class="launch_date">Launch date UTC: ${responseJson[0].launch_date_utc}</h3>
                <h3 class="launch_site hidden">Launch site: ${responseJson[0].launch_site.site_name_long}</h3>
                <p class="detail hidden">${responseJson[0].details}</p>
                <ul class="payloads hidden">Payloads: ${responseJson[0].rocket.second_stage.payloads[0].payload_id}
                    <li class="payloads_details hidden">Type: ${responseJson[0].rocket.second_stage.payloads[0].payload_type}</li>
                    <li class="payloads_details hidden">Nationality: ${responseJson[0].rocket.second_stage.payloads[0].nationality}</li>
                    <li class="payloads_details hidden">Manufacturer: ${responseJson[0].rocket.second_stage.payloads[0].manufacturer}</li>
                    <li class="payloads_details hidden">Orbit: ${responseJson[0].rocket.second_stage.payloads[0].orbit}</li>
                </ul>
                <h4 class="expand">MORE</h4>
                
            </button>`
        );
        $('#results-list').append(
            `<div class= "future title">Next Launch</div>`);
        for (let i = 1; i < responseJson.length; i++){
            $('#results-list').append(
                `<button class="future launch_entry">
                    <h2 class="mission_name">Mission name: ${responseJson[i].mission_name}</h2>
                    <h3 class="vehical">Vehical: ${responseJson[i].rocket.rocket_name}</h3>
                    <h3 class="launch_date">Launch date UTC: ${responseJson[i].launch_date_utc}</h3>
                    <h3 class="launch_site hidden">Launch site: ${responseJson[i].launch_site.site_name_long}</h3>
                    <p class="detail hidden">${responseJson[i].details}</p>
                    <ul class="payloads hidden">Payloads: ${responseJson[i].rocket.second_stage.payloads[0].payload_id}
                        <li class="payloads_details hidden">Type: ${responseJson[i].rocket.second_stage.payloads[0].payload_type}</li>
                        <li class="payloads_details hidden">Nationality: ${responseJson[i].rocket.second_stage.payloads[0].nationality}</li>
                        <li class="payloads_details hidden">Manufacturer: ${responseJson[i].rocket.second_stage.payloads[0].manufacturer}</li>
                        <li class="payloads_details hidden">Orbit: ${responseJson[i].rocket.second_stage.payloads[0].orbit}</li>
                    </ul>
                    <h4 class="expand">MORE</h4>
                </button>`
            );
        }
        console.log($('#results-list').html());
    }else{
        $('#results-list').append(`<p>${rocketName} is on a mission to Mars right now, be right back!<p>`)
    }
    // console.log($('#results-list').html());
    $('#results').removeClass('hidden');
}
function getLaunches(){
    // let queryString;
    let queryString2 = 'tbd=false';
    let url = futureLaunchURL;
    if (rocket!= "All"){
        let queryString1 = `rocket_id=${rocket}`;
        url = url + "?" + queryString1;
    }
    url = url + "?" + queryString2;
    console.log(url);
    
    fetch(url)
    .then(response => {
      if (response.ok) {
        // console.log(response.clone().json());
        return response.clone().json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        rocket = $('select').val();
        rocketName = $('select option:selected').text();
        console.log(rocket);
        $('#results-list').empty();
        getLaunches();
    });
}

function watchButton(){
    $('#results-list').on("click", '.launch_entry', event => {
        // event.preventDefault;
        console.log('worked');
        // console.log(this.html());
        // console.log(event.currentTarget);
        // console.log($(event.currentTarget).children());
        // console.log($(this).find(".hidden").html());
        $(event.currentTarget).find(".hidden").toggle('hidden');
        if ($(event.currentTarget).find(".expand").text()== "MORE"){
            $(event.currentTarget).find(".expand").text("LESS");
        } else {
            $(event.currentTarget).find(".expand").text("MORE");
        }
    });
}


$(watchForm);
$(watchButton);