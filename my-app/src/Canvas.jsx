import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import Player from './components/classes/Player';
import Sprite from './components/classes/Sprite';
import { collisionsLevel1, collisionsLevel2, collisionsLevel3 } from './components/data/collisions';
import { setupEventListeners } from './components/EventListeners.js';
import './components/utils';

const Canvas = () => {
    const canvasRef = useRef(null);
    const [canJump, setCanJump] = useState(true);
    const keys = { w: { pressed: false }, a: { pressed: false }, d: { pressed: false } };

    useEffect(() => {
        const canvas = canvasRef.current;
        const c = canvas.getContext('2d');

        canvas.width = 64 * 16;
        canvas.height = 64 * 9;
        
        let parsedCollisions;
        let collisionBlocks;
        let background;
        let doors = [];

        const player = new Player({
            c,
            canvas,
            collisionBlocks,
            imageSrc: '/img/king/idle.png',
            frameRate: 11,
            animations: {
                idleRight: {
                    frameRate: 11,
                    frameBuffer: 3,
                    loop: true,
                    imageSrc: '/img/king/idle.png'
                },
                idleLeft: {
                    frameRate: 11,
                    frameBuffer: 3,
                    loop: true,
                    imageSrc: '/img/king/idleLeft.png'
                },
                runRight: {
                    frameRate: 8,
                    frameBuffer: 4,
                    loop: true,
                    imageSrc: '/img/king/runRight.png'
                },
                runLeft: {
                    frameRate: 8,
                    frameBuffer: 4,
                    loop: true,
                    imageSrc: '/img/king/runLeft.png'
                },
                enterDoor: {
                    frameRate: 8,
                    frameBuffer: 4,
                    loop: false,
                    imageSrc: '/img/king/enterDoor.png',
                    onComplete: () => {
                        gsap.to(overlay, {
                            opacity: 1,
                            onComplete: () => {
                                level++;
                                if (level === 4) level = 1;
                                levels[level].init();
                                setupEventListeners(player, keys, setCanJump, doors);
                                setCanJump(true); // Update the state
                                player.switchSprite('idleRight');
                                player.preventInput = false;
                                gsap.to(overlay, {
                                    opacity: 0
                                });
                            }
                        });
                    }
                }
            }
        });

        let level = 1;
        const levels = {
            1: {
                init: () => {
                    parsedCollisions = collisionsLevel1.parse2D();
                    collisionBlocks = parsedCollisions.createObjectsFrom2D(c);
                    player.collisionBlocks = collisionBlocks;

                    if (player.currentAnimation) player.currentAnimation.isActive = false;

                    background = new Sprite({
                        c,
                        position: {
                            x: 0,
                            y: 0
                        },
                        imageSrc: '/img/backgroundLevel1.png'
                    });

                    doors = [
                        new Sprite({
                            c,
                            position: {
                                x: 766,
                                y: 272
                            },
                            imageSrc: '/img/doorOpen.png',
                            frameRate: 5,
                            frameBuffer: 5,
                            loop: false,
                            autoplay: false
                        })
                    ];
                }
            },
            2: {
                init: () => {
                    parsedCollisions = collisionsLevel2.parse2D();
                    collisionBlocks = parsedCollisions.createObjectsFrom2D(c);
                    player.collisionBlocks = collisionBlocks;
                    player.position.x = 98;
                    player.position.y = 158;

                    if (player.currentAnimation) player.currentAnimation.isActive = false;

                    background = new Sprite({
                        c,
                        position: {
                            x: 0,
                            y: 0
                        },
                        imageSrc: '/img/backgroundLevel2.png'
                    });

                    doors = [
                        new Sprite({
                            c,
                            position: {
                                x: 772,
                                y: 336
                            },
                            imageSrc: '/img/doorOpen.png',
                            frameRate: 5,
                            frameBuffer: 5,
                            loop: false,
                            autoplay: false
                        })
                    ];
                }
            },
            3: {
                init: () => {
                    parsedCollisions = collisionsLevel3.parse2D();
                    collisionBlocks = parsedCollisions.createObjectsFrom2D(c);
                    player.collisionBlocks = collisionBlocks;
                    player.position.x = 750;
                    player.position.y = 230;

                    if (player.currentAnimation) player.currentAnimation.isActive = false;

                    background = new Sprite({
                        c,
                        position: {
                            x: 0,
                            y: 0
                        },
                        imageSrc: '/img/backgroundLevel3.png'
                    });

                    doors = [
                        new Sprite({
                            c,
                            position: {
                                x: 176,
                                y: 335
                            },
                            imageSrc: '/img/doorOpen.png',
                            frameRate: 5,
                            frameBuffer: 5,
                            loop: false,
                            autoplay: false
                        })
                    ];
                }
            }
        };

        const overlay = {
            opacity: 0
        };

        function animate() {
            window.requestAnimationFrame(animate);

            background.draw();

            doors.forEach((door) => {
                door.draw();
            });

            player.handleInput(keys);
            player.draw();
            player.update();

            // Level switch
            c.save();
            c.globalAlpha = overlay.opacity;
            c.fillStyle = 'black';
            c.fillRect(0, 0, canvas.width, canvas.height);
            c.restore();
        }

        levels[level].init();
        setupEventListeners(player, keys, setCanJump, doors);
        animate();

        return () => {
            window.removeEventListener('keydown', setupEventListeners);
            window.removeEventListener('keyup', setupEventListeners);
        };
    }, []);

    return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;