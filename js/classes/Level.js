class Level {
    constructor({ collisionsLevel, backgroundImageSrc, doorPosition, playerStartPosition }) {
        this.collisionsLevel = collisionsLevel;
        this.backgroundImageSrc = backgroundImageSrc;
        this.doorPosition = doorPosition;
        this.playerStartPosition = playerStartPosition;
    }

    init() {
        const parsedCollisions = this.collisionsLevel.parse2D();
        const collisionBlocks = parsedCollisions.createObjectsFrom2D();
        player.collisionBlocks = collisionBlocks;

        if (player.currentAnimation) player.currentAnimation.isActive = false;

        background = new Sprite({
            position: {
                x: 0,
                y: 0
            },
            imageSrc: this.backgroundImageSrc
        });

        doors = [
            new Sprite({
                position: this.doorPosition,
                imageSrc: './img/doorOpen.png',
                frameRate: 5,
                frameBuffer: 5,
                loop: false,
                autoplay: false
            })
        ];

        // Set player position
        player.position = this.playerStartPosition;
    }
}