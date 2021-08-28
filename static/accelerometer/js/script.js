var x = [];
var x1 = [];
var flag = 0;

if ('LinearAccelerationSensor' in window) {
    document.getElementById('moApi').innerHTML = 'Generic Sensor API';

    let accelerometer = new LinearAccelerationSensor({frequency: 20});
    // number of times per second
    accelerometer.addEventListener('reading', e => {
        accelerationHandler(accelerometer, 'moAccel');
    });
    accelerometer.start();

} else if ('DeviceMotionEvent' in window) {
    document.getElementById('moApi').innerHTML = 'Device Motion API';

    var onDeviceMotion = function (eventData) {
        accelerationHandler(eventData.acceleration, 'moAccel');
    }

    window.addEventListener('devicemotion', onDeviceMotion, false);
} else {
    document.getElementById('moApi').innerHTML = 'No Accelerometer & Gyroscope API available';
}

function accelerationHandler(acceleration, targetId) {
    var arr = [acceleration.x.toFixed(3), acceleration.y.toFixed(3), acceleration.z.toFixed(3)]
    if (flag === 1) {
        x.push(arr);
    }
}


function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function myFunction() {
    if (flag === 1) {
        flag = 0;
        document.getElementById("one").innerHTML = "start"
        console.log(x, x1)
        //download(x, "data", "text/plain")
        //download(x1, "data", "text/plain")
        await forFetch(x, x1);
        x = []
        x1 = []
    } else {
        flag = 1;
        document.getElementById("one").innerHTML = "stop"
    }
}

async function geo_loc() {
    if (flag === 1) {
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
}

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;
    var arr1 = [crd.latitude, crd.longitude];
    x1.push(arr1)
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

async function geo_loc_exe() {
    while (1) {
        await geo_loc();
        await sleep(1000);
    }
}

async function forFetch(data, data1) {
    var dict={
        "accelerometer_data":data,
        "location_data":data1
    }
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dict),
    };
    console.log(window.location.href)
    await fetch(window.location.href, fetchOptions);
}
