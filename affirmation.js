const affirmations = [
    "I am capable of achieving great things.",
    "I believe in myself and my abilities.",
    "Every day I am improving.",
    "I am focused and disciplined.",
    "My hard work will pay off.",
    "I can overcome any challenge.",
    "I am becoming better every day.",
    "Success comes from consistency.",
    "I am calm, confident, and prepared.",
    "I deserve success and happiness."
];

let saved = JSON.parse(localStorage.getItem("savedAffirmations")) || [];

displaySaved();

function newAffirmation() {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    document.getElementById("affirmationText").innerText = affirmations[randomIndex];
}

function saveAffirmation() {
    const text = document.getElementById("affirmationText").innerText;

    if (!saved.includes(text)) {
        saved.push(text);
        localStorage.setItem("savedAffirmations", JSON.stringify(saved));
        displaySaved();
    }
}

function displaySaved() {
    const list = document.getElementById("savedList");
    list.innerHTML = "";

    saved.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "affirm-card";

        div.innerHTML = `
            <p>"${item}"</p>
            <button onclick="deleteAffirmation(${index})">Delete</button>
        `;

        list.appendChild(div);
    });
}

function deleteAffirmation(index) {
    saved.splice(index, 1);
    localStorage.setItem("savedAffirmations", JSON.stringify(saved));
    displaySaved();
}
