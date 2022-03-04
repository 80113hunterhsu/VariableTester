//timestamp recorder for variable tester

function getCurrentPlayTime() {
    var time = document.querySelector(".ytp-time-current").innerHTML;
    var time_array = time.split(":");
    var seconds = (parseInt(time_array[0], 10) * 60) + (parseInt(time_array[1], 10));
}

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