function loadSummary(){

    const todayDate = new Date().toISOString().split("T")[0];

    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const todayDay = dayNames[new Date().getDay()];

    let timetable = JSON.parse(localStorage.getItem("timetable")) || [];

    let todaysClasses = timetable.filter(slot => slot.day === todayDay);

    let classList = todaysClasses.length
        ? todaysClasses.map(c => `${c.time} - ${c.subject}`).join("<br>")
        : "No classes today";

    let plans = JSON.parse(localStorage.getItem("dayPlans")) || [];

    let todayPlans = plans.filter(p => p.date === todayDate);

    let planList = todayPlans.length
        ? todayPlans.map(p => `${p.from}-${p.to} ${p.task}`).join("<br>")
        : "No plans added";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let dueToday = tasks.filter(t => t.deadline === todayDate);

    let dueList = dueToday.length
        ? dueToday.map(t => t.name).join("<br>")
        : "Nothing due today";

    document.getElementById("summaryContent").innerHTML = `
        <h4>Classes</h4>
        <p>${classList}</p>

        <h4>Plans</h4>
        <p>${planList}</p>

        <h4>Due Today</h4>
        <p>${dueList}</p>
    `;
}

function toggleTheme() {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    document.getElementById("themeToggle").innerText =
        isDark ? " ☀️ " : " 🌙 ";
}

(function () {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    window.addEventListener("DOMContentLoaded", () => {
        const btn = document.getElementById("themeToggle");
        if (btn) {
            btn.innerText = document.body.classList.contains("dark")
                ? " ☀️ "
                : " 🌙 ";
        }
    });
})();

loadSummary();