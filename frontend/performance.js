let chartInstance = null;

async function predict() {

    const hours = document.getElementById("hours").value;
    const days = document.getElementById("days").value;
    const sleep = document.getElementById("sleep").value;
    const assign = document.getElementById("assign").value;
    const attend = document.getElementById("attend").value;

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
            body: JSON.stringify({
                hours: Number(hours),
                days: Number(days),
                sleep: Number(sleep),
                assign: Number(assign),
                attend: Number(attend)
            })
        });

        const data = await res.json();
        const score = data.prediction;

        showResult(score);

    } catch (err) {
        // fallback if backend not deployed
        const score = (
            hours * 5 +
            days * 4 +
            sleep * 3 +
            assign * 0.3 +
            attend * 0.3
        ) / 2;

        showResult(score);
    }
}

function showResult(score) {
    document.getElementById("resultBox").style.display = "block";

    document.getElementById("scoreText").innerText =
        "Predicted Score: " + score.toFixed(2) + "%";

    drawChart(score);
}

function drawChart(score) {
    const canvas = document.getElementById("scoreChart");

    // 🚨 SAFETY CHECK
    if (!canvas) {
        console.error("Canvas not found");
        return;
    }

    const ctx = canvas.getContext("2d");

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Score", "Remaining"],
            datasets: [{
                data: [score, 100 - score],
                backgroundColor: [
                    score > 75 ? "#22c55e" :
                    score > 50 ? "#f59e0b" :
                    "#ef4444",
                    "#e5e7eb"
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}