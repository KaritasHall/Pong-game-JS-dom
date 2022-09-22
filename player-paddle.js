export const  playerPaddle = {
    element : document.getElementById("player-paddle"),

    /* Here we are retrieving the current value/position of the paddle*/
    getPosition() {
        return parseFloat(getComputedStyle(playerPaddle.element).getPropertyValue("--position"))
    },

    /* The parameter here (value) calls on the mousevent for the player-paddle in the script.js */
    setPosition(value) {
        playerPaddle.element.style.setProperty("--position", value)
    },
    /* The getBoundingClientRect method provides information about the size of the element (playerPaddle)
        and it's position relative to the viewport */
    rect() {
        return playerPaddle.element.getBoundingClientRect()
    },
    // Puts the y axis position back to center
    reset() {
        playerPaddle.setPosition(50)
    }
}
