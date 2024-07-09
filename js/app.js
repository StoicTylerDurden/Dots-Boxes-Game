/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/
let cell;
let cellId;

let lineIndex; // ["red", "blue", "red", "blue"]
// top, right, bottom, left


let turn = "red"
let redScore; 
let blueScore;
let win = false;
let tie = false;
let lines = ["", "", "", ""]
let squares = [
    ["", "", "", ""], ["", "", "", ""], ["", "", "", ""],
    ["", "", "", ""], ["", "", "", ""], ["", "", "", ""],
    ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]
]
console.log(squares)
/*----- Cached Element References  -----*/
const cellsElements = document.querySelectorAll(".cell")
// const topButton = document.querySelector("#top-button");
// const rightButton = document.querySelector("#right-button");
// const bottomButton = document.querySelector("#bottom-button");
// const leftButton = document.querySelector("#left-button");
// const buttons = document.querySelector('.buttons')
/*-------------- Functions -------------*/

// displaOptions will be called when hovered over a cell
function displayOptions (event){

    cell = event.target;
    cellId = event.target.id;
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
    updateBoard()

    function updateBoard(){
        squares.forEach((square)=>{

        })        
    }

}
// Hide options when mouseout of the cell
const hideOptions = (event) => {
    const cell = event.target;
    const buttons = cell.querySelectorAll(".button");
    buttons.forEach(button => button.remove());
};


// Add border to chosen cell when a button is clicked
const addBorder = (event) => {
// event.target.id will return the id of the clicked button. ex: top-button

// cell is the square that is being styled.
console.log("CurrentCell " + cell)
console.log("CurrentCell id: " + cellId)

    if (event.target.id === 'top-button') {

        // Check if the top border empty  
        if(cell.style.borderTop === ""){
            cell.style.borderTop = `3px solid ${turn}`;
            
            switchTurns()
            }
        else{
            console.log("There's already a line my guy");
        }

    } else if(event.target.id === 'right-button') {

        // Check if the right border empty  
        if(cell.style.borderRight === ""){
            cell.style.borderRight = `3px solid ${turn}`;
            
            switchTurns()
        }
        else{
            console.log("There's already a line my guy");
        }

    } else if (event.target.id === 'bottom-button') {

        // Check if the bottom border empty  
        if(cell.style.borderBottom === ""){
            cell.style.borderBottom = `3px solid ${turn}`;
            switchTurns()
        }
        else{
            console.log("There's already a line my guy");
        }
    } else if (event.target.id === 'left-button') {

        // Check if the left border empty  
        if(cell.style.borderLeft === ""){
            cell.style.borderLeft = `3px solid ${turn}`;
            switchTurns()
        }
        else{
            console.log("There's already a line my guy");
        }
    }

    // isComplete()
    // switchTurns()
    // render() which has two functions (updateBoard), updateMessage "Making the front-end same as backend (JS)"
};

const switchTurns = ()=>{
    if(turn==="red"){
        turn = "blue"
    }
    else if(turn === "blue"){
        turn = "red"
    }
}

/*----------- Event Listeners ----------*/
    cellsElements.forEach((cell) => {
        cell.addEventListener("mouseenter", displayOptions);
        cell.addEventListener("mouseleave", hideOptions);
        console.log("I'm the cell: " + cell);
    });
