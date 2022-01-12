
// On opening page, restore user data from local storage

// Take the user's input (location + radius)
// Store this in local storage
// Formulate into API queries

// Query map API to identify hospitals within radius of location
// Return list of hospitals
// Store this in local storage

// Query the medical API with list of hospitals as input
// Return corresponding rating / other metric
// Store this in local storage

// On map, zoom in to corresponding location + radius so that radius lies within bounds of display
// Place a pin on map for each hospital identified within radius
// To one side of the map, display a list of hospitals by distance to location and corresponding rating

// When user clicks on a pin, highlight information about that hospitals rating

var url = "https://myhospitalsapi.aihw.gov.au/api/v1/datasets"
var textarea1 = document.getElementById("textarea1");

// fetch(url).then(function(response) {
//     // response.text().then(function(text) {
//     //     text.textContent = text;
//     //     console.log(text);
//     // });
    


//     console.log(response.headers.get('Content-Type'));
//     console.log(response.headers.get('Date'));

//     console.log(response.status);
//     console.log(response.statusText);
//     console.log(response.type);
//     console.log(response.url);

// });

// text.textContent = "text";


var storeData;

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function json(response) {
    return response.json();
}

fetch(url)
  .then(json)
  .then(function(data) {
    console.log('Request succeeded with JSON response');
    storeData = data;
    /////////////
    var values = Object.keys(storeData).map(key => storeData[key]);
    var values2 = values[0];
    var values3 = [];

    for (let i = 0; i < values2.length; i++){
        values3[i] = values2[i].reported_measure_summary.reported_measure_name;
    }
    var values4 = [...new Set(values3)];

    var str = JSON.stringify(values4, null, 4);
    textarea1.textContent = str;

    var values5 = [];
    var values6 = [];
    for (let i = 0; i < values3.length; i++) {
        if (values3[i] == "Childbirth" ||
            values3[i] == "Caesarean delivery" ||
            values3[i] == "Vaginal delivery") {
                values5.push(values2[i].data_set_name);
                values6.push(values2[i].data_set_id);
            }
    }
    var values7 = [...new Set(values5)];
    var values8 = [...new Set(values6)];
    str = JSON.stringify(values7, null, 4)
    textarea2.textContent = str;
    str = JSON.stringify(values8, null, 4)
    textarea3.textContent = str;

    var values9 = [];
    var values10 = [];
    for (let i = 0; i < values6.length; i++) {
        for (let j = 0; j < values2.length; j++) {
            if (values2[j].data_set_id == values6[i]) {
                values9.push(values2[j].reported_measure_summary.measure_summary.measure_name)

            }
        }
    }
    var values10 = [...new Set(values9)];
    var str = JSON.stringify(values10, null, 4);
    textarea4.textContent = str;


// loop through values8
// access the measures API to obtain location
// store in array?
    var getLocation = function(data_set_id) {
        var data_items_url = "https://myhospitalsapi.aihw.gov.au/api/v1/datasets/" + data_set_id + "/data-items";
        var storeData = null;
        var hospital_locations = [];
        fetch(data_items_url)
            .then(json)
            .then(function(data) {
                console.log(data_set_id + "success");
                storeData = data;
                ////////////////
                var data_values = Object.keys(storeData).map(key => storeData[key]);
                var data_values2 = data_values[0];
                for (i = 0; i < data_values2.length; i++){
                    hospital_locations.push(data_values2[i].reporting_unit_summary.reporting_unit_name);
                }            
            }).catch(function(error) {
                console.log(data_set_id + "failure", error);
        });
        return hospital_locations;
    }

    var values11 = [];
    for (let i = 0; i < values8.length; i++) {
        values11.push(getLocation(values8[i]));
    }
    var values12 = [...new Set(values11)];
    var str = JSON.stringify(values12, null, 4);
    textarea5.textContent = str;



    

  }).catch(function(error) {
    console.log('Request failed', error);
});