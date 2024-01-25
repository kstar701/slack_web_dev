// 시간
const header5 = document.querySelector("#clock");
function updateClock() {
  const curTime = new Date();
  const timeString =
    String(curTime.getHours()).padStart(2, "0") +
    ":" +
    String(curTime.getMinutes()).padStart(2, "0") +
    ":" +
    String(curTime.getSeconds()).padStart(2, "0");

  header5.innerHTML = timeString;
}
updateClock();
// 첫번째는 함수 두번째는 시간(반복되는)
setInterval(updateClock, 1000);
