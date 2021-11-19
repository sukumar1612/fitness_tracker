function showMap(value) {
    var locations = location_data[value]
    var total_time_data = total_time[value]
    var walking_data = walking[value]
    var running_data = running[value]
    document.getElementById('weathermap').innerHTML = "<div id='map' style='height: 400px'></div>";
    document.getElementById("total_time").innerHTML = "total time :" + total_time_data
    document.getElementById("walking").innerHTML = "walking :" + walking_data
    document.getElementById("running").innerHTML = "running :" + running_data

    var map = new L.map('map').setView([11.206051, 122.447886], 8);
    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
        }).addTo(map);

    for (var i = 0; i < locations.length; i++) {
        marker = new L.marker([locations[i][0], locations[i][1]]).addTo(map);
    }
    var polyline = L.polyline(locations, {color: 'blue'}).addTo(map);
    map.fitBounds(polyline.getBounds());
}

async function forFetch(data) {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(window.location.href, fetchOptions);
    return response.json();
}

var location_data;
var total_time;
var walking;
var running;

async function Initialise() {
    const response = await forFetch({msg: "hello world"});
    let len = response['location_data'].length;
    location_data = response['location_data'];
    total_time = response['total_time'];
    walking = response['running'];
    running = response['walking'];
    var element = document.body;
    for (let loc = 0; loc < len; loc++) {
        var table = document.getElementById("myTable");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = "<button value=" + loc + " onclick='showMap(this.value)' >run number : " + (loc + 1) + "</button>";
    }
}


function go_back() {
    window.location.href = window.origin;
}