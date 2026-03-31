let plans = JSON.parse(localStorage.getItem("dayPlans")) || [];

displayPlans();

function addPlan(){
    const task = document.getElementById("taskName").value.trim();
    const from = document.getElementById("fromTime").value;
    const to = document.getElementById("toTime").value;
    const info = document.getElementById("info").value.trim();

    const today = new Date().toISOString().split("T")[0];

    if(task === "" || from === "" || to === ""){
        alert("Please enter task and time");
        return;
    }

    if(to <= from){
        alert("End time must be after start time");
        return;
    }

    plans.push({
        task,
        from,
        to,
        info,
        date: today,
        done: false
    });

    localStorage.setItem("dayPlans", JSON.stringify(plans));

    document.getElementById("taskName").value = "";
    document.getElementById("fromTime").value = "";
    document.getElementById("toTime").value = "";
    document.getElementById("info").value = "";

    displayPlans();
}

function displayPlans(){
    const list = document.getElementById("planList");
    list.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

    let todayPlans = plans.filter(p => p.date === today);

    todayPlans.sort((a,b) => a.from.localeCompare(b.from));

    todayPlans.forEach((plan, index) => {
        const div = document.createElement("div");
        div.className = "task-card";

        if(plan.done){
            div.style.opacity = "0.6";
            div.style.textDecoration = "line-through";
        }

        div.innerHTML = `
            <h4>${plan.from} – ${plan.to} : ${plan.task}</h4>
            ${plan.info ? `<p>${plan.info}</p>` : ""}
            <button onclick="toggleDone(${index})">
                ${plan.done ? "Undo" : "Done"}
            </button>
            <button onclick="deletePlan(${index})">Delete</button>
        `;

        list.appendChild(div);
    });
}

function toggleDone(index){
    const today = new Date().toISOString().split("T")[0];
    let todayPlans = plans.filter(p => p.date === today);
    const selected = todayPlans[index];

    const realIndex = plans.findIndex(p =>
        p.task === selected.task &&
        p.from === selected.from &&
        p.date === selected.date
    );

    plans[realIndex].done = !plans[realIndex].done;
    localStorage.setItem("dayPlans", JSON.stringify(plans));
    displayPlans();
}

function deletePlan(index){
    const today = new Date().toISOString().split("T")[0];
    let todayPlans = plans.filter(p => p.date === today);
    const selected = todayPlans[index];

    plans = plans.filter(p =>
        !(p.task === selected.task &&
          p.from === selected.from &&
          p.date === selected.date)
    );

    localStorage.setItem("dayPlans", JSON.stringify(plans));
    displayPlans();
}
