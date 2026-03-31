const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");

let mode = "draw";
let drawing = false;

let startX = 0;
let startY = 0;

let textInput = null;

const status = document.getElementById("drawStatus");

function fixCanvasResolution() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

fixCanvasResolution();
window.addEventListener("resize", fixCanvasResolution);

function setMode(m){
    mode = m;
    drawing = false;
    status.innerText = "Mode: OFF";
}

canvas.addEventListener("click", (e) => {

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mode === "text") {
        createTextInput(x, y);
        return;
    }

    if (mode !== "draw") return;

    drawing = !drawing;

    if (drawing) {
        status.innerText = "Mode: DRAWING ✏️";
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        status.innerText = "Mode: OFF";
    }
});

canvas.addEventListener("mousemove", (e) => {

    if (!drawing || mode !== "draw") return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#333";

    ctx.lineTo(x, y);
    ctx.stroke();
});

canvas.addEventListener("mousedown", (e) => {

    if (mode === "draw" || mode === "text") return;

    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
});

canvas.addEventListener("mouseup", (e) => {

    if (mode === "draw" || mode === "text") return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mode === "rect") {
        ctx.strokeRect(startX, startY, x - startX, y - startY);
    }

    if (mode === "circle") {
        const radius = Math.sqrt((x - startX)**2 + (y - startY)**2);
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2*Math.PI);
        ctx.stroke();
    }

    if (mode === "arrow") {
        drawArrow(startX, startY, x, y);
    }
});

function drawArrow(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const angle = Math.atan2(y2 - y1, x2 - x1);

    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 10 * Math.cos(angle - 0.3), y2 - 10 * Math.sin(angle - 0.3));
    ctx.lineTo(x2 - 10 * Math.cos(angle + 0.3), y2 - 10 * Math.sin(angle + 0.3));
    ctx.closePath();
    ctx.fill();
}

function createTable(){
    const rows = 3;
    const cols = 4;
    const cellW = 100;
    const cellH = 50;

    let startX = 50;
    let startY = 50;

    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            ctx.strokeRect(
                startX + j*cellW,
                startY + i*cellH,
                cellW,
                cellH
            );
        }
    }
}

function createTextInput(x, y) {

    if (textInput) {
        document.body.removeChild(textInput);
    }

    textInput = document.createElement("input");
    textInput.type = "text";
    textInput.placeholder = "Type here...";

    textInput.style.position = "absolute";
    textInput.style.left = (canvas.offsetLeft + x) + "px";
    textInput.style.top = (canvas.offsetTop + y) + "px";
    textInput.style.font = "16px Arial";
    textInput.style.border = "1px solid #ccc";
    textInput.style.padding = "2px";

    document.body.appendChild(textInput);
    textInput.focus();

    textInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            drawText(x, y, textInput.value);
            document.body.removeChild(textInput);
            textInput = null;
        }
    });
}

function drawText(x, y, text) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(text, x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    const link = document.createElement("a");
    link.download = "workspace.png";
    link.href = canvas.toDataURL();
    link.click();
}