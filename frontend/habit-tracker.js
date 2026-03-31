let habits = JSON.parse(localStorage.getItem("habits")) || [];

displayHabits();

function addHabit() {
    const name = document.getElementById("habitName").value.trim();

    if (name === "") {
        alert("Enter a habit name");
        return;
    }

    habits.push({
        name: name,
        streak: 0,
        lastDone: ""
    });

    localStorage.setItem("habits", JSON.stringify(habits));
    document.getElementById("habitName").value = "";
    displayHabits();
}

function displayHabits() {
    const list = document.getElementById("habitList");
    list.innerHTML = "";

    habits.forEach((habit, index) => {
        const div = document.createElement("div");
        div.className = "habit-card";

        div.innerHTML = `
            <h4>${habit.name}</h4>
            <p>🔥 Streak: ${habit.streak} day(s)</p>
            <button onclick="markDone(${index})">Done Today</button>
            <button onclick="deleteHabit(${index})">Delete</button>
        `;

        list.appendChild(div);
    });
}

function markDone(index) {
    const today = new Date().toISOString().split("T")[0];
    const habit = habits[index];

    if (habit.lastDone === today) {
        alert("Already marked done today!");
        return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yestStr = yesterday.toISOString().split("T")[0];

    if (habit.lastDone === yestStr) {
        habit.streak++;
    } else {
        habit.streak = 1;
    }

    habit.lastDone = today;

    localStorage.setItem("habits", JSON.stringify(habits));
    displayHabits();
}

function deleteHabit(index) {
    habits.splice(index, 1);
    localStorage.setItem("habits", JSON.stringify(habits));
    displayHabits();
}
