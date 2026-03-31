let timetable = JSON.parse(localStorage.getItem("timetable")) || [];

loadTable();

function addSlot() {
    const subject = document.getElementById("subject").value.trim();
    const day = document.getElementById("day").value;
    const time = document.getElementById("time").value;

    if (subject === "") {
        alert("Enter subject name");
        return;
    }

    const cellId = day + "-" + time;
    const cell = document.getElementById(cellId);

    if (!cell) return;

    if (cell.innerText !== "") {
        alert("This slot is already filled!");
        return;
    }

    timetable.push({ subject, day, time });
    localStorage.setItem("timetable", JSON.stringify(timetable));

    cell.innerText = subject;
    document.getElementById("subject").value = "";
}

function loadTable() {
    timetable.forEach(slot => {
        const cellId = slot.day + "-" + slot.time;
        const cell = document.getElementById(cellId);
        if (cell) {
            cell.innerText = slot.subject;
        }
    });
}

function resetTable() {
    if (!confirm("Clear entire timetable?")) return;

    timetable = [];
    localStorage.removeItem("timetable");

    document.querySelectorAll(".timetable td").forEach(cell => {
        if (cell.id) cell.innerText = "";
    });
}
