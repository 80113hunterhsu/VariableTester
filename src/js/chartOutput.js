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
        scoreScore[i] = scoreArr[i][2];
    }
    secondToMS();
}

var scoreTimeMS = ["0分0秒"];
function secondToMS() {
    //curSec = 399;
    for (var i = 1; i <= curSec; i++) {
        var tmp = (parseInt(scoreTime[i] / 60)) + "分" + (scoreTime[i] % 60) + "秒";
        scoreTimeMS.push(tmp);
        //console.log(tmp);
    }
}

//Chart.JS initialization
const canvasRoot = document.getElementById('canvasRoot');
var resultChart;
var pub_skip_stat;
function makeCanvas() {
    var can = document.createElement("canvas");
    can.setAttribute("id", "resultChart");
    can.setAttribute("style", "height: 400px;");
    canvasRoot.appendChild(can);
    resultChart = document.getElementById('resultChart');
}
function chartBtnColor() {
    var fullChart_btn = document.getElementById("fullChart");
    var compressedChart_btn = document.getElementById("compressedChart");
    if (pub_skip_stat == false) {
        //full
        fullChart_btn.setAttribute("class", "btn btn-success btn-md mr-2");
        compressedChart_btn.setAttribute("class", "btn btn-dark btn-md ml-2");
    }
    else if (pub_skip_stat == true) {
        //compressed
        compressedChart_btn.setAttribute("class", "btn btn-success btn-md ml-2");
        fullChart_btn.setAttribute("class", "btn btn-dark btn-md mr-2");
    }
}
function initChart(skip_stat) {
    pub_skip_stat = skip_stat;
    chartBtnColor();
    if(resultChart) {
        resultChart.remove();
    }
    makeCanvas();
    if (skip_stat == true) {
        resultChart.style.width = "100%";
    }
    else {
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
    }

    //chart
    //data
    const data = {
        labels: scoreTimeMS,
        datasets: [{
            label: var1,
            data: scoreScore,
            backgroundColor: '#28a745',
            borderColor: '#28a745',
            borderWidth: 1, 
            pointRadius: 1.5
        }]
    };
    //plugin
    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
            const ctx = chart.canvas.getContext('2d');
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };

    //option
    const options = {
        responsive: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Level'
                },
                suggestedMin: -5,
                suggestedMax: 5,
                grid: {
                    lineWidth: function(context) {
                        if (context.tick.value == '0') {
                            return 10;
                        }
                        else {
                            return 1;
                        }
                    }
                }
            },
            x: {
                beginAtZero: true, 
                title: {
                    display: true,
                    text: 'Time'
                }, 
                ticks: {
                    autoSkip: skip_stat
                }
            }
        }
    }

    //config
    const config = {
        type: 'line',
        data: data,
        options: options,
        plugins: [plugin],
    };
    
    //render
    const myChart = new Chart(resultChart, config);
    console.log("done");
    /* {
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
                        autoSkip: skip_stat
                    }
                }
            }
        }, 
        plugins: [{
            id: "custom_canvas_background_color", 
            beforeDraw: (chart) => {
                const ctx = chart.canvas.getContext('2d');
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'lightGreen';
                ctx.fillRect(0, 0, chart.width. chart.height);
                ctx.restore();
            }
        }]
    } );*/
}

function saveToImg() {
    var link = document.createElement("a");
    link.setAttribute('href', resultChart.toDataURL("image/jpg", 1.0).replace("image/png", "image/octet-stream"));
    var fileName = subjectName + " " + var1 + ".jpg";
    link.setAttribute("download", fileName);
    link.click();
}