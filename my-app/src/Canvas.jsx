import React, { useEffect, useRef, useState } from 'react';
import Player from './components/classes/Player';
import Sprite from './components/classes/Sprite';
import { setupEventListeners } from './components/EventListeners';

const Canvas = () => {
    const canvasRef = useRef(null);
    const [canJump, setCanJump] = useState(true);
    const keys = { a: { pressed: false }, d: { pressed: false } };

    useEffect(() => {
        const canvas = canvasRef.current;
        const c = canvas.getContext('2d');

        canvas.width = 64 * 16;
        canvas.height = 64 * 9;

        const backgroundLevel1 = new Sprite({
            c,
            position: {
                x: 0,
                y: 0
            },
            imageSrc: '/img/backgroundLevel1.png'
        })

        const player = new Player(c, canvas);

        setupEventListeners(player, keys, setCanJump);
        
        function animate() {
            window.requestAnimationFrame(animate)

            backgroundLevel1.draw()

            player.velocity.x = 0
            if (keys.d.pressed) player.velocity.x = 5
            else if (keys.a.pressed) player.velocity.x = -5
            
            player.draw()
            player.update() 
            
        }

        animate()

        return () => {
            window.removeEventListener('keydown', setupEventListeners);
            window.removeEventListener('keyup', setupEventListeners);
        };
    }, []);

    return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;
