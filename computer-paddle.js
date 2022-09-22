/* Speed variable, so that we can set a maximum speed to the computer paddle */
const SPEED = .02

export const  computerPaddle = {
    element : document.getElementById("computer-paddle"),

    /* Here we are retrieving the current value/position of the paddle*/
    getPosition() {
        return parseFloat(getComputedStyle(computerPaddle.element).getPropertyValue("--position"))
    },

    /* The parameter here (value) calls on the mousevent for the player-paddle in the script.js */
    setPosition(value) {
        computerPaddle.element.style.setProperty("--position", value)
    },

    /* The getBoundingClientRect method provides information about the size of the element (computerPaddle)
        and it's position relative to the viewport */
    rect() {
        return computerPaddle.element.getBoundingClientRect()
    },
     // Puts the y axis position back to center
    reset() {
        computerPaddle.setPosition(50)
    },
    // This function makes the computer paddle follow the ball on the y axis
    update(delta, ballHeight) {
        computerPaddle.setPosition(computerPaddle.getPosition() + SPEED * delta * (ballHeight - computerPaddle.getPosition()))
    }
}
