let exams = JSON.parse(localStorage.getItem("exams")) || [];

displayExams();

function addExam() {
    const name = document.getElementById("examName").value.trim();
    const date = document.getElementById("examDate").value;

    if (name === "" || date === "") {
        alert("Please fill all fields");
        return;
    }

    exams.push({ name, date });
    saveExams();
    displayExams();

    document.getElementById("examName").value = "";
    document.getElementById("examDate").value = "";
}

function displayExams() {
    const examList = document.getElementById("examList");
    examList.innerHTML = "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    exams.forEach((exam, index) => {
        const examDate = new Date(exam.date);
        examDate.setHours(0, 0, 0, 0);

        const diffTime = examDate - today;
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const div = document.createElement("div");
        div.className = "exam-card";

        if (daysLeft <= 7) div.style.borderLeft = "6px solid red";
        else if (daysLeft <= 14) div.style.borderLeft = "6px solid orange";
        else div.style.borderLeft = "6px solid green";

        div.innerHTML = `
            <h4>${exam.name}</h4>
            <p>Date: ${exam.date}</p>
            <p><strong>${daysLeft} day(s) remaining</strong></p>
            <button onclick="deleteExam(${index})">Delete</button>
        `;

        examList.appendChild(div);
    });
}

function deleteExam(index) {
    exams.splice(index, 1);
    saveExams();
    displayExams();
}

function saveExams() {
    localStorage.setItem("exams", JSON.stringify(exams));
}
