//timestamp recorder for variable tester

function scoreUpdate() {
    if (score > 5) {
        score = 5;
    }
    else if (score < -5) {
        score = -5;
    }
    scoreboard.innerHTML = score;
    scoreRecord();
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
var duration = 0;
function getCurrentPlayTime() {
    curSec = parseInt(vidPlayer.currentTime);
}
function getDuration() {
    duration = parseInt(vidPlayer.duration) + 1;
}

var scoreArr = [[0, 0]];
var scoreUpdater;
var resetScore;
var scoringUpdate;
function initScoreArray() {
    getDuration();
    for (var i = 1; i <= duration; i++) {
        scoreArr.push([i, 0]);
    }
    /*
    for (var i = 0; i <= duration; i++) {
        console.log(scoreArr[i][0] + ", " + scoreArr[i][1]);
    }*/
    scoreUpdater = setInterval(scoreUpdate, 100);   //update score to the scoreboard to display
    resetScore = setInterval(resetScoreToZero, 1000);   //reset score to zero per 1 second
}

function scoreRecord() {
    getCurrentPlayTime();
    scoreArr[curSec][1] = score;
}

function endScoring() {
    clearInterval(scoringUpdate);
    clearInterval(resetScore);
    clearInterval(scoreUpdater);
    vidPlayer.pause();
    var left = duration - curSec;
    scoreArr.splice(curSec + 1, left);
}

function saveToCSV() {
    var csvFile = "data:text/csv;charset=utf-8;";
}