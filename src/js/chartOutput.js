//line chart output
var scoreTime = [0];
var scoreScore = [0];
//test
/*var testScore = 5;
var teststat = -1;
for (var i = 0; i < 400; i++) {
    scoreTime[i] = i;
    if (teststat = -1) {
        scoreScore[i] = testScore--;
        if (testScore <= -5) {
            teststat = 1;
            testScore = -4;
        }
    }
    if (teststat == 1) {
        scoreScore[i] = testScore++;
        if (testScore >= 5) {
            teststat = -1;
            testScore = 4;
        }
    }
}*/

function chartPreprocess() {
    for (var i = 0; i <= curSec; i++) {
        scoreTime[i] = scoreArr[i][0];
        scoreScore[i] = scoreArr[i][1];
    }
    secondToMS();
}

var scoreTimeMS = ["0分0秒"];
function secondToMS() {
    //curSec = 399;
    for (var i = 1; i <= curSec; i++) {
        var tmp = (parseInt(scoreTime[i] / 60)) + "分" + (scoreTime[i] % 60) + "秒";
        scoreTimeMS.push(tmp);
        console.log(tmp);
    }
}

//Chart.JS initialization
const resultChart = document.getElementById('resultChart');
function initChart() {
    if (curSec < 10) {
        resultChart.style.width = curSec * 80 + "px";
    }
    else if (curSec < 20) {
        resultChart.style.width = curSec * 50 + "px";
    }
    else if (curSec < 60) {
        resultChart.style.width = curSec * 40 + "px";
    }
    else if (curSec >= 60) {
        resultChart.style.width = curSec * 30 + "px";
    }
    const myChart = new Chart(resultChart, {
        type: 'line',
        data: {
            labels: scoreTimeMS,
            datasets: [{
                label: var1,
                data: scoreScore,
                backgroundColor: '#28a745',
                borderColor: '#28a745',
                borderWidth: 1, 
                pointRadius: 1.5
            }]
        },
        options: {
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true, 
                    title: {
                      display: true,
                      text: 'Level'
                    },
                    suggestedMin: -5,
                    suggestedMax: 5

                },
                x: {
                    title: {
                      display: true,
                      text: 'Time'
                    }, 
                    ticks: {
                        autoSkip: false
                    }
                }
            }
        }
    });
}

function saveToImg() {
    var link = document.createElement("a");
    link.setAttribute('href', resultChart.toDataURL("image/jpg", 1.0).replace("image/png", "image/octet-stream"));
    var fileName = subjectName + " " + var1 + ".jpg";
    link.setAttribute("download", fileName);
    link.click();
}