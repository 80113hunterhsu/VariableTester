var barItem;
//var currentBarPos = 0;
var time;
var startTime;

function scoreboardDisplay(key) {
    console.log(score);
    if (score > 0) {
        if (key === 'KeyN') {   //increase
            scoreboardVisible();
        }
        else if (key === 'KeyV') {  //decrease
            scoreboardHidden();
        }
    }
    else if (score < 0) {
        if (key === 'KeyV') {   //increase
            scoreboardVisible();
        }
        else if (key === 'KeyN') {  //decrease
            scoreboardHidden();
        }
    }
    else if (score == 0) {
        //console.log("in");
        scoreboardHidden();
    }
}

    function scoreboardVisible() {
        barItem = "scoreBar" + score;
        document.getElementById(barItem).style.visibility = "visible";
    }
    
    var allElements = document.getElementsByClassName("scoreBar");
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
            for (var i = 0; i < allElements.length; i++) {
                allElements[i].style.visibility = "hidden";
            }
            console.log("0, all hidden");
        }
    }