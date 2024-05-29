// Start the game with the player being first:
let activePlayer = 'X';

// Store an array of moves to determine who wins:
let selectedSquares = [];


// A function for playing sounds:
function audio(audioURL) {
    let audio = new Audio(audioURL);
    audio.play();
}


// A function to reset the game after a tie or win:
function resetGame() {
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i));
        // Delete the image:
        square.style.backgroundImage = ' ';
    }

    // Empty the array to reset it:
    selectedSquares = [];
}



// ============================================================
// Use the HTML canvas to draw lines thru winning combinations:
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById('win-lines');
    const c = canvas.getContext('2d');

    // Set the start of the x axis of the line:
    let x1 = coordX1,

        // Set the start of the y axis of the line:
        y1 = coordY1,

        // Set the end of the X axis:
        x2 = coordX2,

        // Set the end of the Y axis:
        y2 = coordY2,

        x = x1,
        y = y1;



    function animateLineDrawing() {
        const animationLoop = requestAnimationFrame(animateLineDrawing);

        // Clear content from the last loop iteration:
        c.clearRect(0,0,608,608)

        // Start a new path:
        c.beginPath();

        // Move to the starting point of the line:
        c.moveTo(x1, y1);

        // Specify the ending point of the line:
        c.lineTo(x, y);

        // Set the width of the line:
        c.lineWidth = 10;

        // Set the color of the line:
        c.strokeStyle = 'rgb(0,0,0)';


        c.stroke();

        if (x1 <= x2 && y1 <= y2) {
            if (x < x2) {x += 10;}
            if (y < y2) {y += 10;}
            if (x >= x2 && y >= y2) {cancelAnimationFrame(animationLoop);}
        }

        // Account for a rising diagonal win:
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) {x += 10;}
            if (y > y2) {y -= 10;}
            if (x >= x2 && y <= y2) {cancelAnimationFrame(animationLoop);}
        }
    }

    // Clear the canvas after the winning line is drawn:
    function clear() {
        const animationLoop = requestAnimationFrame(clear);
        c.clearRect(0, 0, 608, 608);
        cancelAnimationFrame(animationLoop);
    }

    // Call winning line sequence:
    disableClick();
    animateLineDrawing();
    audio('./media/winGame.mp3');
    setTimeout(function () { clear(); resetGame(); }, 3000);

}



// =============================

// Check whether anyone has won:
function checkWinConditions() {

    // Check for a horizontal line of either all Xs or all Os across the TOP row. Draw a line if there is:
    if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) }
    else if (arrayIncludes('0O', '1O','2O')) {drawWinLine(50, 100, 558, 100)}

    // Check for a horizontal line of either all Xs or all Os across the MIDDLE row. Draw a line if there is:
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304) }
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304) }

    // Check for a horizontal line of either all Xs or all Os across the BOTTOM row. Draw a line if there is: 
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508) }
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508) }

    // Check for a vertical line of either all Xs or all Os down the FIRST column. Draw a line if yes:
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558) }
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558) }

    // Check for a vertical line of either all Xs or all Os down the SECOND column. Draw a line if yes:
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558) }
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558) }

    // Check for a vertical line of either all Xs or all Os down the THIRD column. Draw a line if yes:
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558) }
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558) }

    // Check for a FALLING diagonal line of all Xs or all Os. Draw a line if so:
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520) }
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520) }

    // Check for a RISING diagonal line of all Xs or all Os. Draw a line if so:
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90) }
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90) }

    // The game is tied, if none of the above conditions are met but all 9 squares have been selected:
    else if (selectedSquares.length >= 9) {
        audio('./media/tie.mp3');
        alert('You tied!');
        // Reset the game:
        setTimeout(function () { resetGame(); }, 2000);
    }

    // Check for 3 strings in the array to check for each winning condition:
    function arrayIncludes(squareA, squareB, squareC) {
        // Check for 3 in a row:
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        // if so, then execute the drawLine() function:
        if (a === true && b === true && c === true) {return true;}
    }
}


// ======================================================================================

// Temporarily disable the player's ability to click so that the computer can have a turn
function disableClick() {
    body.style.pointerEvents = 'none';
    setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1500);
}


// =================================================================================================

function place_X_or_O(spaceNumber) {
    // Check whether the square has already been selected before, using .some method to check the array for the space number
    if (!selectedSquares.some(element => element.includes(spaceNumber))) {

        // Retrieve the HTML element id that was clicked on:
        let select = document.getElementById(spaceNumber);

        // Place the current player's mark inside the square:
        if (activePlayer === 'X') {
            select.style.backgroundImage = 'url("images/x.png")';
        }
        else {
            select.style.backgroundImage = 'url("images/o.png")';
        }

        // Log the activePlayer and the selected square into the array:
        selectedSquares.push(spaceNumber + activePlayer);

        // Check whether anyone has won:
        checkWinConditions();

        // Change which player's turn it is:
        if (activePlayer === 'X') {
            activePlayer = 'O';
        }
        else {
            activePlayer = 'X';
        }

        // Play sound effect:
        audio('./media/place.mp3');

        // If it is the computer's turn, disable clicking and pause:
        if (activePlayer === 'O') {
            disableClick();
            setTimeout(function () { computersTurn(); } , 1000);
        }
        return true;
    }


    // Have the computer chose a square at random on its turn:
    function computersTurn() {
        let success = false;
        let pickASquare;
        while (!success) {
            // Choose a random number between 0 and 8 to select that square:
            pickASquare = String(Math.floor(Math.random() * 9));

            // Check whether the square has been selected already and if not, then place the O mark there:
            if(place_X_or_O(pickASquare)) {
                place_X_or_O(pickASquare);
                success = true;
            };
        }
    }
}