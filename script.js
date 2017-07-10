var JSONdata;
var countryAmount;
var lati = 0;
var longi = 0;
var randomCapitalPre = 0;
var randomCapital = 0; 

$(document).ready(function(){
    console.log('@ready');
    $.getJSON('countries.json', function(data) {
        JSONdata = data;
        countryAmount = JSONdata.length;
    });
});

document.getElementById('btn').addEventListener("click", function() {
    randomCapitalPre = Math.random() * ((countryAmount - 1) - 0) + 0;
    randomCapital = Math.round(randomCapitalPre);
    lati = JSONdata[randomCapital].latlng[0];
    longi = JSONdata[randomCapital].latlng[1];
    initMap();
});

function initMap() {
        var newPlace = {lat: lati, lng: longi};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: newPlace
        });
        var marker = new google.maps.Marker({
          position: newPlace,
          map: map
        });
      }