// 달력(풀캘린더)
var calendar;
document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    selectable: true,
    locale: "ko",
    expandRows: true,
    events: [
      {
        title: "일정",
        start: "2021-05-26 00:00:00",
        end: "2021-05-27 24:00:00",
      },
    ],
    editable: true,
    displayEventTime: false,
  });
  calendar.render();
});

function addEventToCalendar(event) {
  calendar.addEvent(event);
}

function removeEventFromCalendar(id) {
  var calendarEvent = calendar.getEventById(id);
  calendarEvent.remove();
}
