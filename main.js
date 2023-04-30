//The Odin Project - Etch-A-Sketch
const body = document.querySelector('body');
const div = document.createElement('div');
const button = document.createElement('button');
const titleGridContainer = document.querySelector('.title-grid-container');

const gridContainer = titleGridContainer.appendChild(div);
gridContainer.classList.add('grid-container');

const gridButton = document.querySelector('.grid-button');
gridButton.addEventListener('click', userInputGridSize);

const randomColorButton = document.querySelector('#random-color-button');
randomColorButton.addEventListener('click', randomColorToggle);

const eraserButton = document.querySelector("#eraser");
eraserButton.addEventListener('click', eraserToggle);

const clearGridButton = document.querySelector('#clear-grid');
clearGridButton.addEventListener('click', clearGrid);

const playgameContainer = document.querySelector('.playgame-container')
const playgameButton = document.querySelector('#game');
playgameButton.addEventListener('click', playgame);

let currentMode = "";
let gridSize = 16;

//get user input a create a X * X sized table
function createTable(gridSize) {
    
    for (j = 0; j < gridSize; j++) {
        const outterDivs = document.createElement('div');
        gridContainer.appendChild(outterDivs);
        outterDivs.classList.add("outterDivs");
        for (i = 0; i < gridSize; i++) {
            const innerDiv = document.createElement('div');
            outterDivs.appendChild(innerDiv);
            innerDiv.classList.add("innerDiv");
            innerDiv.style.backgroundColor = 'white';
        }
    }
    const innerDivs = document.querySelectorAll(".innerDiv");
    innerDivs.forEach(divInnerContainer => divInnerContainer.addEventListener('mouseover', changeColor));
    currentMode = "changeColor";
}

function randomColor (e) {

    let randomRed = Math.floor(Math.random() * 255);
    let randomBlue = Math.floor(Math.random() * 255);
    let randomGreen = Math.floor(Math.random() * 255);
    let divSelected = e.target;
    let divColor = divSelected.style.backgroundColor;
    if (divColor != "black" && divColor != "white") {
        let newColor = divColor.slice(4, (divColor.length - 1));
        newColor = newColor.split(", ");
        let finalColor = [];
        newColor.forEach(color => {
            color = parseInt(color) - 25;
            finalColor.push(color); 
        });
        let result = finalColor.toString();
        result = finalColor.join(", ");
        result = "rgb(" + finalColor + ")";
        divSelected.style.backgroundColor = result;
    } else {
        divSelected.style.backgroundColor = `rgb(${randomRed},${randomGreen},${randomBlue})`;
    }
}

//Change the color of divs in the grid based on user input
function changeColor(e) {
    let divSelected = e.target;
    let divSelectedColor = e.target.style.backgroundColor;
    if (divSelectedColor != 'white') {
        divSelected.style.backgroundColor = 'white';
    } else if (divSelectedColor != 'black') {
        divSelected.style.backgroundColor = 'black';
    } 
}

function userInputGridSize (e) {

    if (e) {
        gridContainer.innerHTML = "";
        gridSize = prompt("How large would you like the grid to be?");
        if (gridSize <= 0 || gridSize > 64) {
            alert("Please input a grid size range between 1 and 64");
            gridSize = prompt("How large would you like the grid to be?");
        }
        createTable(gridSize);
    } else {
        createTable(gridSize);
    }
}

