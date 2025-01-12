export default class CollisionBlock {
    constructor({ c, position }) {
        this.c = c
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw() {
        this.c.fillStyle = 'rgba(255, 0, 0, 0.5)'
        this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}