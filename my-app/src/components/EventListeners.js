// eventListeners.js
export const setupEventListeners = (player, keys, setCanJump) => {
    let canJump = true;

    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w':
                if (player.velocity.y === 0 && canJump === true) {
                    canJump = false;
                    player.velocity.y = -15;
                    setTimeout(() => {
                        canJump = true;
                    }, 450);
                }
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
        }
    });

    return { canJump };  // You can return the state if needed
};
