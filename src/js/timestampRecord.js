//timestamp recorder for variable tester

function scoreUpdate() {
    if (score > 5) {
        score = 5;
    }
    else if (score < -5) {
        score = -5;
    }
    //scoreboard.innerHTML = score;
    //scoreboardDisplay();
    scoreRecord();
}

var barItem;
var currentBarPos = 0;
function scoreboardVisible() {
    barItem = "scoreBar" + score;
    document.getElementById(barItem).style.visibility = "visible";
}
function scoreboardHidden() {
    if (score > 0) {
        for (var i = 0; i < 5; i++) {
            document.getElementsByClassName("scoreBarNeg")[i].style.visibility = "hidden";
        }
        for (var i = 5; i > score; i--) {
            barItem = "scoreBar" + i;
            document.getElementById(barItem).style.visibility = "hidden";
        }
    }
    else if (score < 0) {
        for (var i = 0; i < 5; i++) {
            document.getElementsByClassName("scoreBarPos")[i].style.visibility = "hidden";
        }
        for (var i = -5; i < score; i++) {
            barItem = "scoreBar" + i;
            document.getElementById(barItem).style.visibility = "hidden";
        }
    }
    else if (score == 0) {
        document.getElementById("scoreBar1").style.visibility = "hidden";
        document.getElementById("scoreBar-1").style.visibility = "hidden";
    }
}
function scoreboardDisplay(key) {
    //var barItem;
    if (score > 0) {
        if (key === 'KeyN') {//increase
            scoreboardVisible();
        }
        else if (key === 'KeyV') {  //decrease
            scoreboardHidden();
        }
    }
    else if (score < 0) {
        if (key === 'KeyV') {//increase
            scoreboardVisible();
        }
        else if (key === 'KeyN') {  //decrease
            scoreboardHidden();
        }
    }
    else if (score == 0) {
        console.log("in");
        scoreboardHidden();
    }
}

function keyClicked(key) {
    if (key === 'KeyV') {
        document.querySelector("#scoreMinus").style.backgroundColor = "#1c7530";
        setTimeout(function () {document.querySelector("#scoreMinus").style.backgroundColor = "#28a745";}, 100);
    }
    else if (key === 'KeyN') {
        document.querySelector("#scorePlus").style.backgroundColor = "#a81d2a";
        setTimeout(function () {document.querySelector("#scorePlus").style.backgroundColor = "#dc3545";}, 100);
    }
}

function keyScoring(key) {
    //console.log("key: " + key.code);
    if ((key.code === 'KeyV') || (key.code === 'KeyN')) {
        scoring(key.code);
        keyClicked(key.code);
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
        scoreboardDisplay(key);
    }
    //console.log(score);
}

function resetScoreToZero() {
    if (score > 0) {
        scoreboardHidden();
        score--;
    }
    else if (score < 0) {
        scoreboardHidden();
        score++;
    }
    else if (score == 0) {
        scoreboardHidden();
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

var scoreArr = [[0, 0]];    //(time, score)
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
    chartPreprocess();
    initChart();
    saveToCSV();
}

var csvFile;
var fullDate;
function saveToCSV() {
    var date = new Date();
    fullDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    var directions = "This file is generated by the Variable Tester. \r\n" + "Created on " + fullDate + " for " + subjectName + " with variable " + fullVar + ". \r\n\r\n" + "time(second), time(minute/second), " + var1.toLowerCase()  + "\r\n";
    csvFile = "data:text/csv;charset=utf-8," + directions;
    
    scoreArr.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvFile += row + "\r\n";
    });
    
    var encodedUri = encodeURI(csvFile);
    var link = document.querySelector("#csvDown");
    link.setAttribute("href", encodedUri);
    var fileName = subjectName + " " + var1 + ".csv";
    link.setAttribute("download", fileName);
}