import {randomNumberBetween, isCollision} from "./utilities.js"

/* Here we start by setting the starting velocity for the ball and how much it will increase over time*/
const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREASE = .00001

/* Creating an object for the ball */
export const ball = {
    element: document.getElementById("ball"),
    velocity: INITIAL_VELOCITY,
    direction: {
        x: 0,
        y: 0,
    },
    getX: () => {
        return parseFloat(getComputedStyle(ball.element).getPropertyValue("--x"))
    },
    setX: (value) => {
        ball.element.style.setProperty("--x", value)
    },
    getY: () => {
        return parseFloat(getComputedStyle(ball.element).getPropertyValue("--y"))
    },
    setY: (value) => {
        ball.element.style.setProperty("--y", value)
    },
    /* Creating a function for when the ball hits the right side of the screen */
    // this function checks if the ball has hit the right side of the screen
    isOutOfBoundsRightSide: () => {
        const rect = ball.rect()
        return rect.right >= window.innerWidth
    },
    /* This function is for when the ball hits the left (player's side of the screen) */
    isOutOfBounds: () => {
        const rect = ball.rect()
        return rect.right >= window.innerWidth || rect.left <= 0
    },
    rect: () => {
        return ball.element.getBoundingClientRect()
    },
    /*Reset function that gets called when the ball hits either side of the screen. It resets the ball
    to the center of the screen and returns back to the initial velocity*/
    reset: () => {
            ball.setX(50)
            ball.setY(50)
            ball.direction = { x: 0}
            while (
                Math.abs(ball.direction.x) <= 0.2 ||
                Math.abs(ball.direction.x) >= 0.9)
                {
                const heading = randomNumberBetween(0,2 * Math.PI)
                ball.direction = { x: Math.cos(heading), y: Math.sin(heading)}
            }
            ball.velocity = INITIAL_VELOCITY

    },
    update: (delta, paddleRects) => {
        ball.setX(ball.getX() + ball.direction.x * ball.velocity * delta)
        ball.setY(ball.getY() + ball.direction.y * ball.velocity * delta)
        ball.velocity += VELOCITY_INCREASE * delta
        const rect = ball.rect()

        // Here we are saying if the ball hits the top it will bounce away
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            ball.direction.y *= -1
        }
        // This function loops through our paddle rectangles to check if collision is true
        if (paddleRects.some(r => isCollision(r, rect))) {
            ball.direction.x *= -1
        }
    }
}



