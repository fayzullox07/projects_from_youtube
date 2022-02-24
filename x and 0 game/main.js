const x_Class = 'x';
const circle_Class = 'circle';
const winning_Combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElems = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn;

startGame()

function startGame (){
    circleTurn = false
    cellElems.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true})
    })
    setBoardHoverClass()
    
}


function handleClick(e){

    const cell = e.target;
    const currentClass = circleTurn ? circle_Class : x_Class
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        endGame(false)
    }else if (isDraw()){
        endGame(true)
    }else{
        swapTurns()
        setBoardHoverClass()
    
    }
}



function endGame(draw){
    if(draw) {
        winningMessageElement.innerText = "Do'stlik g'alaba qozondi"
    }else{
        winningMessageElement.innerText = `${circleTurn ? "Fayruz's " : 
        "Progrommist "}Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElems].every(cell => {
        return cell.classList.contains(x_Class) || cell.classList.contains(circle_Class)
    })
}


function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}


function setBoardHoverClass(){
    board.classList.remove(x_Class)
    board.classList.remove(circle_Class)
    if(circleTurn){
        board.classList.add(circle_Class)
    }else{
        board.classList.add(x_Class)
    }
}


function checkWin(currentClass){
    return winning_Combinations.some(combination => {
        return combination.every(index => {
            return cellElems[index].classList.contains(currentClass)
        })
    })
}


