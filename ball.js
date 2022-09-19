const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREASE = .00001

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem
        this.reset()
    }

    get x(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }

    set x(value) {
        this.ballElem.style.setProperty("--x", value)
    }

    get y(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }

    set y(value) {
        this.ballElem.style.setProperty("--y", value)
    }

    rect() {
       return this.ballElem.getBoundingClientRect()
    }

    reset(){
        this.x = 50
        this.y = 50
        this.direction = { x: 0}
        while (
            Math.abs(this.direction.x) <= 0.2 ||
            Math.abs(this.direction.x) >= 0.9)
            {
            const heading = randomNumberBetween(0,2 * Math.PI)
            this.direction = { x: Math.cos(heading), y: Math.sin(heading)}
        }
        this.velocity = INITIAL_VELOCITY
    }

    update(delta, paddleRects) {
        //console.log(this.x, this.y)
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        this.velocity += VELOCITY_INCREASE * delta
        const rect = this.rect()

// Here we are saying if the ball hits the top it will bounce away
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1
        }
// This function loops through our paddle rectangles to check if collision is true
        if (paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max-min) + min
}

//This will check for collision
function isCollision(rect1, rect2) {
    return rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <=rect2.bottom &&
    rect1.bottom >= rect2.top
}