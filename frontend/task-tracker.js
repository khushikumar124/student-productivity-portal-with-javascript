let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {
    const name = document.getElementById("taskName").value.trim();
    const deadline = document.getElementById("deadline").value;
    const estTime = document.getElementById("estTime").value;

    if (name === "" || deadline === "" || estTime === "") {
        alert("Please fill all fields");
        return;
    }

    const task = {
        name,
        deadline,
        estTime: Number(estTime),
        completed: false
    };

    tasks.push(task);
    saveTasks();
    displayTasks();

    document.getElementById("taskName").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("estTime").value = "";
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const div = document.createElement("div");
        div.className = "task-card";

        const today = new Date().toISOString().split("T")[0];

        if (!task.completed && task.deadline <= today) {
            div.style.borderLeft = "6px solid red";
        }

        if (task.completed) {
            div.style.opacity = "0.6";
            div.style.textDecoration = "line-through";
        }

        div.innerHTML = `
            <h4>${task.name}</h4>
            <p>Deadline: ${task.deadline}</p>
            <p>Estimated Time: ${task.estTime} mins</p>
            <button onclick="toggleComplete(${index})">
                ${task.completed ? "Undo" : "Complete"}
            </button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        taskList.appendChild(div);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
