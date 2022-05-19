//scoring main function (called from scoring button in index.html)
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

function keyClicked(key) {
    if (key === 'KeyV') {
        document.querySelector("#scoreMinus").style.backgroundColor = "#1c7530";
        setTimeout(function () {document.querySelector("#scoreMinus").style.backgroundColor = "#28a745";}, interval);
    }
    else if (key === 'KeyN') {
        document.querySelector("#scorePlus").style.backgroundColor = "#a81d2a";
        setTimeout(function () {document.querySelector("#scorePlus").style.backgroundColor = "#dc3545";}, interval);
    }
}



