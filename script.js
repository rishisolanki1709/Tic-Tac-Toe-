// a function that will create circle and cross
// a function that will execute when play again button clicked and make all the box empty
// after creating symbol it will call check pattern function which will check slope checking row checking colum checking

let first_player_symb = "cross"
let gameIsRunning = false;
const p1ScoreDiv = document.getElementById("player1_score");
const p2ScoreDiv = document.getElementById("player2_score");
let p1Score = 0;
let p2Score = 0;
// creating circle by character O
function createCircle() {
    const newCircle = document.createElement("div");
    newCircle.style.fontFamily = "sans-serif";
    newCircle.innerText = "O";
    newCircle.style.fontSize = "50px";
    newCircle.style.color = "blue";
    return newCircle;
}

// creating cross by character X 
function createCross() {
    const newCross = document.createElement("div");
    newCross.style.fontFamily = "sans-serif";
    newCross.innerText = "X";
    newCross.style.fontSize = "35px";
    newCross.style.color = "red";
    return newCross;
}

// Swapping Symboles by swap button
function swapSymboles() {
    const symb1 = document.getElementById("symbole1");
    const symb2 = document.getElementById("symbole2");
    symb1.innerText = "";
    symb2.innerText = "";
    if (first_player_symb === "cross") {
        symb1.innerText = "O";
        symb1.style.color = "blue"
        symb2.innerText = "X";
        symb2.style.color = "red"
        first_player_symb = "circle";
    } else {
        symb1.innerText = "X";
        symb1.style.color = "red"
        symb2.innerText = "O";
        symb2.style.color = "blue"
        first_player_symb = "cross";
    }
}

// swap button funtion
const swap_btn = document.getElementById("swap-btn");
swap_btn.addEventListener("click", () => {
    if (!gameIsRunning) {
        swapSymboles();
    }
})

// This will create circle into box passed as parameter
function circleOnBox(box) {
    const circle = createCircle();
    circle.style.scale = "1.5"
    box.append(circle)
}

// This will create cross into box passed as parameter
function crossOnBox(box) {
    const cross = createCross();
    cross.style.scale = "1.5"
    box.append(cross)
}

let temp;
let symbArray = [];
function isSymbInArray(box) {
    temp = 0;
    symbArray.forEach((b) => {
        if (b === box.id) {
            temp++;
        }
    })
    if (!temp) {
        symbArray.push(box.id);
    } else {
        return true;
    }
}

// main execution start from here 
//************************************************************************************************************* */
let permission = true;
const boxes = document.getElementsByClassName("inner-box");
Array.from(boxes).forEach((box) => {
    box.addEventListener("click", () => {
        // here we came, that means game is running 
        gameIsRunning = true;
        // checking box that it is present in array or not, if present then it should not include new symbole in it otherwise include the symbole
        if (!isSymbInArray(box) && permission) {
            if (first_player_symb === "cross") {
                crossOnBox(box);
                first_player_symb = "circle";
            } else {
                circleOnBox(box);
                first_player_symb = "cross";
            }
            // when to start checking pattern
            if (symbArray.length >= 5) {
                checkPattern();
                p1ScoreDiv.innerText = p1Score;
                p2ScoreDiv.innerText = p2Score;
            }
        }
    })
})

const play_again_btn = document.getElementById("play-again-btn");
play_again_btn.addEventListener("click", () => {
    temp = 0;
    symbArray = [];
    permission = true;
    document.getElementById("msg").innerText = "";
    const symb1 = document.getElementById("symbole1");
    if (symb1.innerText === "X") {
        first_player_symb = "cross"
    } else {
        first_player_symb = "circle"
    }
    Array.from(boxes).forEach((box) => {
        box.innerText = "";
        gameIsRunning = false;
    })
})

function isAllBoxesFull() {
    if (symbArray.length === 9) {
        return true;
    }
}

function pattern() {
    // boxes :- this contains all the boxes like id = box1, box2....
    if (boxes[0].innerText && boxes[0].innerText === boxes[1].innerText && boxes[1].innerText === boxes[2].innerText) {
        // for first row of (--)X or O
        return [0, 1, 2, 90];
    } else if (boxes[0].innerText && boxes[0].innerText === boxes[4].innerText && boxes[4].innerText === boxes[8].innerText) {
        // for first row of (\)X or O
        return [0, 4, 8, 315];
    } else if (boxes[0].innerText && boxes[0].innerText === boxes[3].innerText && boxes[3].innerText === boxes[6].innerText) {
        // for first column of (|)X or O
        return [0, 3, 6, 0];
    } else if (boxes[6].innerText && boxes[6].innerText === boxes[7].innerText && boxes[7].innerText === boxes[8].innerText) {
        // for last row of (--)X or O
        return [6, 7, 8, 90];
    } else if (boxes[1].innerText && boxes[1].innerText === boxes[4].innerText && boxes[4].innerText === boxes[7].innerText) {
        // for 2nd column of (|)X or O
        return [1, 4, 7, 0];
    } else if (boxes[2].innerText && boxes[2].innerText === boxes[5].innerText && boxes[5].innerText === boxes[8].innerText) {
        // for 3rd column of (|)X or O
        return [2, 5, 8, 0];
    } else if (boxes[3].innerText && boxes[3].innerText === boxes[4].innerText && boxes[4].innerText === boxes[5].innerText) {
        // for 2nd row of (--)X or O 
        return [3, 4, 5, 90];
    } else if (boxes[2].innerText && boxes[2].innerText === boxes[4].innerText && boxes[4].innerText === boxes[6].innerText) {
        // for 2nd row of (/)X or O 
        return [2, 4, 6, 45];
    } else {
        if (isAllBoxesFull()) {
            document.getElementById("msg").innerText = "*******Match Draw(*_*)*******";
        }
        return 0;
    }
}

function printLine(a, b, c, d) {
    const line = document.createElement("div");
    line.style.height = "179px";
    line.style.width = "2px";
    line.style.position = "absolute";
    line.style.backgroundColor = "green";
    line.style.rotate = `${d}deg`;
    line.style.borderRadius = "10px";
    boxes[a].append(line.cloneNode(true));
    boxes[b].append(line.cloneNode(true));
    boxes[c].append(line.cloneNode(true));
}


function showMessage(idx) {
    const symb1 = document.getElementById("symbole1");
    if (boxes[idx].innerText === symb1.innerText) {
        document.getElementById("msg").innerText = "*******1st Player Winner (^-^)*******";
        p1Score++;
    } else {
        document.getElementById("msg").innerText = "*******2nd Player Winner (^-^)*******";
        p2Score++;
    }
}
// this function is used to check pattern (all pattern checked)  
function checkPattern() {
    const winnerArrayBoxes = pattern();
    if (winnerArrayBoxes != 0) {
        printLine(...winnerArrayBoxes);
        showMessage(winnerArrayBoxes[0]);
        permission = false;
    }
}
