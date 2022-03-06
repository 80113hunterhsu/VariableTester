//timestamp recorder for variable tester

function scoreUpdate() {
    if (score > 5) {
        score = 5;
    }
    else if (score < -5) {
        score = -5;
    }
    scoreboard.innerHTML = score;
}

function keyScoring(key) {
    //console.log("key: " + key.code);
    if ((key.code === 'KeyV') || (key.code === 'KeyN')) {
        scoring(key.code);
    }
    if (key.code === 'Space') {
        //
    }
}

function scoring(key) {
    if (score <= 5 && score >= -5) {
        if (key === 'KeyV') {
            score--;
        }
        if (key === 'KeyN') {
            score++;
        }
    }
    //console.log(score);
}

function resetScoreToZero() {
    if (score > 0) {
        score--;
    }
    else if (score < 0) {
        score++;
    }
    //console.log(score);
}


var curSec = 0;
function getCurrentPlayTime() {
    var curTime = document.querySelector(".ytp-time-current").innerHTML;
    var curTime_array = curTime.split(":");
    curSec = (parseInt(curTime_array[0], 10) * 60) + (parseInt(curTime_array[1], 10));
}

var fullSec = 0;
function getFullPlayTime() {
    var fullTime = document.querySelector(".ytp-time-duration").innerHTML;
    var fullTime_array = fullTime.split(":");
    fullSec = (parseInt(fullTime_array[0], 10) * 60) + (parseInt(fullTime_array[1], 10));
}

function initScoreArray() {
    getFullPlayTime();
    var arrlen = fullSec;
    for (var i = 0; i < arrlen; i++) {
        scoreArr[i][0] = i;
        scoreArr[i][1] = 0;
    }
    for (var i = 0; i < arrlen; i++) {
        console.log(scoreArr[i][0] + ", " + scoreArr[i][1]);
    }
}


