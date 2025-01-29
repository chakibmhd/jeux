const cells = document.querySelectorAll('.cell');
const titleHeader = document.querySelector('#titleHeader')
const xPalyerDisplay = document.querySelector('#xPlayerDisplay')
const oPlayerDisplay = document.querySelector('#oPlayerDisplay')
const restarBtn = document.querySelector('#restarBtn')

//Initialize variables for the game

let player = 'X'
let isPauseGame = false
let isGameStart = false

//Array of win conditions
const inputCells = ['', '', '',
                    '', '', '',
                    '', '', '']


//Array of win conditions 
const winConditions = [
    [0, 1, 2], [3, 4, 5,], [6, 7, 8],  //Raws
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //colums
    [0, 4, 8], [2, 4, 6]  //Diagonols
]   


//Add click event listeners to each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index))
})

function tapCell(cell, index){
    //Ensure cemm is empty and game isn't paused
    if(cell.textContent == '' &&
      !isPauseGame
    ){
        isGameStart = true
        updateCell(cell, index)

        //Do a random pick if there are no results
        if (!checkWinner()){
            changePlayer()
            
        }
        
    }
}

function updateCell(cell, index){
    cell.textContent = player
    inputCells[index] = player
    cell.style.color = (player == 'X') ? '#1892EA' : '#FFE604'
}

function changePlayer() {
    player = (player == 'X') ? 'O' : 'X'
}

function checkWinner() {
    for (const [a, b, c] of winConditions) {
       //check each winning condition

       if(inputCells[a] == player &&
          inputCells[b] == player &&
          inputCells[c] == player
        ) {
            declareWinner ([a, b, c])
            return true
        }
    }

    //check for a draw  (if all cells are filled)
    if(inputCells.every(cell => cell != '')){
        declarDraw()
        return true
    }
}
    function declareWinner(winningIndices) {
        titleHeader.textContent = `winner is:${player}!!`
        isPauseGame = true
        //Highlight winning cells
        winningIndices.forEach((index)=>
        cells[index].style.background = '#2A2343'
        ) 
        restarBtn.style.visibility = 'visible'
    }

    function declarDraw(){
        titleHeader.textContent = 'Draw!'
        isPauseGame = true
        restarBtn.style.visibility = 'visible'
    }

    function choosePlayer(selectedPlayer) {
        //Ensure the game hasn't started
        if(!isGameStart){
            //Override the selected player value
            player = selectedPlayer
            if (player == 'X'){
                xPalyerDisplay.classList.add('player-active')
                oPlayerDisplay.classList.remove('player-active')
            } else{
                // Hightlight O display
                xPalyerDisplay.classList.remove('player-active')
                oPlayerDisplay.classList.add('player-active')
            }
        }
    }


restarBtn.addEventListener('click', () => {
    restarBtn.style.visibility = 'hidden'
    inputCells.fill('')
    cells.forEach(cell => {
        cell.textContent = ''
        cell.style.background = ''
    })

    isGameStart = false
    isGameStart = false
    titleHeader.textContent = 'Choose'
})




