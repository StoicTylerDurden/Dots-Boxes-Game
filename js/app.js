/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/
let square;
let squareIndex;
let isGameOver = false;
let lineIndex; // (0, 1, 2, 3) (top, right, bottom, left)
let isdoubleSquared1 = false;
let isdoubleSquared2 = false;
let scored = false;
let turn = "red"
let redScore = 0;
let blueScore = 0;
let winner;
let tie = false;
let squares = [
    ["", "", "", ""], ["", "", "", ""], ["", "", "", ""],
    ["", "", "", ""], ["", "", "", ""], ["", "", "", ""],
    ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]
]


/*----- Cached Element References  -----*/
const cellsElements = document.querySelectorAll(".cell")
const messageEl = document.querySelector("#message")
const resetBtnEl = document.querySelector("#reset")
/*-------------- Functions -------------*/

function placeLine(squareIndex, lineIndex, turn){

        // If right border is selected for a square add a right border for it and add a left border for its adjacent right square
        if(lineIndex === 1){
            squares[squareIndex][lineIndex] = turn
            
            
            // If it has a square on its left add a right border for it
            if((squareIndex+1)%3 !== 0){
                squares[squareIndex+1][lineIndex+2] = turn 

                if (squares[squareIndex+1].every(line => line !== "")) {

                    squares[squareIndex+1].forEach((line, lineId )=>{
                        squares[squareIndex+1][lineId] = turn
                        
                    })
                    // Play one more time if you score a square
                    switchTurns()
                    isdoubleSquared1 = true
                }
                 
            }
        }

        // If left border is selected for a square add a left border for it and add a right border for its adjacent left square 
        else if(lineIndex === 3){
            squares[squareIndex][lineIndex] = turn

            // If it has a square on its left add a right border for it
            if(squareIndex%3 !== 0){
            squares[squareIndex-1][lineIndex-2] = turn
            
                if (squares[squareIndex-1].every(line => line !== "")) {                    
                    squares[squareIndex-1].forEach((line, lineId )=>{
                        squares[squareIndex-1][lineId] = turn
                        
                    })
                    // Play one more time if you score a square
                    switchTurns()
                    isdoubleSquared1 = true
                }

            }
        }

        // If top square and bottom square have same border assign the border for both
        else if(lineIndex === 0){
            squares[squareIndex][lineIndex] = turn

            if(squareIndex>=3){
            squares[squareIndex-3][lineIndex+2] = turn

                if (squares[squareIndex-3].every(line => line !== "")) {

                    squares[squareIndex-3].forEach((line, lineId )=>{
                        squares[squareIndex-3][lineId] = turn
                        
                    })
                    // Play one more time if you score a square
                    switchTurns()
                    isdoubleSquared1 = true
                }
            }
        }
        // If top square and bottom square have same border assign the border for both
        else if(lineIndex === 2){
            squares[squareIndex][lineIndex] = turn

            if(squareIndex<=5){
            squares[squareIndex+3][lineIndex-2] = turn

                if (squares[squareIndex+3].every(line => line !== "")) {

                    squares[squareIndex+3].forEach((line, lineId )=>{
                        squares[squareIndex+3][lineId] = turn
                        
                    })
                    // Play one more time if you score a square
                    switchTurns()
                    isdoubleSquared1 = true
                }
            }
        }
            // If all lines exist in the button clicked assign the ${turn} color to all borders 
            if (squares[squareIndex].every(line => line !== "")) {

                squares[squareIndex].forEach((line, lineId )=>{
                    squares[squareIndex][lineId] = turn
                })
                // Play one more time if you score a square
                switchTurns()
                isdoubleSquared2 = true
                // // Play one more time if you score 2 squares at the same time
                if (isdoubleSquared1 && isdoubleSquared2){
                    switchTurns()
                }
    
            }
        }
function render(){
    updateBoard()
    updateMessage()
}


function init(){

    square;
    squareIndex;
    isGameOver = false;
    lineIndex; // (0, 1, 2, 3) (top, right, bottom, left)
    isdoubleSquared1 = false;
    isdoubleSquared2 = false;
    scored = false;
    turn = "red"
    redScore = 0;
    blueScore = 0;
    winner;
    tie = false;
    squares = [
        ["", "", "", ""], ["", "", "", ""], ["", "", "", ""],
        ["", "", "", ""], ["", "", "", ""], ["", "", "", ""],
        ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]
    ]

    clearFrontEnd() // To clear all the styling and everything in front-end
    render()
}

function clearFrontEnd(){
    cellsElements.forEach(cell => {
        cell.style.borderTop = "";
        cell.style.borderRight = "";
        cell.style.borderBottom = "";
        cell.style.borderLeft = "";
        cell.style.background = "";
    });
}
        

function updateBoard(){
    // It will loop through the squares array, it will update the state for each cellElement in the front-end
    squares.forEach((square, sqrID)=>{


        square.forEach((line, lineIndex)=>{
            if (lineIndex === 0 && line!==""){
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

// Add a background color to the completed square
function colorSquare(){
    squares.forEach((square, squareIndex)=>{
        if (square.every(line => line === "red")) {
            cellsElements[squareIndex].style.background = `darkred`
            squareIsFull = true;

        } else if (square.every(line => line === "blue")){
            cellsElements[squareIndex].style.background = `darkblue`
            squareIsFull = true;
    }
    
    })// end forloop
    updateScore(); // Update the score when a square is colored
    gameOver()
}

function updateScore(){
    redScore = 0;
    blueScore = 0;

    squares.forEach(square => {
        if (square.every(line => line === "red")) {
            redScore++;
        } else if (square.every(line => line === "blue")) {
            blueScore++;
        }
    });
}

function updateMessage(){
    let message = ""
    if(isGameOver === false){
        message =`Red Score: ${redScore} Blue Score: ${blueScore}
                             
        It's ${turn} turn`;
    }
    else if(isGameOver === true){
        message = `The Winner is ${winner}!
        
        Click Reset to play another game :)`;
    }

    messageEl.innerText = message
}
function gameOver(){
    // Check if all squares are filled returns boolean
    isGameOver = squares.every(square => square.every(line => line !== ""));

    if (isGameOver) {  
        // When Game Over checkWinner
        checkWinner()
    }
     
}

function checkWinner(){
    if(isGameOver && (redScore>blueScore)){
        winner = "red"
    }
    else if(isGameOver && (redScore<blueScore)){
        winner = "blue"
    }
}


// displaOptions will be called when hovered over a cell and it will display option buttons
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

    // Adding text to buttons
    topButton.innerText = "↑"
    rightButton.innerText = "→"
    bottomButton.innerText = "↓"
    leftButton.innerText = "←"

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
        messageEl.innerText = `Red Score: ${redScore} Blue Score: ${blueScore}
                             
        There's already a line my guy`;
        return
    }

    if (winner === true) {
        return
    }

    placeLine(squareIndex, lineIndex, turn)
    updateBoard()
    colorSquare() //Make the front-end get colored when there're all borders
    switchTurns()

    render()

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
});

resetBtnEl.addEventListener("click", init);

init()