function randomColorToggle (e) {
    let randomColorButtonToggle = e.target;
    const innerDivs = document.querySelectorAll(".innerDiv");
    if (randomColorButtonToggle.value == "off") {
        randomColorButtonToggle.removeAttribute('value');
        randomColorButtonToggle.value = "on";
        randomColorButtonToggle.innerText = "Select Black & White Mode";
    } else if (randomColorButtonToggle.value == "on"){
        randomColorButtonToggle.removeAttribute('value');
        randomColorButtonToggle.value = "off";
        randomColorButtonToggle.innerText = "Select Random Color Mode";

    }

    if (currentMode == "randomColor") {
        innerDivs.forEach(divInnerContainer => divInnerContainer.removeEventListener('mouseover', randomColor));
        innerDivs.forEach(divInnerContainer => divInnerContainer.addEventListener('mouseover', changeColor));
        currentMode = "changeColor";

    } else if (currentMode == "eraser") {
        innerDivs.forEach(divInnerContainer => divInnerContainer.removeEventListener('mouseover', eraser));
        innerDivs.forEach(divInnerContainer => divInnerContainer.addEventListener('mouseover', randomColor));
        currentMode = "randomColor";
        eraserButton.removeAttribute('value');
        eraserButton.value = "off";
        eraserButton.innerText = "Toggle Eraser (OFF)";
        eraserButton.style.backgroundColor = "black";
        eraserButton.style.color = "white";
        eraserButton.style.borderColor = "white";
    } else if (currentMode == "changeColor") {
        innerDivs.forEach(divInnerContainer => divInnerContainer.removeEventListener('mouseover', changeColor));
        innerDivs.forEach(divInnerContainer => divInnerContainer.addEventListener('mouseover', randomColor));
        currentMode = "randomColor";
    }
}

function eraserToggle (e) {
    let target = e.target;
    const innerDivs = document.querySelectorAll(".innerDiv");
    if (target.value == "off") {
        target.removeAttribute('value');
        target.value = "on";
        target.innerText = "Toggle Eraser (ON)";
        target.style.backgroundColor = "white";
        target.style.color = "black";
        target.style.borderColor = "black";
    } else if (target.value == "on"){
        target.removeAttribute('value');
        target.value = "off";
        target.innerText = "Toggle Eraser (OFF)";
        target.style.backgroundColor = "black";
        target.style.color = "white";
        target.style.borderColor = "white";
    }

    if (currentMode == "eraser") {
        innerDivs.forEach(divInnerContainer => divInnerContainer.removeEventListener('mouseover', eraser));
        innerDivs.forEach(divInnerContainer => divInnerContainer.addEventListener('mouseover', changeColor));
        currentMode = "changeColor";
    } else if (currentMode == "randomColor") {
        innerDivs.forEach(divInnerContainer => divInnerContainer.removeEventListener('mouseover', randomColor));
        innerDivs.forEach(divInnerContainer => divInnerContainer.addEventListener('mouseover', eraser));
        randomColorButton.removeAttribute('value');
        randomColorButton.value = "off";
        randomColorButton.innerText = "Select Random Color Mode";
        currentMode = "eraser";
    } else if (currentMode == "changeColor") {
        innerDivs.forEach(divInnerContainer => divInnerContainer.removeEventListener('mouseover', changeColor));
        innerDivs.forEach(divInnerContainer => divInnerContainer.addEventListener('mouseover', eraser));
        currentMode = "eraser";   
    }
}

function eraser (e) {
    let target = e.target;
    target.style.backgroundColor = "white";
}

function clearGrid () {
    const innerDiv = document.querySelectorAll(".innerDiv")
    innerDiv.forEach(div => div.style.backgroundColor = "white");
}

function playgame() {
    playgameContainer.innerHTML = "";
    let gameArray = [];

    

    for (j = 0; j < gridSize; j++) {
        const outterDivs = document.createElement('div');
        playgameContainer.appendChild(outterDivs);
        outterDivs.classList.add("outterDivs2");
        for (i = 0; i < gridSize; i++) {
            const innerDiv2 = document.createElement('div');
            outterDivs.appendChild(innerDiv2);
            innerDiv2.classList.add(`innerDiv2`);
            innerDiv2.value = `${j},${i}`
            //innerDiv.setAttribute
            innerDiv2.innerText = `${j},${i}`
            innerDiv2.style.backgroundColor = 'white';
            gameArray.push(`${j}${i}`);
        }
    }
    const innerDivs = document.querySelectorAll(".innerDiv2");
    let divSelectorA = 0;
    let divSelectorB = 0;
    let randomSelector = 0;
    while(divSelectorA <= gridSize-1 || divSelectorB <= gridSize-1){
        randomSelector = Math.ceil(Math.random() * 2);
        if (randomSelector == 1) {
            divSelectorA += 1;
        } else if (randomSelector == 2) {
            divSelectorB += 1;
        }
        innerDivs.forEach (div => {
            if (div.value == `${divSelectorA},${divSelectorB}`) {
                div.style.backgroundColor = "black";
            }
        });
    }
}

userInputGridSize();