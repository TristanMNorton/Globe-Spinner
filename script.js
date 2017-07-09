var requestURL = 'http://techslides.com/demos/country-capitals.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
var countries = request.response;

var lati = 0;
var longi = 0;

document.getElementById('btn').addEventListener("click", function() {
    lati = Math.random() * ((+90) - (-90)) + (-90);
    longi = Math.random() * ((+180) - (-180)) + (-180);
    initMap();
    console.log(countries.CountryName)
});

function initMap() {
        var newPlace = {lat: lati, lng: longi};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: newPlace
        });
        var marker = new google.maps.Marker({
          position: newPlace,
          map: map
        });
      }