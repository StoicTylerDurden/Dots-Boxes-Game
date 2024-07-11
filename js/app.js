/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/
let square;
let squareIndex;
let squareIsFull = false;
let lineIndex; // (0, 1, 2, 3) (top, right, bottom, left)
// top, right, bottom, left
let isdoubleSquared1 = false;
let isdoubleSquared2 = false;
let scored = false;
let turn = "red"
let player1Score = 0;
let redScore = 0;
let blueScore = 0;
let win = false;
let tie = false;
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
function placeLine(squareIndex, lineIndex, turn){
    console.log("squareIndex: " + squareIndex + " lineIndex = " + lineIndex)

        // If right border is selected for a square add a right border for it and add a left border for its adjacent right square
        if(lineIndex === 1){
            squares[squareIndex][lineIndex] = turn
            
            
            // If it has a square on its left add a right border for it
            if((squareIndex+1)%3 !== 0){
                squares[squareIndex+1][lineIndex+2] = turn 

                if (squares[squareIndex+1].every(line => line !== "")) {
                    // increase ${turn} score by 1 when there're 4 borders in a square
                    // updateScore(turn)
                    // console.log(`(lineIndex === 1 turn: ${turn} redScore = ${redScore}`)
                    // console.log(`(lineIndex === 1 turn: ${turn} blueScore = ${blueScore}`)

                    squares[squareIndex+1].forEach((line, lineId )=>{
                        squares[squareIndex+1][lineId] = turn
                        
                    })
                    switchTurns()
                    isdoubleSquared1 = true
                    console.log("(lineIndex === 1) turn: " + turn)

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
                    // increase ${turn} score by 1 when there're 4 borders in a square
                    // updateScore(turn)
                    // console.log(`(lineIndex === 3 turn: ${turn} redScore = ${redScore}`)
                    // console.log(`(lineIndex === 3 turn: ${turn} blueScore = ${blueScore}`)
                    
                    squares[squareIndex-1].forEach((line, lineId )=>{
                        squares[squareIndex-1][lineId] = turn
                        
                    })
                    switchTurns()
                    isdoubleSquared1 = true
                    console.log("(lineIndex === 3) turn: " + turn)

                }

            }
        }

        // If top square and bottom square have same border assign the border for both
        else if(lineIndex === 0){
            squares[squareIndex][lineIndex] = turn

            
            if(squareIndex>=3){
            squares[squareIndex-3][lineIndex+2] = turn

                if (squares[squareIndex-3].every(line => line !== "")) {

                    // increase ${turn} score by 1 when there're 4 borders in a square
                    // updateScore(turn)
                    // console.log(`(lineIndex === 0 turn: ${turn} redScore = ${redScore}`)
                    // console.log(`(lineIndex === 0 turn: ${turn} blueScore = ${blueScore}`)
                    squares[squareIndex-3].forEach((line, lineId )=>{
                        squares[squareIndex-3][lineId] = turn
                        
                    })
                    switchTurns()
                    isdoubleSquared1 = true
                    console.log("(lineIndex === 0) turn: " + turn)

                }
            }
        }
        // If top square and bottom square have same border assign the border for both
        else if(lineIndex === 2){
            squares[squareIndex][lineIndex] = turn

            if(squareIndex<=5){
            squares[squareIndex+3][lineIndex-2] = turn

                if (squares[squareIndex+3].every(line => line !== "")) {

                    // increase ${turn} score by 1 when there're 4 borders in a square
                    // updateScore(turn)
                    // console.log(`(lineIndex === 2 turn: ${turn} redScore = ${redScore}`)
                    // console.log(`(lineIndex === 2 turn: ${turn} blueScore = ${blueScore}`)
                    squares[squareIndex+3].forEach((line, lineId )=>{
                        squares[squareIndex+3][lineId] = turn
                        
                    })
                    switchTurns()
                    isdoubleSquared1 = true
                    console.log("(lineIndex === 2) turn: " + turn)

                }
            }
        }
            // If all lines exist in the button clicked assign the ${turn} color to all borders 
            if (squares[squareIndex].every(line => line !== "")) {
                // increase ${turn} score by 1 when there're 4 borders in a square
    
                // updateScore(turn)
                // console.log(`(lineIndex === Outside turn: ${turn} redScore = ${redScore}`)
                // console.log(`(lineIndex === Outside turn: ${turn} blueScore = ${blueScore}`)
                squares[squareIndex].forEach((line, lineId )=>{
                    squares[squareIndex][lineId] = turn
                    
                })
                switchTurns()
                isdoubleSquared2 = true
                // If there's a line that will score 2 squares make it so that the player plays again
                if (isdoubleSquared1 && isdoubleSquared2){
                    console.log("(lineIndex === Weird condition turn: " + turn)
                    switchTurns()
                }
                console.log("(lineIndex === Outside) turn: " + turn)
    
            }

    squares.forEach((square, id)=>{
        console.log(`printing square= " ${id} [${square}] `);
    }
)}

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
function colorSquare(){
        // Check if every line in the 
        squares.forEach((square, squareIndex)=>{
            if (square.every(line => line === "red")) {
                cellsElements[squareIndex].style.background = `darkred`
                squareIsFull = true;

            } else if (square.every(line => line === "blue")){
                cellsElements[squareIndex].style.background = `darkblue`
                squareIsFull = true;
        }
        
    })// end forloop

    }

function updateScore(turn){
    if(turn==="red"){
        redScore +=1;

    }else if(turn==="blue"){
        blueScore +=1;
    }
    console.log("Red: " + redScore + " Blue: " + blueScore)
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
    // square that is being styled.
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

    placeLine(squareIndex, lineIndex, turn)
    checkIfSquareIsFull()
    updateBoard()
    colorSquare() //Make the front-end get colored when there're all borders
    // console.log("Red Score: " + redScore)
    // console.log("Blue Score: " + blueScore);
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
    });
