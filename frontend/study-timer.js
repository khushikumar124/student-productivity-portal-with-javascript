let timer;
let minutes=localStorage.getItem("study_minutes") || 25;
let seconds=localStorage.getItem("study_seconds") || 0;
let running = false;

updateDisplay();

function startTimer(){
    if(running) return;
    running = true;
    timer= setInterval(()=>{
        if(seconds==0){
            if(minutes==0){
                clearInterval(timer);
                alert("Study Session Completed");
                running = false;
                return;
            }
            minutes--;
            seconds=59;
        } else{
            seconds--;
        }
        updateDisplay();
        saveTime();
    }, 1000);
}

function pauseTimer(){
    clearInterval(timer);
    running=false;
}

function resetTimer(){
    pauseTimer();
    minutes=25;
    seconds=0;
    updateDisplay();
    saveTime();
}
function updateDisplay(){
    document.getElementById("time").innerText= String(minutes).padStart(2, '0')+":"+String(seconds).padStart(2,'0');
}

function saveTime(){
    localStorage.setItem("study_minutes", minutes);
    localStorage.setItem("study_seconds", seconds);
}
