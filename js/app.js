/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/
let cell;

// top, right, bottom, left
let squares = [
    ["", "", "", ""], ["", "", "", ""], ["", "", "", ""],
    ["", "", "", ""], ["", "", "", ""], ["", "", "", ""],
    ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]
]
/*----- Cached Element References  -----*/
const cellsElements = document.querySelectorAll(".cell")
// const topButton = document.querySelector("#top-button");
// const rightButton = document.querySelector("#right-button");
// const bottomButton = document.querySelector("#bottom-button");
// const leftButton = document.querySelector("#left-button");
// const buttons = document.querySelector('.buttons')
/*-------------- Functions -------------*/
const displayOptions = (event)=>{

    cell = event.target;
    console.log("I'm current cell inside displayOptions " + cell.id);


    const topButton = document.createElement('button')
    const rightButton = document.createElement('button')
    const bottomButton = document.createElement('button')
    const leftButton = document.createElement('button')

    // Assigning all the buttons to a className = "button" 
    topButton.className = "button"
    rightButton.className = "button"
    bottomButton.className = "button"
    leftButton.className = "button"

    // Assigning an id to each button
    topButton.id = "top-button"
    rightButton.id = "right-button"
    bottomButton.id = "bottom-button"
    leftButton.id = "left-button"

    topButton.innerText = "top"
    rightButton.innerText = "right"
    bottomButton.innerText = "bottom"
    leftButton.innerText = "left"

    // Appending all the buttons to the clicked cell(event.target) as their parent
    cell.appendChild(topButton)
    cell.appendChild(rightButton)
    cell.appendChild(bottomButton)
    cell.appendChild(leftButton)

    // Initially the buttons are hidden so the following will make them visible
    topButton.style.display = 'block';
    rightButton.style.display = 'block';
    bottomButton.style.display = 'block';
    leftButton.style.display = 'block';



    // Event listeners to each button so that it adds the specified border
    topButton.addEventListener("click", addBorder);
    rightButton.addEventListener("click", addBorder);
    bottomButton.addEventListener("click", addBorder);
    leftButton.addEventListener("click", addBorder);


}

// Modify the hideOptions function later
const hideOptions = (event) => {
    const cell = event.target;
    const buttons = cell.querySelectorAll(".button");
    buttons.forEach(button => button.remove());
};

const addBorder = (event) => {
    // event.target.id will return the id of the clicked button. ex: top-button
    console.log("CurrentCell " + cell)
    console.log("currentCell id: " + cell.id)

    if (event.target.id === 'top-button') {
        cell.style.borderTop = "3px solid black";
    } else if (event.target.id === 'right-button') {
        cell.style.borderRight = "3px solid black";
    } else if (event.target.id === 'bottom-button') {
        cell.style.borderBottom = "3px solid black";
    } else if (event.target.id === 'left-button') {
        cell.style.borderLeft = "3px solid black";
    }

};


/*----------- Event Listeners ----------*/
    cellsElements.forEach((cell) => {
        cell.addEventListener("mouseenter", displayOptions);
        cell.addEventListener("mouseout", hideOptions);
        console.log("I'm the cell: " + cell);
    });
