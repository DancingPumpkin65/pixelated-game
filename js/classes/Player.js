class Player extends Sprite {
    constructor({
        collisionBlocks = [],
        position = { x: 200, y: 200 },
        gravity = 1,
        overlay = { opacity: 0 },
        levels,
        level = 1,
        setupEventListeners,
        setCanJump,
        keys,
    } = {}) {
        const defaultAnimations = {
            idleRight: {
                frameRate: 11,
                frameBuffer: 3,
                loop: true,
                imageSrc: './img/king/idle.png',
            },
            idleLeft: {
                frameRate: 11,
                frameBuffer: 3,
                loop: true,
                imageSrc: './img/king/idleLeft.png',
            },
            runRight: {
                frameRate: 8,
                frameBuffer: 4,
                loop: true,
                imageSrc: './img/king/runRight.png',
            },
            runLeft: {
                frameRate: 8,
                frameBuffer: 4,
                loop: true,
                imageSrc: './img/king/runLeft.png',
            },
            attackRight: {
                frameRate: 3,
                frameBuffer: 7,
                loop: true,
                imageSrc: './img/king/attackRight.png',
            },
            attackLeft: {
                frameRate: 3,
                frameBuffer: 5,
                loop: true,
                imageSrc: './img/king/attackLeft.png',
            },
            enterDoor: {
                frameRate: 8,
                frameBuffer: 4,
                loop: false,
                imageSrc: './img/king/enterDoor.png',
                onComplete: async () => {
                    gsap.to(this.overlay, {
                        opacity: 1,
                        onComplete: async () => {
                            this.level++;
                            const nextLevel = this.level + 1;

                            // Fetch and load the next level data
                            const newLevelData = await fetchLevelData(nextLevel);
                            this.levels[nextLevel] = new Level({
                                collisionsLevel: window[newLevelData.collisions],
                                backgroundImageSrc: newLevelData.backgroundImage,
                                doorPosition: { x: newLevelData.doorPositionX, y: newLevelData.doorPositionY },
                                playerStartPosition: { x: newLevelData.playerStartPositionX, y: newLevelData.playerStartPositionY }
                            });

                            this.levels[this.level].init(player);
                            player.switchSprite('idleRight');
                            player.preventInput = false;
                            gsap.to(this.overlay, {
                                opacity: 0
                            });
                        },
                    });
                },
            },
        };

        super({
            imageSrc: defaultAnimations.idleRight.imageSrc,
            frameRate: defaultAnimations.idleRight.frameRate,
            animations: defaultAnimations,
        });

        this.position = position;
        this.velocity = { x: 0, y: 0 };
        this.gravity = gravity;
        this.sides = { bottom: this.position.y + this.height };
        this.collisionBlocks = collisionBlocks;
        this.overlay = overlay;
        this.levels = levels;
        this.level = level;
        this.setupEventListeners = setupEventListeners;
        this.setCanJump = setCanJump;
        this.keys = keys;
        this.lastDirection = 'right';
        this.isAttacking = false;
        this.animations = defaultAnimations;
    }

    update() {
        this.position.x += this.velocity.x
        this.updateHitbox()
        this.checkForHorizontalCollisions()
        this.applyGravity()
        this.updateHitbox()
        this.checkForVerticalCollisions()

        // Check if the attack animation is complete
        if (this.isAttacking && this.currentFrame >= this.frameRate - 1) {
            this.isAttacking = false;
            if (this.lastDirection === 'right') {
                this.switchSprite('idleRight');
            } else {
                this.switchSprite('idleLeft');
            }
        }
    }

    handleInput(keys) {
        if (this.preventInput || this.isAttacking) return;
        this.velocity.x = 0;
        if (keys.d.pressed) {
            this.switchSprite('runRight');
            this.velocity.x = 5;
            this.lastDirection = 'right';
        } else if (keys.a.pressed) { 
            this.switchSprite('runLeft');
            this.velocity.x = -5;
            this.lastDirection = 'left';
        } else {
            if (this.lastDirection === 'left') this.switchSprite('idleLeft');
            else this.switchSprite('idleRight');
        }
    }

    switchSprite(name) {
        if (this.image === this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]
    }

    attack() {
        this.isAttacking = true;
        if (this.lastDirection === 'right') {
            this.switchSprite('attackRight');
        } else {
            this.switchSprite('attackLeft');
        }
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34
            },
            width: 50,
            height: 53
        }
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
            } 
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break
                }
            } 
        }
    }
}