// Global Variables
var JSONdata;
var cityAmount;
var lati = 0;
var longi = 0;
var randomCityPre = 0;
var randomCity = 0;
var btn = document.getElementById('btn');
var map;
var service;
var infowindow;
var listedResults = [];

// Extracts information of the top 1000 most populated cities in the US
$(document).ready(function(){
    console.log('@ready');
    $.getJSON('cities.json', function(data) {
        JSONdata = data;
        cityAmount = JSONdata.length;
    });
});

// Randomly selects city on button click and re-initalizes map
btn.addEventListener("click", function() {
    randomCityPre = Math.random() * ((cityAmount - 1) - 0) + 0;
    randomCity = Math.round(randomCityPre);
    lati = JSONdata[randomCity].latitude;
    longi = JSONdata[randomCity].longitude;
    initMap();
});

// Map functionality
function initMap() {
    var newPlace = {lat: lati, lng: longi};
    
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: newPlace
    });
    
    var marker = new google.maps.Marker({
        position: newPlace,
        map: map
    });
    
    var request = {
        location: newPlace,
        radius: '500',
        query: 'Best Restaurants'
    };
   
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
    
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // sorts returned results in order of rading
            results.sort(function(a,b) {
                return b.rating - a.rating;
            });
          for (var i = 0; i < 5; i++) {
            createMarker(results[i]);
            listedResults[i] = results[i];
          }
        }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
}

