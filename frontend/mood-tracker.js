let moods = JSON.parse(localStorage.getItem("moods")) || [];

const today = new Date();
const todayStr = today.toISOString().split("T")[0];

updateTodayMood();
generateCalendar();
analyzeMood();

function setMood(mood, emoji) {
    const existingIndex = moods.findIndex(m => m.date === todayStr);

    if (existingIndex !== -1) {
        moods[existingIndex] = { date: todayStr, mood, emoji };
    } else {
        moods.push({ date: todayStr, mood, emoji });
    }

    localStorage.setItem("moods", JSON.stringify(moods));
    updateTodayMood();
    generateCalendar();
    analyzeMood();
}

function updateTodayMood() {
    const todayEntry = moods.find(m => m.date === todayStr);
    const text = document.getElementById("todayMood");

    if (todayEntry) {
        text.innerText = `Today's Mood: ${todayEntry.emoji} ${todayEntry.mood}`;
    } else {
        text.innerText = "Today's Mood: Not selected";
    }
}

function generateCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

        const box = document.createElement("div");
        box.className = "day-box";

        const entry = moods.find(m => m.date === dateStr);

        box.innerHTML = `
            <div>${day}</div>
            <div>${entry ? entry.emoji : ""}</div>
        `;

        calendar.appendChild(box);
    }
}

function analyzeMood() {
    const year = today.getFullYear();
    const month = today.getMonth();

    const monthMoods = moods.filter(m => {
        const d = new Date(m.date);
        return d.getFullYear() === year && d.getMonth() === month;
    });

    let count = {
        Happy: 0,
        Good: 0,
        Okay: 0,
        Stressed: 0,
        Sad: 0
    };

    monthMoods.forEach(m => count[m.mood]++);

    let maxMood = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);

    let message = "";

    if (count[maxMood] === 0) {
        message = "No mood data yet this month.";
    } 
    else if (maxMood === "Happy") {
        message = "Great! You had a very positive month 😄";
    }
    else if (maxMood === "Good") {
        message = "You maintained a calm and steady mood 🙂";
    }
    else if (maxMood === "Okay") {
        message = "This month was balanced. Try to add more positivity 🌱";
    }
    else if (maxMood === "Stressed") {
        message = "You seemed stressed often this month. Take breaks 💙";
    }
    else if (maxMood === "Sad") {
        message = "This month looked emotionally tough. Take care 🤍";
    }

    document.getElementById("analysisText").innerText = message;
}
