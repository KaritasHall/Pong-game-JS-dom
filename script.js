import Paddle from "./paddle.js";
import { ball } from "./ball.js";

const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")

/* Here we are making a callback function for the requestAnimationFrame method below. Time and lastTime is represented in milliseconds.
    lastTime is undefined until the update loop has been run once. Delta is the time passed since the loop was last run.*/
let lastTime
function update(time) {
    if (lastTime !== undefined) {
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.getY())

        if (ball.isOutOfBounds()) {
            handleLose()
        }
    }

    lastTime = time
    /* By calling this again here inside the callback function, we make it so that this function will run continously
        This is what is often referred to as a game loop */
    window.requestAnimationFrame(update)
}

/* Here we are updating the html value of the player/computer scores*/
function awardPointToPlayer() {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
}

function awardPointToComputer() {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1

}

/* Making a function handleLose which checks for loss condition and awards a point to the apropriate side*/
function handleLose() {
    if (ball.isOutOfBoundsRightSide()) {
        awardPointToPlayer()

    } else {
        awardPointToComputer()

    }
    ball.reset()
    computerPaddle.reset()
}

/* Here we have an event listener for the mousemove event which accepts a callback, this callback equates the position of
    the player paddle to the position of the mouse pointer on the y axis - allowing the player to move the paddle with their mouse*/
document.addEventListener("mousemove", (mouseEvent) => {
    playerPaddle.position = (mouseEvent.y / window.innerHeight) * 100
})

ball.reset()

/* Here we are running the requestAnimationFrame method, the purpose of it is to update the state of the game based on the current time.
    This time is passed into the callback function automatically*/
window.requestAnimationFrame(update)
