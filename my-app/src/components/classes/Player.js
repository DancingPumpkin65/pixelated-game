class Player {
    constructor(c, canvas) {
        this.c = c
        this.canvas = canvas
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 1
        this.width = 100
        this.height = 100
        this.sides = {
            bottom: this.position.y + this.height
        }
    }

    draw() {
        this.c.fillStyle = 'red';
        this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.sides.bottom = this.position.y + this.height

        // this.updateHitbox()

        // // this.checkForHorizontalCollisions()
        
        // this.applyGravity()

        // this.updateHitbox()
        
        // this.checkForVerticalCollisions()
        if (this.sides.bottom + this.velocity.y < this.canvas.height) {
            this.velocity.y += this.gravity
        } else this.velocity.y = 0
    }

    // updateHitbox() {
    //     this.hitbox = {
    //         position: {
    //             x: this.position.x + 58,
    //             y: this.position.y + 34
    //         },
    //         width: 50,
    //         height: 53
    //     }
    // }

    // applyGravity() {
    //     this.velocity.y += this.gravity
    //     this.position.y += this.velocity.y
    // }
}

export default Player