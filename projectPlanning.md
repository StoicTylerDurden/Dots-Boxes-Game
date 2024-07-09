# Project Planning

## Dots and Boxes Game
![Dots & Boxes Example](https://play-lh.googleusercontent.com/_FpWyuPa574DA7eQ5D7IDrygeTxONkqT_e435p4VjEX9_Sw11huJtGcP1UHg7YRBW7s)

<br> </br>
### **User Stories**
1. As a user, I want to be able to see if it’s my turn or not so that I know when to play.

2. As a user, I want to see the line in the grid when I hover on it, so I don’t misplace the line in the grid.
3. As a user, I want to see 2 different colors for the lines placed in the grid, so I know the lines I’ve placed and my opponent placed lines.

4. As a user, I want to see the number of boxes I have and my opponent number of boxes, so that I know who’s in the lead.
 
5. As a user, I want to see a message at the end of the game that displays who’s the winner or if it’s a tie. 


### **Pseudo-code**
* Initiliaze the game variables and ask for the 2 players name
* Display a 5x5 grid/table 
    * Display who’s turn is it by name
* Display message: 
    * It displays who’s turn is it to play
    * If there’re no lines and it’s a tie “It’s a tie” 
    * If there’s a winner it displays “The winner is ‘name’"
* Setting an event listener that will get invoked whenever a line in the grid is selected
    * EventListern Hover, that displays the line when hovered between 2 dots.
    * Update displayMessage: it shows whos turn is to play
    * After each box made the message updates the # of boxes made
* Winner function
    * It calls a function called isallLineSelected
    * If isAllLinesAreSelected is true and isTie is false it will assign the winner variable to player1 or player 2
    * else return
* If game is over it displays wanna play again message and a reset button underneath the message.

