//timestamp recorder for variable tester

function getCurrentPlayTime() {
    var time = document.querySelector(".ytp-time-current").innerHTML;
    var time_array = time.split(":");
    var seconds = (parseInt(time_array[0], 10) * 60) + (parseInt(time_array[1], 10));
}