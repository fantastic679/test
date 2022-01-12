
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
var text = document.getElementById("text");

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
  }).catch(function(error) {
    console.log('Request failed', error);
});


var values = Object.keys(storeData).map(key => storeData[key]);
var values2 = values[0];
var values3 = [];

for (let i = 0; i < values2.length; i++){
    values3[i] = values2[i].reported_measure_summary.reported_measure_name;
}
values4 = [...new Set(values3)];



function uniqueArray(arr) {
    var a = [];
    for (var i=0, l=arr.length; i<l; i++)
        if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
            a.push(arr[i]);
    return a;
}



str = JSON.stringify(values4, null, 4); // (Optional) beautiful indented output.
console.log(str); // Logs output to dev tools console.
// alert(str); // Displays output using window.alert()

text.textContent = str;