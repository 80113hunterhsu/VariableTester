//line chart output
var scoreTime = [0];
var scoreScore = [0];
function chartPreprocess() {
    for (var i = 0; i <= curSec; i++) {
        scoreTime[i] = scoreArr[i][0];
        scoreScore[i] = scoreArr[i][1];
    }
}