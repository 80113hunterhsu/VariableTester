//scoring main function (called from scoring button in index.html)

function scoring(key) {
    clearInterval(resetScore);
    if (score <= 5 && score >= -5) {
        if (key === 'KeyV') {
            score--;
        }
        else if (key === 'KeyN') {
            score++;
        }
        scoreCorrect(); 
        scoreboardDisplay(key);
    }
    resetScore = setInterval(resetScoreToZero, 1000);   //reset score to zero per 1 second
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

function keyScoring(key) {
    //console.log("key: " + key.code);
    if ((key.code === 'KeyV') || (key.code === 'KeyN')) {
        scoring(key.code);
        keyClicked(key.code);
    }
    if (key.code === 'Enter' && document.querySelector("#endTest").style.display !== 'none') {
        document.querySelector("#endTest").click();
        console.log('endTest clicked');
    }
}

function keyClicked(key) {
    if (key === 'KeyV') {
        document.querySelector("#scoreMinus").style.backgroundColor = "#218838";
        setTimeout(function () {document.querySelector("#scoreMinus").style.backgroundColor = "#28a745";}, 50);
    }
    else if (key === 'KeyN') {
        document.querySelector("#scorePlus").style.backgroundColor = "#c82333";
        setTimeout(function () {document.querySelector("#scorePlus").style.backgroundColor = "#dc3545";}, 50);
    }
}



