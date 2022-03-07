//line chart output
var scoreTime = [0];
var scoreScore = [0];
function chartPreprocess() {
    for (var i = 0; i <= curSec; i++) {
        scoreTime[i] = scoreArr[i][0];
        scoreScore[i] = scoreArr[i][1];
    }
}

//Chart.JS initialization
const resultChart = document.getElementById('resultChart');
function initChart() {
    const myChart = new Chart(resultChart, {
        type: 'line',
        data: {
            labels: scoreTime,
            datasets: [{
                label: var1,
                data: scoreScore,
                backgroundColor: '#28a745',
                borderColor: '#28a745',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
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