class Sprite {
    constructor({ c, position, imageSrc }) {
        this.c = c
        this.position = position
        this.image =new Image()
        this.image.onload = () => {
            this.loaded = true
            this.width = this.image.width / this.frameRate
            this.height = this.image.height
        } 
        this.image.src = imageSrc
        this.loaded = false
    }
    draw() {
        if (!this.loaded) return
        this.c.drawImage(
            this.image,
            this.position.x,
            this.position.y
        )
    }
}

export default Sprite
