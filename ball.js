import {randomNumberBetween, isCollision} from "./utilities.js"

/* Here we start by setting the starting velocity for the ball and how much it will increase over time*/
const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREASE = 0.00001

/* Creating an object for the ball */
export const ball = {
    element: document.getElementById("ball"),
    velocity: INITIAL_VELOCITY,
    direction: {
        x: 0,
        y: 0,
    },
    /* Getting the value of x and y from the css */
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

    // this function checks if the ball has hit the right side of the screen
    isOutOfBoundsRightSide: () => {
        const rect = ball.rect()
        return rect.right >= window.innerWidth
    },
    /* This function checks if the ball hits the left (player's side of the screen) */
    isOutOfBounds: () => {
        const rect = ball.rect()
        return rect.right >= window.innerWidth || rect.left <= 0
    },
    /* The getBoundingClientRect method provides information about the size of the element (ball)
        and it's position relative to the viewport */
    rect: () => {
        return ball.element.getBoundingClientRect()
    },
    /*Reset function that gets called when the ball hits either side of the screen. It resets the ball
    to the center of the screen and returns back to the initial velocity*/
    reset: () => {
            ball.setX(50)
            ball.setY(50)
            ball.direction = { x: 0}
            // Here we are randomizing the starting direction of the ball. So after resetting it will go in any random direction
            while (Math.abs(ball.direction.x) <= 0.2 || Math.abs(ball.direction.x) >= 0.9) {
                const heading = randomNumberBetween(0,2 * Math.PI)
                ball.direction = { x: Math.cos(heading), y: Math.sin(heading)}
            }
            ball.velocity = INITIAL_VELOCITY

    },
    	/* This function updates the state of the ball */
    update: (delta, paddleRects) => {
        //This updates the x axis position of the ball in relation to it's direction, velocity and time since last updated (delta)
        ball.setX(ball.getX() + ball.direction.x * ball.velocity * delta)
        // Same but the y axis
        ball.setY(ball.getY() + ball.direction.y * ball.velocity * delta)
        // This makes the ball go slightly faster on every update
        ball.velocity += VELOCITY_INCREASE * delta
        const rect = ball.rect()

        // Here we are saying if the ball hits the bottom or top it will bounce away
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            ball.direction.y *= -1
        }
        /*This function loops through the paddle rectangles to check if the ball is colliding with either paddle.
        If that is true the ball will bounce away in the opposite direction*/
        if (paddleRects.some(paddle => isCollision(paddle, rect))) {
            ball.direction.x *= -1
        }
    }
}



