let earthqUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


function points(magnitude) {
  return magnitude * 5;
}

function colorScale(magnitude) {
  return magnitude >= 5 ? '#FF0000':
         magnitude >= 4 ? '#FF9933':
         magnitude >= 3 ? '#FFCC99':
         magnitude >= 2 ? '#FFFF66':
         magnitude >= 1 ? '#B2FF66':
                          '#CCFF99';
}
function createMap(earthquakes) {

  let basicmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors,\
     <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: "pk.eyJ1IjoiamFrZXJ2b2d0IiwiYSI6ImNrNnhyZGJrbzBxMDYza21oaW83ajNram4ifQ.VamoU8sPDjpReBsAEgQfHA"
    });

  let myMap = L.map("map", {
    center: [39.83333, -98.58333],
    zoom: 5,
    layers: [basicmap, earthquakes]
  });

  let info = L.control({
    position: 'bottomright'
  })
 
  info.onAdd = function(){
    labels = ['0-1', '1-2', '2-3', '3-4', '4-5', '5+']
    let div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<h3>Magnitude</h3>'
    for (let i = 0; i <= 5; i++) {
      div.innerHTML += '<p><span style="font-size:20px; background-color:' + colorScale(i) +
        ';">&nbsp;&nbsp;&nbsp;&nbsp;</span> ' + labels[i] + '</p>';
    } 
    return div;
  };

  info.addTo(myMap);
}
function createFeatures(earthquakeData) {
  
  function popUpText(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
      "<p>Magnitude: " + feature.properties.mag + "</p>" +
      "<p>Type: " + feature.properties.type + "</p>");
  }
  
  let baseMarkerOptions = {
    color: '#191919',
    weight: 1,
    fillOpacity: 0.8
  }

  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, baseMarkerOptions);
    }, 
    style: function(feature) {
      return {
        radius: points(feature.properties.mag),
        fillColor: colorScale(feature.properties.mag)
      }
    },
    onEachFeature: popUpText
  });

  createMap(earthquakes);
}
d3.json(earthqUrl, function(data) {
  createFeatures(data.features);
});