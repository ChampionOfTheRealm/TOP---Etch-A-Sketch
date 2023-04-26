//The Odin Project - Etch-A-Sketch
const body = document.querySelector('body');
const div = document.createElement('div');
const button = document.createElement('button');

const buttonContainer = body.appendChild(div);
buttonContainer.classList.add('button-container')
const gridButton = buttonContainer.appendChild(button);
gridButton.classList.add('grid-button');


//get user input a create a X * X sized table
function createTable(gridSize = prompt("How large would you like the grid to be?")) {
    
    const table = document.createElement('table');
    const tableRow = document.createElement('tr');
    const tableDate = document.createElement('td');

    const gridContainer = buttonContainer.insertAdjacentElement("afterend", div);
22
    //divContainer.classList.add("container");
    
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
    innerDivs.forEach(divInnerContainer => divInnerContainer.addEventListener('click', changeColor));
    
}

//Change the color of divs in the grid based on user input
function changeColor(e) {
    let divSelected = e.target;
    let divSelectedColor = e.target.style.backgroundColor;
    if (divSelectedColor == 'black') {
        divSelected.style.backgroundColor = 'white';
    } else if (divSelectedColor == 'white') {
        divSelected.style.backgroundColor = 'black';
    } 
}

createTable();