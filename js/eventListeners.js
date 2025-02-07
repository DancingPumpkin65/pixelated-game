let canJump = true;

window.addEventListener('keydown', (event) => {
    if (window.player.preventInput) return;
    switch (event.key) {
        case 'w':
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i];

                if (window.player.hitbox.position.x + window.player.hitbox.width <= door.position.x + door.width &&
                    window.player.hitbox.position.x >= door.position.x &&
                    window.player.hitbox.position.y + window.player.hitbox.height >= door.position.y &&
                    window.player.hitbox.position.y <= door.position.y + door.height) {
                        window.player.velocity.x = 0;
                        window.player.velocity.y = 0;
                        window.player.preventInput = true;
                        window.player.switchSprite('enterDoor');
                        door.play();
                        return;
                }
            }
            if (window.player.velocity.y === 0 && canJump) {
                canJump = false;
                window.player.velocity.y = -15;
                setTimeout(() => {
                    canJump = true;
                }, 450);
            }
            break;
        case ' ':
            keys.space.pressed = true;
            window.player.attack();
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case ' ':
            keys.space.pressed = false;
            break;
    }
});