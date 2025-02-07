// Setup Dimensions
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16  // 1024
canvas.height = 64 * 9  // 576

let parsedCollisions
let collisionBlocks
let background
let doors

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

const level = 1;

async function fetchLevelData() {
    const response = await fetch(`http://localhost:8080/level/${level}`);
    const levelData = await response.json()
    console.log(levelData)
    return levelData
}

fetchLevelData().then(levelData => {
    let levels = {
        [levelData.id]: new Level({
            collisionsLevel: window[levelData.collisions],
            backgroundImageSrc: levelData.backgroundImage,
            doorPosition: { x: levelData.doorPositionX, y: levelData.doorPositionY },
            playerStartPosition: { x: levelData.playerStartPositionX, y: levelData.playerStartPositionY }
        })
    }

    // Create a new player
    const player = new Player({
        levels: levels,
        keys: keys
    })

    window.player = player;

    // Animate Player   
    function animate() {
        window.requestAnimationFrame(animate)

        background.draw()
        
        doors.forEach((door) => {
            door.draw()
        })

        player.handleInput(keys)
        player.draw()
        player.update()

        // Level switch
        c.save()
        c.globalAlpha = player.overlay.opacity
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.restore()
    }

    levels[1].init(player)
    animate()
})