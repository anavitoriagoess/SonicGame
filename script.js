const deno = document.querySelector('.sonic-deno');
const background = document.querySelector('.background')
let position = 0;
let isJumping = false;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}
function jump() {
    isJumping = true; 

    let upInterval = setInterval(() => {
        if (position >= 200) {
            clearInterval(upInterval);

            // desce 
            let downInterval = setInterval(() =>  {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 30;
                    deno.style.bottom = position + 'px';
                }
            }, 30);
        } else { 
            // sobe
            position += 30;
            deno.style.bottom = position + 'px';
        }
    }, 30);
}
function creatRings() {
    const rings = document.createElement('div');
    let ringsPosition = 1300;
    let randomTime = Math.random() * 6000;

    rings.classList.add('rings');
    rings.style.left = 1300 + 'px';
    background.appendChild(rings);

    let leftInterval = setInterval(() => {
        if (ringsPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(rings);
        } else if (ringsPosition > 0 && ringsPosition < 60 && position < 60){
            // game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">game over</h1>'
        } else {
            ringsPosition -= 10; // velocidade que se move para esquerda
            rings.style.left = ringsPosition + 'px';
        }
    }, 20);

    setTimeout(creatRings, randomTime);
}

creatRings();
document.addEventListener('keyup', handleKeyUp);