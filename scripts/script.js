let numSquares = 16;
let color = "black";
let brushToggle = true;
const screen = document.querySelector(".screen");
document.addEventListener("keydown", toggleBrush);

const colorChoices = document.querySelector("form");
colorChoices.addEventListener("change", changeColor);
const black = document.querySelector("input[value = 'black']");
const random = document.querySelector("input[value = 'random']");
const custom = document.querySelector("input[value = 'custom']");

createScreen(numSquares);

const button = document.getElementById("brushSize");
button.addEventListener("click", checkNumSquare);
const shakeBtn = document.getElementById("shake");
shakeBtn.addEventListener("click", () => createScreen(numSquares));
const customColor = document.getElementById("colorPicker");
customColor.addEventListener("change", changeColor);

function createScreen(gridSize) {

    removeGrid();

    const grid = document.createElement("div");
    grid.classList.add("grid");

    grid.style.display = "grid";
    grid.style.height = "100%";
    grid.style.width = "100%";
    grid.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";
    grid.style.gridTemplateRows = "repeat(" + gridSize + ", 1fr)";
    grid.style.gap = "0";

    for (let i = 0; i < gridSize * gridSize;  i++) {
        let square = document.createElement("div");
        square.classList.add("square");

        grid.appendChild(square);
    }

    grid.addEventListener("mouseover", changeColor);
    
    screen.appendChild(grid);
}

function removeGrid() {
    if (screen.querySelector(".grid") != null) {
        let oldGrid = screen.querySelector(".grid");
        screen.removeChild(oldGrid);
    }
    return;
}

function toggleBrush (e) {
    if (e.keyCode == "67") {
        brushToggle = !(brushToggle);
    }
}

function changeColor(e) {

    if(brushToggle == false) {return;}

    if (black.checked) {
        color = "black";
    } else if (random.checked) {
        color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    } else if(custom.checked) {
        color = customColor.value;
    }

    if (e.target.type == "radio" || e.target.type == "color") {return;}
    if (e.toElement.style.backgroundColor == "black" && black.checked) {return;} //some bug going on where all squares bg colour turns black, not sure if this fixes it. It rarely happens

    if (e.toElement.classList == "square") {
        e.toElement.style.backgroundColor = color; // fix bug by checking to make sure the square is the selected element
    }
    
}

function checkNumSquare(e) {

    numSquares = prompt("How many pixels do you want to paint? (1-100)");

    if (isNaN(numSquares)) {
        alert("Enter a number pls!");
        return;
    }

    if (numSquares > 100 || numSquares < 1) {
        alert("Enter a proper num pls (within 1-100)");
        return;
    }

    return createScreen(numSquares);
}