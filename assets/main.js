const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}
const historyTable = document.querySelector('#history-table').firstElementChild
const modalRestartButton = document.querySelector('#end-modal-restart')
const leftSelectionButton = document.querySelector("#left-selector")
const rightSelectionButton = document.querySelector('#right-selector')
const currentPlayerSelectionEl = document.querySelector('#current-player-selection')
const opponentCard = document.querySelector('#opponent-card')
const playerCard = document.querySelector('#player-card')
const opponentScoreEl = document.querySelector("#opponent-score")
const currentOpponentSelectionEl = document.querySelector('#current-opponent-selection')
const setPlayerSelectionButton = document.querySelector('#set-player-selection')
const playerScoreEl = document.querySelector("#player-score")
const scissorsImagePath = "images/scissors.png"
const paperImagePath = "images/paper.png"
const rockImagePath = "images/rock.png"
const selections = {
    0: {
        name: "Scissors",
        imagePath: scissorsImagePath,
        kill: "Paper"
    },
    1: {
        name: "Paper",
        imagePath: paperImagePath,
        kill: "Rock"
    },
    2: {
        name: "Rock",
        imagePath: rockImagePath,
        kill: "Scissors"
    }
}
let currentRound = 1
let currentOpponentSelection = 0
let currentPlayerSelection = 0
let playerScore = 0
let opponentScore = 0

const changeSelection = (increment, currentSelection, currentSelectionEl) => {
    currentSelection = (currentSelection + increment) % 3
    if (currentSelection < 0) {
        currentSelection = 2
    }

    currentSelectionEl.firstElementChild.src = selections[currentSelection].imagePath

    return currentSelection
}

const runGame = async () => {
    setPlayerSelectionButton.disabled = true
    if (currentRound > 14) {
        setPlayerSelectionButton.disabled = true
        return;
    }
    for (let i = 0; i < Math.round(Math.random() * (30 - 5) + 5); i++) {
        currentOpponentSelection = changeSelection(1, currentOpponentSelection, currentOpponentSelectionEl)
        await sleep(100)
    }
    if (currentPlayerSelection === currentOpponentSelection) {
        playerCard.classList.add('text-bg-secondary')
        opponentCard.classList.add('text-bg-secondary')
        // historyTable.children[0].children[currentRound].firstElementChild.classList.remove('text-white')
        // historyTable.children[0].children[currentRound].firstElementChild.classList.add('text-black')
        // historyTable.children[1].children[currentRound].firstElementChild.classList.remove('text-white')
        // historyTable.children[1].children[currentRound].firstElementChild.classList.add('text-black')
    } else {
        if (selections[currentPlayerSelection].kill === selections[currentOpponentSelection].name) {
            playerCard.classList.add('text-bg-success')
            playerScore++
            historyTable.children[0].children[currentRound].firstElementChild.classList.remove('text-white')
            historyTable.children[0].children[currentRound].firstElementChild.classList.add('text-success')
        }
        if (selections[currentOpponentSelection].kill === selections[currentPlayerSelection].name) {
            opponentCard.classList.add('text-bg-success')
            opponentScore++
            historyTable.children[1].children[currentRound].firstElementChild.classList.remove('text-white')
            historyTable.children[1].children[currentRound].firstElementChild.classList.add('text-danger')
        }
        opponentScoreEl.innerText = opponentScore
        playerScoreEl.innerText = playerScore
        currentRound++
    }
    if (currentRound > 14) {
        setPlayerSelectionButton.disabled = true
        let endModal = new bootstrap.Modal(document.querySelector('#end-modal'))
        endModal.show()
        document.querySelector('#end-modal-text').innerText = opponentScore !== playerScore ? (opponentScore > playerScore ? "You lose ! (But you can restart to try again 👀)" : "Congratulation, you won this game ! 🎉") : "None of you have won this game 🤷"
    }
    await sleep(500)
    playerCard.classList.remove('text-bg-success')
    opponentCard.classList.remove('text-bg-success')
    playerCard.classList.remove('text-bg-secondary')
    opponentCard.classList.remove('text-bg-secondary')
    currentOpponentSelectionEl.firstElementChild.src = "images/sticker-block-interrogation.png"
    setPlayerSelectionButton.disabled = false
}

leftSelectionButton.addEventListener('click', () => currentPlayerSelection = changeSelection(1, currentPlayerSelection, currentPlayerSelectionEl))
rightSelectionButton.addEventListener('click', () => currentPlayerSelection = changeSelection(-1, currentPlayerSelection, currentPlayerSelectionEl))
setPlayerSelectionButton.addEventListener('click', runGame)
modalRestartButton.addEventListener('click', () => {
    location.reload();
})

currentPlayerSelection = changeSelection(0, currentPlayerSelection, currentPlayerSelectionEl)

