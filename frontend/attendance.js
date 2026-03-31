let records = JSON.parse(localStorage.getItem("attendance")) || [];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addBtn").addEventListener("click", addAttendance);
    displayAttendance();
});

function addAttendance() {
    const subject = document.getElementById("subject").value.trim();
    const attended = Number(document.getElementById("attended").value);
    const total = Number(document.getElementById("total").value);

    if (!subject || total === 0) {
        alert("Please fill all fields correctly");
        return;
    }

    const percentage = (attended / total) * 100;

    records.push({ subject, attended, total, percentage });

    localStorage.setItem("attendance", JSON.stringify(records));

    document.getElementById("subject").value = "";
    document.getElementById("attended").value = "";
    document.getElementById("total").value = "";

    displayAttendance();
}

function displayAttendance() {
    const list = document.getElementById("attendanceList");
    const summary = document.getElementById("attendanceSummary");

    list.innerHTML = "";

    if (records.length === 0) {
        summary.innerHTML = "<p style='text-align:center;'>No data yet</p>";
        return;
    }

    let totalAttended = 0;
    let totalClasses = 0;

    records.forEach((rec, index) => {

        totalAttended += rec.attended;
        totalClasses += rec.total;

        const percent = Number(rec.percentage);

        let color = "green";
        if (percent < 75) color = "orange";
        if (percent < 60) color = "red";

        let needed = 0;

        if (percent < 75) {
            needed = Math.ceil((0.75 * rec.total - rec.attended) / (1 - 0.75));
            if (needed < 0) needed = 0;
        }

        const div = document.createElement("div");
        div.className = "task-card";
        div.style.borderLeft = `6px solid ${color}`;

        div.innerHTML = `
            <h4>${rec.subject}</h4>
            <p>${rec.attended}/${rec.total} classes</p>
            <p><strong>${percent.toFixed(1)}%</strong></p>
            ${percent < 75 ? `<p>Attend next ${needed} classes to reach 75%</p>` : `<p>On track 👍</p>`}
            <button onclick="deleteRecord(${index})">Delete</button>
        `;

        list.appendChild(div);
    });

    const overall = (totalAttended / totalClasses) * 100;

    const allSafe = records.every(r => Number(r.percentage) >= 75);

    let status = "";
    let color = "";

    if (overall >= 75 && allSafe) {
        status = "SAFE ✅";
        color = "green";
    } else {
        status = "AT RISK ⚠️";
        color = "red";
    }

    summary.innerHTML = `
        <div class="task-card" style="border-left:6px solid ${color}">
            <h3>Overall Attendance: ${overall.toFixed(1)}%</h3>
            <h4>Status: ${status}</h4>
        </div>
    `;
}

function deleteRecord(index) {
    records.splice(index, 1);
    localStorage.setItem("attendance", JSON.stringify(records));
    displayAttendance();
}