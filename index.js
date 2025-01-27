// Setup Dimensions
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16  // 1024
canvas.height = 64 * 9  // 576

let parsedCollisions
let collisionBlocks
let background
let doors

// let levels = {
//     1: {
//         init: () => {
//             parsedCollisions = collisionsLevel1.parse2D()
//             collisionBlocks = parsedCollisions.createObjectsFrom2D()
//             player.collisionBlocks = collisionBlocks

//             if (player.currentAnimation) player.currentAnimation.isActive = false

//             background = new Sprite({
//                 position: {
//                     x: 0,
//                     y: 0
//                 },
//                 imageSrc: './img/backgroundLevel1.png'
//             })

//             doors = [
//                 new Sprite({
//                     position: {
//                         x: 766,
//                         y: 272
//                     },
//                     imageSrc: './img/doorOpen.png',
//                     frameRate: 5,
//                     frameBuffer: 5,
//                     loop: false,
//                     autoplay: false
//                 })
//             ]
//         }
//     },
//     2: {
//         init: () => {
//             parsedCollisions = collisionsLevel2.parse2D()
//             collisionBlocks = parsedCollisions.createObjectsFrom2D()
//             player.collisionBlocks = collisionBlocks
//             player.position.x = 98
//             player.position.y = 158

//             if (player.currentAnimation) player.currentAnimation.isActive = false

//             background = new Sprite({
//                 position: {
//                     x: 0,
//                     y: 0
//                 },
//                 imageSrc: './img/backgroundLevel2.png'
//             })

//             doors = [
//                 new Sprite({
//                     position: {
//                         x: 772,
//                         y: 336
//                     },
//                     imageSrc: './img/doorOpen.png',
//                     frameRate: 5,
//                     frameBuffer: 5,
//                     loop: false,
//                     autoplay: false
//                 })
//             ]
//         }
//     },
//     3: {
//         init: () => {
//             parsedCollisions = collisionsLevel3.parse2D()
//             collisionBlocks = parsedCollisions.createObjectsFrom2D()
//             player.collisionBlocks = collisionBlocks
//             player.position.x = 750
//             player.position.y = 230

//             if (player.currentAnimation) player.currentAnimation.isActive = false

//             background = new Sprite({
//                 position: {
//                     x: 0,
//                     y: 0
//                 },
//                 imageSrc: './img/backgroundLevel3.png'
//             })

//             doors = [
//                 new Sprite({
//                     position: {
//                         x: 176,
//                         y: 335
//                     },
//                     imageSrc: './img/doorOpen.png',
//                     frameRate: 5,
//                     frameBuffer: 5,
//                     loop: false,
//                     autoplay: false
//                 })
//             ]
//         }
//     }
// }

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

// Create levels
let levels = {
    1: new Level({
        collisionsLevel: collisionsLevel1,
        backgroundImageSrc: './img/backgroundLevel1.png',
        doorPosition: { x: 766, y: 272 },
        playerStartPosition: { x: 200, y: 200 }
    }),
    2: new Level({
        collisionsLevel: collisionsLevel2,
        backgroundImageSrc: './img/backgroundLevel2.png',
        doorPosition: { x: 772, y: 336 },
        playerStartPosition: { x: 98, y: 158 }
    }),
    3: new Level({
        collisionsLevel: collisionsLevel3,
        backgroundImageSrc: './img/backgroundLevel3.png',
        doorPosition: { x: 176, y: 335 },
        playerStartPosition: { x: 750, y: 230 }
    })
};

// Create a new player
const player = new Player({
    levels: levels
})

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

levels[1].init()
animate()