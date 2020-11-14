var boardArray;
var gameOver;
var toAcceptUserInput;

window.onload = function() {
    initialization();
}

function getBoardElement(line, one) // 0-2
{
    var board = document.getElementById("board");
    var theLine = board.childNodes[line];
    var theOne = theLine.childNodes[one];
    return theOne;
}

function genBoard()
{
    var board = document.getElementById("board");

    for (var line = 0; line <= 2; line++)
    {
        var theLine = document.createElement("tr");
        for (var one = 0; one <= 2; one++)
        {
            var idString = "line"+line+"one"+one;
            var theOne = document.createElement("td");
            theOne.setAttribute("id" , idString);
            theOne.setAttribute("onclick", "cellPressed(" + line + ", " + one + ")");
            theLine.append(theOne);
        }
        board.append(theLine);
    }
}

function genBoardArray()
{
    boardArray = new Array();
    for (var whichLine = 0; whichLine < 3; whichLine++)
    {
        boardArray[whichLine] = new Array();
        for (var whichOne = 0; whichOne < 3; whichOne++)
        {
            boardArray[whichLine][whichOne] = 0;
        }
    }
}

function initialization()
{
    genBoard();
    genBoardArray();
    gameOver = false;
    toAcceptUserInput = true;
}



function cellPressed(line, one)
{
    if (gameOver == false && toAcceptUserInput == true)
    {
        toAcceptUserInput = false;
        updateArray(line, one);
        toAcceptUserInput = true;
    }
}

function updateArray(line, one)
// Human player gets blue, computer gets red
{
    var humansTurnResult = humansTurn(line, one);
    if (checkGameToExit())
    {
        gameOver = true;
        return;
    }
    if (humansTurnResult)
        computersTurn();
    if (checkGameToExit())
        gameOver = true;;
}

function humansTurn(line, one)
{
    // The human's turn
    var theOne = getBoardElement(line, one);
    if (boardArray[line][one] == 0)
    {
        theOne.setAttribute("style", "background:skyblue;");
        boardArray[line][one] = 1;
        return true;
    }
    return false;
}

function computersTurn()
{
    // The computer's turn
    while (true)
    {
        var number = Math.round(Math.random() * 10);
        if (number > 9 || number < 1)
        {
            continue;
        }
        var whichLine, whichOne;
        whichLine = Math.ceil(number / 3) - 1;
        whichOne = number % 3;
        if (boardArray[whichLine][whichOne] != 1 && boardArray[whichLine][whichOne] != 2)
        {
            boardArray[whichLine][whichOne] = 2;
            var theOne = getBoardElement(whichLine, whichOne);
            theOne.setAttribute("style", "background:crimson;");
            break;
        }
    }
}

function checkGameToExit()
{
    
    // Check row win
    var whoWin = 0; // 1 for player, 2 for computer, 0 for undefined winning, -1 for wrong
    for (var whichLine = 0; whichLine < 3; whichLine++)
    {
        whoWin = 0;
        for (var whichOne = 1; whichOne < 3; whichOne++)
        {
            if (boardArray[whichLine][whichOne] != boardArray[whichLine][whichOne - 1])
            {
                whoWin = -1;
            }
        }       
        if (whoWin != -1)
        {
            whoWin = boardArray[whichLine][0];
            if (whoWin != 0)
            {
                break;
            }
        }
    }
    console.log("ROW: " + whoWin);
    var string = "";
    for (var a = 0; a < 3; a++)
    {
        for (var b = 0; b < 3; b++)
        {
            string += boardArray[a][b] + " ";
        }
        string += "\n";
    }
    console.log(string);
    console.log();

    // display row win
    if (whoWin == 1 )
    {
        alert("You win!");
        return true;
    } else if (whoWin == 2)
    {
        alert("You Lost!");
        return true;
    }

    // Check col win
    whoWin = 0; // 1 for player, 2 for computer, 0 for undefined winning, -1 for wrong
    for (var whichOne = 0; whichOne < 3; whichOne++)
    {
        whoWin = 0;
        for (var whichLine = 1; whichLine < 3; whichLine++)
        {
            if (boardArray[whichLine][whichOne] != boardArray[whichLine - 1][whichOne])
            {
                whoWin = -1;
            }
        }       
        if (whoWin != -1)
        {
            whoWin = boardArray[0][whichOne];
            if (whoWin != 0)
            {
                break;
            }
        }
    }
    console.log("COL: " + whoWin);
    var string = "";
    for (var a = 0; a < 3; a++)
    {
        for (var b = 0; b < 3; b++)
        {
            string += boardArray[a][b] + " ";
        }
        string += "\n";
    }
    console.log(string);
    console.log();

    // display col win
    if (whoWin == 1 )
    {
        alert("You win!");
        return true;
    } else if (whoWin == 2)
    {
        alert("You Lost!");
        return true;
    }

    // Check diagonal
    whoWin = 0;
    for (var whichLine = 1; whichLine < 3; whichLine++)
    {
        var whichOne = whichLine;
        if (boardArray[whichLine][whichOne] != boardArray[whichLine - 1][whichOne - 1])
        {
            whoWin = -1;
        }
    }
    if (whoWin != -1)
    {
        whoWin = boardArray[0][0];
    }
    // display diagonal win
    if (whoWin == 1 )
    {
        alert("You win!");
        return true;
    } else if (whoWin == 2)
    {
        alert("You Lost!");
        return true;
    }

    // Check reverse diagonal
    whoWin = 0;
    for (var whichLine = 1; whichLine < 3; whichLine++)
    {
        var whichOne = 2 - whichLine;
        if (boardArray[whichLine][whichOne] != boardArray[whichLine - 1][whichOne + 1])
        {
            whoWin = -1;
        }
    }
    if (whoWin != -1)
    {
        whoWin = boardArray[2][0];
    }
    // display reverse diagonal win
    if (whoWin == 1 )
    {
        alert("You win!");
        return true;
    } else if (whoWin == 2)
    {
        alert("You Lost!");
        return true;
    }

    // Check Tie
    var counter = 0;
    for (var whichLine = 0; whichLine < 3; whichLine++)
    {
        for (var whichOne = 0; whichOne < 3; whichOne++)
        {
            if (boardArray[whichLine][whichOne] != 0)
            {
                counter++;
            }
        }
    }
    if (counter == 9)
    {
        alert("It's a tie!");
        return true;
    }

    return false;
}
