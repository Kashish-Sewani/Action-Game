score = 0;
cross = true;

audio = new Audio('music/music.mp3');
audiogo = new Audio('music/gameover.mp3');
setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    // Handle the "up arrow" key
    if (e.keyCode == 38) {
        let dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }
    // Handle the "right arrow" key
    else if (e.keyCode == 39) {
        let dino = document.querySelector('.dino');
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX + 112) + "px";
    }

     // Handle the "left arrow" key
    else if (e.keyCode == 37) {
        let dino = document.querySelector('.dino');
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

// Check for collisions and update score every 10ms
setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameover');
    obstacle = document.querySelector('.obstacle');

    // Get current positions of dino and obstacle
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

      // Calculate distance between dino and obstacle
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    // Check for collision
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML="Game Over - Reload to Play Again";
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    // Update score and increase obstacle speed when dino successfully crosses obstacle
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 10);

// Function to update score
function updateScore(score) {
    scoreCont.innerHTML = "Your Score:" + score
}