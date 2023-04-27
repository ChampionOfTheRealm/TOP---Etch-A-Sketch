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
randomColorButton.addEventListener('click', randomColorToggle)

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
}

function randomColor (e) {

    let randomRed = Math.floor(Math.random() * 255);
    let randomBlue = Math.floor(Math.random() * 255);
    let randomGreen = Math.floor(Math.random() * 255);
    let divSelected = e.target;
    let divColor = divSelected.style.backgroundColor;
    if (divColor != "black" && divColor != "white") {
        console.log(divColor);
        let newColor = divColor.slice(4, (divColor.length - 1));
        newColor = newColor.split(", ");
        let finalColor = [];
        newColor.forEach(color => {
            color = parseInt(color) - 20;
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
        let gridSize = prompt("How large would you like the grid to be?");
        if (gridSize <= 0 || gridSize > 64) {
            alert("Please input a grid size range between 1 and 64");
            gridSize = prompt("How large would you like the grid to be?");
        }
        createTable(gridSize);
    } else {
        createTable(16);
    }
}

function randomColorToggle (e) {
    let randomColorButtonToggle = e.target;
    const innerDivs = document.querySelectorAll(".innerDiv");
    if (randomColorButtonToggle.value == "off") {
        innerDivs.forEach(divInnerContainer => divInnerContainer.removeEventListener('mouseover', changeColor));
        innerDivs.forEach(divInnerContainer => divInnerContainer.addEventListener('mouseover', randomColor));
        randomColorButtonToggle.removeAttribute('value');
        randomColorButtonToggle.value = "on";
        randomColorButtonToggle.innerText = "Select Black & White Mode";
    } else if (randomColorButtonToggle.value == "on"){
        innerDivs.forEach(divInnerContainer => divInnerContainer.removeEventListener('mouseover', randomColor));
        innerDivs.forEach(divInnerContainer => divInnerContainer.addEventListener('mouseover', changeColor));
        randomColorButtonToggle.removeAttribute('value');
        randomColorButtonToggle.value = "off";
        randomColorButtonToggle.innerText = "Select Random Color Mode";
    }
}

userInputGridSize();