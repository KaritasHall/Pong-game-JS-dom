/* Speed variable, so that we can set a maximum speed to the computer paddle */
const SPEED = .02

/* Creating paddle class*/
export default class Paddle {
    constructor(paddleElem) {
    this.paddleElem = paddleElem
    this.reset()
}

/* Here we are retrieving the current value/position of the paddle*/
get position() {
    return parseFloat(
        getComputedStyle(this.paddleElem).getPropertyValue("--position"))
}

/* The parameter here (value) calls on the mousevent for the player-paddle in the script.js */
set position(value) {
    this.paddleElem.style.setProperty("--position", value)

}

rect() {
    return this.paddleElem.getBoundingClientRect()
}

reset() {
    this.position = 50
}

update(delta, ballHeight) {
    this.position += SPEED * delta * (ballHeight - this.position)
}

}