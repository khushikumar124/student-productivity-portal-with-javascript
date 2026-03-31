let subjects = JSON.parse(localStorage.getItem("attendance")) || [];
let chartInstance = null;

function saveData() {
    localStorage.setItem("attendance", JSON.stringify(subjects));
}

function addAttendance() {
    const name = document.getElementById("subject").value;
    const attended = Number(document.getElementById("attended").value);
    const total = Number(document.getElementById("total").value);

    if (!name || !attended || !total) {
        alert("Fill all fields");
        return;
    }

    subjects.push({ name, attended, total });

    saveData();
    render();
}

function render() {
    const list = document.getElementById("attendanceList");
    list.innerHTML = "";

    let totalAttended = 0;
    let totalClasses = 0;

    subjects.forEach((s, index) => {
        const percent = ((s.attended / s.total) * 100).toFixed(1);

        totalAttended += s.attended;
        totalClasses += s.total;

        const card = document.createElement("div");
        card.className = "task-card";

        card.innerHTML = `
            <h4>${s.name}</h4>
            <p>${s.attended}/${s.total} classes</p>
            <p>Attendance: ${percent}%</p>
            <button onclick="deleteSubject(${index})">Delete</button>
        `;

        list.appendChild(card);
    });

    const overall = totalClasses
        ? ((totalAttended / totalClasses) * 100).toFixed(1)
        : 0;

    document.getElementById("overallBox").innerHTML =
        `<h3>Overall Attendance: ${overall}%</h3>`;

    drawChart();
}

function deleteSubject(index) {
    subjects.splice(index, 1);
    saveData();
    render();
}

function drawChart() {
    const canvas = document.getElementById("attendanceChart");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (chartInstance) {
        chartInstance.destroy();
    }

    const labels = subjects.map(s => s.name);
    const data = subjects.map(s => (s.attended / s.total) * 100);

    chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Attendance %",
                data: data,
                backgroundColor: data.map(p =>
                    p >= 75 ? "#22c55e" :
                    p >= 50 ? "#f59e0b" :
                    "#ef4444"
                )
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

render();