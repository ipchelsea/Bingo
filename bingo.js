/**
 * B-I-N-G-O
 *
 * A Bingo card contain 25 squares arranged in a 5x5 grid (five columns
 * and five rows). Each space in the grid contains a number between 1
 * and 75. The center space is marked "FREE" and is automatically filled.
 *
 * As the game is played, numbers are drawn. If the player's card has
 * that number, that space on the grid is filled.
 *
 * A player wins BINGO by completing a row, column, or diagonal of filled
 * spaces.
 *
 * Your job is to complete the function that takes a bingo card and array
 * of drawn numbers and return 'true' if that card has achieved a win.
 *
 * A bingo card will be 25 element array. With the string 'FREE' as the
 * center element (index 12). Although developers are unscrupulous, they
 * will pass valid data to your function.
 */

 /*
NAME : CHELSEA IP TZE HWAN
 */



/*
checkForBingo()
Main logic is here -
1) If the list of drawn numbers matches any index values of the bingoCard,
then proceed to creating an array! 

2)Checks if length of numbers = 4 or 5 --
 Here we check for edge cases such as left to right diagonal,
 right to left diagonal, middle, vertical columns and horizontal rows.
*/
function checkForBingo (bingoCard, drawnNumbers) {
    console.log('Drawn Numbers: ' + JSON.stringify(drawnNumbers));
    let winningCoordinates = [ ]; //create an array
  
    for (let i=0, len=bingoCard.length; i<len; i++)
    {
      let row = Math.floor(i/5);
      let col = i % 5;
      
      for(j = 0; j < len; j++){
        if (bingoCard[i] === drawnNumbers[j])
        {
          winningCoordinates.push({row,col});
            }
          }
        }
        console.log(winningCoordinates);
        if(drawnNumbers.length === 4 || drawnNumbers.length === 5) //checks if contains FREE or whether all matches list of drawn numbers
        {
            let winOrLose = checkMiddle(winningCoordinates); //checks the middle values with FREE in the middle
            if (winOrLose !== true) //check if bingo is at diagonal, row or at column
            {
                 winningCoordinates.pop({row: 2, col: 2}); //removed the added 2,2  to check diagonally
                 winOrLose = checkDiagonal(winningCoordinates);
                 if(winOrLose != true) //if it is not diagonal, check if bingo is located in any column or rows
                 {
                    winOrLose = checkCols(winningCoordinates);
                    winOrLose = checkRows(winningCoordinates);
                 }
            }
            console.log(winOrLose);
            return true;
          
        }
         console.log("false");
         return false;
         
  }
  
  /*
  CheckCols compares values passed in with the array's
  column. Increments each time, the same row and column
  value is found. Even though numGuesses may not be 5.
  we need to check if there is a  FREE in the middle 
  - which explains the checkMiddle method called inside.
  */
  function checkCols(winningCoordinates)
  { 
     let numGuesses = 0;
     
     const colNum = [0, 1, 2, 3, 4];
     for(i = 0; i < winningCoordinates.length; i++)
     {
           if(colNum.includes(winningCoordinates[i].col))
           {
             let colNumber = winningCoordinates[i].col;
             let tempIndex = i;
             while(tempIndex < winningCoordinates.length) {
               if(colNumber === winningCoordinates[tempIndex].col) {
                 numGuesses++;
               }
               tempIndex++;
             }
  
             if(numGuesses != 5) //if the length is < 5
             {    
                  checkMiddle(winningCoordinates); //check whether 3rd vertical column hits bingo
                  numGuesses = 0;
                  return false;
              
             } 
            else 
            {
              return numGuesses === 5;
            }
          }
       
     }
  }
  
 /*
  CheckRows compares values passed by the user with the array's
  row values. Increments each time, the same row and column
  value is found. Even though numGuesses may not be 5.
  we need to check if there is a  FREE in the middle 
  - which explains the checkDiagonal method called inside.
  */
  function checkRows(winningCoordinates){
    let numberOfCorrect = 0;
    let rowIndex = 0;
    const rowNumbers = [0, 1, 2, 3, 4];
    for (i = 0; i < winningCoordinates.length; i++){
      if(rowNumbers.includes(winningCoordinates[i].row)){
        let rowNumber = winningCoordinates[i].row;
        let tempIndex = i;
        while(tempIndex < winningCoordinates.length){
          if(rowNumber === winningCoordinates[tempIndex].row){
            numberOfCorrect++;
          }
          tempIndex++;
        }
      //return false if check all edge cases 
        if(numberOfCorrect != 5) { 
          checkDiagonal(winningCoordinates);
          numberOfCorrect = 0;
          return false;
        } 
        else 
        {
          return numberOfCorrect === 5;
        }
      }
    }
  }
  
  /*
  CheckMiddle function checks the middle row as well as the middle column,
  it automatically inserts row:2 and col:2 if list of drawn numbers < 5.
  Finally, compares all row and col values -- increments each time it matches
  */
  function checkMiddle (winningCoordinates) {
  
    winningCoordinates.push({row: 2, col: 2});
     
    let numberOfCorrect = 0;
      const middleLine = [
        {row: 0, col: 2},
        {row: 1, col: 2},
        {row: 2, col: 2},
        {row: 3, col: 2},
        {row: 4, col: 2}
      ];
      
      const horizontalMid = [
        {row: 2, col: 0},
        {row: 2, col: 1},
        {row: 2, col: 2},
        {row: 2, col: 3},
        {row: 2, col: 4}
      ]
  
      for(i = 0; i < winningCoordinates.length; i++){
        for(j = 0; j < 5; j++){
  
          //console.log(winningCoordinates[i].row, middleLine[j].row);
          //console.log(winningCoordinates[i].col, middleLine[j].col);
          if((winningCoordinates[i].row === middleLine[j].row) && (winningCoordinates[i].col === middleLine[j].col)){
            numberOfCorrect++;
  
          } else if ((winningCoordinates[i].row === horizontalMid[j].row) && (winningCoordinates[i].col === horizontalMid[j].col)){
            numberOfCorrect++;
          }
      }
    }
    return numberOfCorrect === 5;
  }
  
  function checkDiagonal (winningCoordinates){
    winningCoordinates.push({row: 2,col: 2}); //check for FREE
  
    let numberOfCorrect = 0;
      const leftToRight = [
      {row: 0, col: 0},
      {row: 1, col: 1},
      {row: 2, col: 2},
      {row: 3, col: 3},
      {row: 4, col: 4}
      ];
    const rightToLeft = [
      {row: 0, col: 4},
      {row: 1, col: 3},
      {row: 2, col: 2},
      {row: 3, col: 1},
      {row: 4, col: 0}
    ]
   
    for(i = 0; i < winningCoordinates.length; i++){
      for(j = 0; j < 5; j++){
        //console.log(winningCoordinates[i].row, leftToRight[j].row);
        if((winningCoordinates[i].row === leftToRight[j].row) && (winningCoordinates[i].col === leftToRight[j].col)){
          numberOfCorrect++;
        } else if ((winningCoordinates[i].row === rightToLeft[j].row) && (winningCoordinates[i].col === rightToLeft[j].col)){
          numberOfCorrect++;
        }
      }
    }
    return numberOfCorrect === 5;
  }
  
  module.exports = checkForBingo;
  
  function GUI()
  {
      console.log(" ------------------------- ");
      console.log(" ///////////////////////// ");                      
      console.log(" |   _                _  | ");
      console.log(" |  | |  PLAY BINGO  | | | ");
      console.log(" |   -                -  | ");
      console.log(" |       (--------)      | ");
      console.log(" |                       | ");
      console.log(" -------------------------  ");

      console.log( "Edge Cases");
      
  }
  
  GUI();
  // this should return true with diagonal + free
  checkForBingo(
    [
      8, 29, 35, 54, 65,
      13, 24, 44, 48, 67,
      9, 21, 'FREE', 59, 63,
      7, 19, 34, 53, 61,
      1, 20, 33, 46, 72
    ],
    [
      8, 24, 53, 72
    ]
  );
  
  checkForBingo(
    [
     1, 29, 35, 54, 65,
     3, 24, 44, 48, 67,
     9, 21, 'FREE', 59, 63,
     7, 19, 34, 53, 61,
     1, 20, 33, 46, 72
    ],
    [
      35, 44, 34, 33
    ]
  );
  
  
  // this should return false
  checkForBingo(
    [
     8, 29, 35, 54, 65,
     13, 24, 44, 48, 67,
     9, 21, 'FREE', 59, 63,
     7, 19, 34, 53, 61,
     1, 20, 33, 46, 72
    ],
    [
      1, 33, 53, 65, 29, 75
    ]
  );
  
  
  checkForBingo(
    [
      8, 29, 35, 54, 65,
      13, 24, 44, 48, 67,
      9, 21, 'FREE', 59, 63,
      7, 19, 34, 53, 61,
      1, 20, 33, 46, 72
    ],
    [
       1, 20, 33, 46, 99
    ]
  );
  

  checkForBingo(
    [
      8, 29, 35, 54, 65,
      13, 24, 44, 48, 67,
      9, 21, 'FREE', 59, 63,
      7, 19, 34, 53, 61,
      1, 20, 33, 46, 72
    ],
    [
       0, 0, 0, 0, 0
    ]
  );
  
  checkForBingo(
    [
      8, 29, 35, 54, 65,
      13, 24, 44, 48, 67,
      9, 21, 'FREE', 59, 63,
      7, 19, 34, 53, 61,
      1, 20, 33, 46, 72
    ],
    [
       65, 48, 19, 1
    ]
  );