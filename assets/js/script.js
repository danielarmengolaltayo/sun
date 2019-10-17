var times = SunCalc.getTimes(new Date(), 41.419290, 2.161645); // location: Bunkers del Carmel, Barcelona, Spain
var clock = document.getElementById("clock");
var moreInfo = document.getElementById("moreInfo");
var sun = document.getElementById("sun");
var hours, minutes, seconds;
var h, w;
var sunX = 0;
var sunW = 50;
var sunlightW = 20;
var sunP;

var light = [
    {name: "sunrise", description: "sunrise (top edge of the sun appears on the horizon)"},
    {name: "sunriseEnd", description: "sunrise ends (bottom edge of the sun touches the horizon)"},
    {name: "goldenHourEnd", description: "morning golden hour (soft light, best time for photography) ends"},
    {name: "solarNoon", description: "solar noon (sun is in the highest position)"},
    {name: "goldenHour", description: "evening golden hour starts"},
    {name: "sunsetStart", description: "sunset starts (bottom edge of the sun touches the horizon)"},
    {name: "sunset", description: "sunset (sun disappears below the horizon, evening civil twilight starts)"},
    {name: "dusk", description: "dusk (evening nautical twilight starts)"},
    {name: "nauticalDusk", description: "nautical dusk (evening astronomical twilight starts)"},
    {name: "night", description: "night starts (dark enough for astronomical observations)"},
    {name: "nadir", description: "nadir (darkest moment of the night, sun is in the lowest position)"},
    {name: "nightEnd", description: "night ends (morning astronomical twilight starts)"},
    {name: "nauticalDawn", description: "nautical dawn (morning nautical twilight starts)"},
    {name: "dawn", description: "dawn (morning nautical twilight ends, morning civil twilight starts)"}
];

// populate objects inside light array
for(var i = 0; i < light.length; i++){
    light[i].time = HHMMSS(XX(times[light[i].name].getHours()), XX(times[light[i].name].getMinutes()), XX(times[light[i].name].getSeconds()));
    light[i].seconds = secondsInTotal(times[light[i].name].getHours(), times[light[i].name].getMinutes(), times[light[i].name].getSeconds());
}

// repeat every minute
setInterval(function(){
    currentTime();
    windowSize();
    setupSun();
    clock.textContent = HHMMSS(XX(hours), XX(minutes), XX(seconds)) + " — " + secondsInTotal(hours, minutes, seconds);
    moreInfo.textContent = " — h: " + h + " w: " + w;
    // sunX++;
    // updateSun();
}, 1000);

// init
viz();

// get size window
function windowSize(){
    h = window.innerHeight;
    w = window.innerWidth;
}

// get current time
function currentTime(){
    var now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
    seconds = now.getSeconds();
}

// return a string with two digits
// add a zero at the beginning and cut the string from the end to keep only two characters
function XX(x){ return ("0" + x).slice(-2); }

// transform time to format HH:MM:SS
function HHMMSS(h, m, s){ return (h + ":" + m + ":" + s); }

function viz(){
    for(var i = 0; i < light.length; i++){
        document.getElementById("names").insertAdjacentHTML("beforeend", "<li>" + light[i].name + "</li>");
        document.getElementById("descriptions").insertAdjacentHTML("beforeend", "<li>" + light[i].description + "</li>");
        document.getElementById("times").insertAdjacentHTML("beforeend", "<li>" + light[i].time + " — " + light[i].seconds + "</li>");
    }
}

// calculate the total amount of seconds given hours, minutes and seconds
function secondsInTotal(h, m, s){ return (h * 3600) + (m * 60) + s; }


document.getElementById("button").addEventListener("click", function(){
    updateSun(PtoW(document.querySelector("input[type='text']").value));
    document.querySelector("input[type='text']").value = "";
});

document.querySelector("input[type='range']").addEventListener("change", function(){
    updateSun(PtoW(document.querySelector("input[type='range']").value));
});

// transformation from (w)idth of the window in pixels to (p)ercentage
function WtoP(x){
    // formula = (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
    var inMin = - sunlightW - sunW;
    var inMax = w - sunlightW;
    var outMin = 0;
    var outMax = 100;
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// transformation from (p)ercentage to (w)idth of the window in pixels
function PtoW(x){
    // formula = (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
    var inMin = 0;
    var inMax = 100;
    var outMin = - sunlightW - sunW;
    var outMax = w - sunlightW;
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function updateSun(x){
    sun.style.left = x + "px";
    document.getElementById("sunBody").innerHTML = x + "px<br>" + WtoP(x) + "%";
}

function setupSun(){
    document.getElementById("sunBody").style.height = sunW + "px";
    document.getElementById("sunBody").style.width = sunW + "px";
    document.getElementById("sunL").style.width = sunlightW + "px";
    document.getElementById("sunR").style.width = sunlightW + "px";
}