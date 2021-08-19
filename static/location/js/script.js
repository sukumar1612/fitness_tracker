function showMap(locations) {
    document.getElementById('weathermap').innerHTML = "<div id='map' style='height: 400px'></div>";
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

function f1() {
    var locations = [
        [18.595948, 73.784044],
        [18.596356, 73.784002],
        [18.596855, 73.784024],
        [18.597220, 73.784302],
        [18.597176, 73.784826],
        [18.597166, 73.785373],
        [18.596605, 73.785523],
        [18.596309, 73.785458],
        [18.595902, 73.785361],
        [18.595926, 73.784714]
    ];


    showMap(locations);
}

function f2() {
    var locations = [
        [18.595948, 73.784044],
        [18.596356, 73.784002],
        [18.596855, 73.784024],
        [18.597220, 73.784302],
    ];
    showMap(locations);
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

async function Initialise() {
    const response = await forFetch({msg: "hello world"});
    let len = response['location_data'].length;
    location_data = response['location_data'];
    var element = document.body;
    for (let loc = 0; loc < len; loc++) {
        var table = document.getElementById("myTable");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = "<button value="+loc+" onclick='showMap(location_data[this.value])' >run number : "+(loc+1)+"</button>";
    }
}
