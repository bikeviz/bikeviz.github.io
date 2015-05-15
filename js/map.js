var map = L.map('map').setView([40.7615231,-73.980196], 14);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
    	colors = ['#FF3333', '#D633D6', '#297ACC'],
        grades = [0, 2, 3],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML += '<strong>Available Bikes</strong><br><br>';
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background: ' + colors[i] + '"></i> ' +
            grades[i] + (grades[i + 1] ? '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'girikuncoro.3cb41734',
    accessToken: 'pk.eyJ1IjoiZ2lyaWt1bmNvcm8iLCJhIjoiT0lKa21GSSJ9.WTv_5SQ2ckgZcVaSofJ7LA'
}).addTo(map);

var circles = [];

d3.json("data/citibike_status.json", function(data){
	var status;
	var docks = data.stationBeanList;
	var time = data.executionTime;
	console.log(time);
	console.log(docks);

	docks.forEach(function (d,i) {
		if (d.availableBikes > 3) {
			status = "blue";
		} else if (d.availableBikes > 0) {
			status = "#D633D6";
		} else if (d.availableBikes == 0){
			status = "red";
		}

		circles[i] = L.circle([d.latitude,d.longitude], 50, {
		    color: status,
		    fillOpacity: 0.5
		}).addTo(map);

		circles[i].bindPopup("<strong>Station:</strong> " + d.stationName + "<br><strong>Available bikes:</strong> " + d.availableBikes + "<br><strong>Empty docks:</strong> " + d.availableDocks);
	});
	circles[237].openPopup();
})