let chart = null;

async function predict() {

    const hours = Number(document.getElementById("hours").value);
    const days = Number(document.getElementById("days").value);
    const sleep = Number(document.getElementById("sleep").value);
    const assign = Number(document.getElementById("assign").value);
    const attend = Number(document.getElementById("attend").value);

    if (!hours || !days || !sleep || !assign || !attend) {
        alert("Please fill all fields");
        return;
    }

    try {
        const res = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ hours, days, sleep, assign, attend })
        });

        const data = await res.json();
        const score = data.prediction;

        let tips = [];
        if (hours < 4) tips.push("Increase study hours");
        if (days < 5) tips.push("Be more consistent");
        if (sleep < 6) tips.push("Improve sleep");
        if (assign < 70) tips.push("Complete more assignments");
        if (attend < 75) tips.push("Improve attendance");

        displayResult(score, tips);
        drawMeter(score);
        drawChart(hours, days, sleep, assign, attend);

    } catch (err) {
        alert("Error connecting to backend");
        console.error(err);
    }
}

function displayResult(score, tips) {

    const box = document.getElementById("resultBox");
    box.style.display = "block";

    document.getElementById("scoreText").innerText =
        "Predicted Score: " + score.toFixed(2) + "%";

    document.getElementById("suggestionText").innerText =
        tips.length ? tips.join(" | ") : "You're doing great! Keep it up";
}

function drawMeter(score) {

    const canvas = document.getElementById("scoreCanvas");
    const ctx = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 70;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 10;
    ctx.stroke();

    const endAngle = (score / 100) * 2 * Math.PI;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle - Math.PI / 2);

    if (score > 75) ctx.strokeStyle = "green";
    else if (score > 50) ctx.strokeStyle = "orange";
    else ctx.strokeStyle = "red";

    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.font = "20px Arial";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.fillText(score.toFixed(0) + "%", centerX, centerY + 5);
}

function drawChart(hours, days, sleep, assign, attend) {

    const ctx = document.getElementById("performanceChart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Hours", "Days", "Sleep", "Assignments", "Attendance"],
            datasets: [{
                label: "Your Inputs",
                data: [hours, days, sleep, assign, attend],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}