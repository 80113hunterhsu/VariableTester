// JavaScript Document
var i = 0;
function hide() {
    document.querySelector(".disclaimer").style.display = "none";
    i++;
}

function stop() {
    if (i >= 100) {
        clearInterval(run);
    }
}

function runner() {
    hide();
    stop();
}

if (window.location.href.includes("000webhostapp")) {
    var run = setInterval(runner, 100);
}