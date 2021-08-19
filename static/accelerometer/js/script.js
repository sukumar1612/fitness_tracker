var x = [];
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
    var arr = [acceleration.x.toFixed(3), acceleration.y.toFixed(3), acceleration.z.toFixed(3), "\n"]
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
        download(x, "data", "text/plain")
        x = []
    } else {
        flag = 1;
        document.getElementById("one").innerHTML = "stop"
        console.log(x)
    }
}