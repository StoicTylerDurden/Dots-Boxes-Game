/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/
let square;
let squareIndex;
let squareIsFull = false;
let lineIndex; // ["red", "blue", "red", "blue"]
// top, right, bottom, left


let turn = "red"
let redScore = 0;
let blueScore = 0;
let win = false;
let tie = false;
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
function placeLine(squareIndex, lineIndex){
    console.log("squareIndex: " + squareIndex + " lineIndex = " + lineIndex)

    for (let i=0; i<=8; i++){
        // If right border is selected for a square add a right border for it and add a left border for its adjacent left square
        if(lineIndex === 1){
            squares[squareIndex][lineIndex] = turn

            // If it has a square on its left add a right border for it
            if((squareIndex+1)%3 !== 0)
            squares[squareIndex+1][lineIndex+2] = turn  
        }

        // If left border is selected for a square add a left border for it and add a right border for its adjacent left square 
        if(lineIndex === 3){
            squares[squareIndex][lineIndex] = turn

            // If it has a square on its left add a right border for it
            if(squareIndex%3 !== 0)
            squares[squareIndex-1][lineIndex-2] = turn  
        }

        // If top square and bottom square have same border assign the border for both
        else if(lineIndex === 0){
            squares[squareIndex][lineIndex] = turn

            if(squareIndex>=3){
            squares[squareIndex-3][lineIndex+2] = turn
            }
        }
        // If top square and bottom square have same border assign the border for both
        else if(lineIndex === 2){
            squares[squareIndex][lineIndex] = turn

            if(squareIndex<=5){
            squares[squareIndex+3][lineIndex-2] = turn
            }
        }

    }// end for loop


    squares.forEach((square, id)=>{
        console.log(`printing square= " ${id} [${square}] `);
    })
    console.log("I'm inside placeLine function: squares[squareIndex]" + squares[squareIndex])
    console.log("I'm inside placeLine function: squares[squareIndex][lineIndex]"  + squares[squareIndex][lineIndex])
}

function checkIfSquareIsFull() {
    squares.forEach(square => {
        // Check if every line in the square is not empty
        if (square.every(line => line !== "")) {
            squareIsFull = true;
        } else {
            squareIsFull = false;
        }
    });
}

function updateBoard(){
    // It will loop through the squares array, it will update the state for each cellElement in the front-end
    squares.forEach((square, sqrID)=>{
        console.log("This is a square " + square)
        console.log("This is a sqrID: " + sqrID);
        console.log("This is a sqrID: " + square[sqrID]);
        console.log(cellsElements)
        square.forEach((line, lineIndex)=>{
            if (lineIndex === 0 && line!==""){
            console.log("line : " + line)
            cellsElements[sqrID].style.borderTop = `3px solid ${line}`

            } else if (lineIndex === 1 && line!==""){
            cellsElements[sqrID].style.borderRight = `3px solid ${line}`

            } else if (lineIndex === 2 && line!==""){
                cellsElements[sqrID].style.borderBottom = `3px solid ${line}`
                
            } else if (lineIndex === 3 && line!==""){
                cellsElements[sqrID].style.borderLeft = `3px solid ${line}`
            }
        })
    })   
}
// Color the square if it has all borders
function colorSquare(squareIndex){
        // Check if every line in the square is not empty
        if (squares[squareIndex].every(line => line !== "")) {
            if(turn === "red"){
            cellsElements[squareIndex].style.background = `darkred`
            redScore +=1
            squareIsFull = true;
            switchTurns()

            } else if(turn === "blue"){
            cellsElements[squareIndex].style.background = `darkblue`
            blueScore +=1
            squareIsFull = true;
            switchTurns()
            }
        }
    }

function scoring(){

}


// displaOptions will be called when hovered over a cell
function displayOptions (event){

    square = event.target;
    squareIndex = parseInt(event.target.id);

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

    // Appending all the buttons to the clicked square(event.target) as their parent
    square.appendChild(topButton)
    square.appendChild(rightButton)
    square.appendChild(bottomButton)
    square.appendChild(leftButton)

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
// Hide options when mouseout of the square
const hideOptions = (event) => {
    const square = event.target;
    const buttons = square.querySelectorAll(".button");
    buttons.forEach(button => button.remove());
};


// Add border to chosen square when a button is clicked
const addBorder = (event) => {
    // event.target.id will return the id of the clicked button. ex: top-button
    // square that is being styled.
    console.log("Current square " + square)
    console.log("Current square index: " + squareIndex)

    if(event.target.id === 'top-button')
        lineIndex = 0;

    else if(event.target.id === 'right-button')
        lineIndex = 1;

    else if(event.target.id === 'bottom-button')
        lineIndex = 2;

    else if(event.target.id === 'left-button')
        lineIndex = 3;


    // Check if there's an existing line
    if(squares[squareIndex][lineIndex] !==""){
        console.log("There's an existing line my guy");
        return
    }

    placeLine(squareIndex, lineIndex)
    checkIfSquareIsFull()
    updateBoard()
    colorSquare(squareIndex) //Make the front-end get colored 
    console.log("Red Score: " + redScore)
    console.log("Blue Score: " + blueScore);
    scoring()
    // isGameComplete()
    // isComplete()
    switchTurns()
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
    cellsElements.forEach((square) => {
        square.addEventListener("mouseenter", displayOptions);
        square.addEventListener("mouseleave", hideOptions);
        console.log("I'm the square: " + square);
    });
