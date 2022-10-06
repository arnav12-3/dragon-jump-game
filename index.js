let audioback = new Audio('music.mp3')
let audiogo = new Audio('gameover.mp3');

setTimeout(() => {
    audioback.play();
}, 1000)
document.onkeydown = function (e) {
    console.log("Key code is : ", e.key)
    if (e.key == ' ') {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }
    if (e.key == "d") {
        dino = document.querySelector('.dino');
        dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinox + 112 + 'px';
    }
    if (e.key == 'a') {
        dino = document.querySelector('.dino');
        dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinox - 112) + 'px';
    }
}

let score = 0;
let cross = true;
setInterval(() => {
    dino = document.querySelector('.dino');
    gameover = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'))

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'))

    let offsetx = Math.abs(dx - ox);
    let offsety = Math.abs(dy - oy);
    if (offsetx < 63 && offsety < 52) {
        gameover.innerHTML = 'Game Over - Reload to Play Again ';
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        dino.style.bottom = '-1000px'
        dino.classList.add('endDino');
        setTimeout(() => {

            dino.classList.remove('endDino');

        }, 700)
        setTimeout(() => {
            audiogo.pause();
            audioback.pause();
        }, 1000);
    } else if (offsetx < 170 && cross) {
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
        }, 500)

    }
}, 10);


function updateScore(score) {
    scoreCount.innerHTML = "Your Score " + score;
}