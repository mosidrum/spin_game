// Selecting the only div present in the html
const output = document.querySelector('.myDiv');
output.innerHTML = '';

const message = makerElement(output, 'div', 'message', 'message');

const gameArea = makerElement(output, 'div', '', 'gameArea');

const btn = makerElement(output, 'button', 'SPIN', 'btn');


// setting up all the game object

const game = {
    total: 3, inPlay: false, coins: 100, speed: 5,
    totItems: 8, main: []
};
let spinner = 500;

// listening to the DOM
window.addEventListener('DOMContentLoaded', init);


// clicking the button to spin or stop
btn.addEventListener('click', (e) => {
    if (btn.textContent == 'SPIN' && !game.inPlay) {
        btn.textContent = 'STOP'
        btn.style.backgroundColor = 'red';
        spinner = 500;
        startSpin();
    } else {
        game.inPlay = false;
        cancelAnimationFrame(game.ani);
        btn.style.backgroundColor = 'green';
        btn.textContent = 'SPIN'
    }

})

function init() {
    //console.log('ready');
    btn.style.backgroundColor = 'green';
    gameArea.style.width = game.total * 100 + 'px';
    let leftPos = (document.body.clientWidth - (game.total * 100)) / 2;
    //console.log(leftPos);
    gameArea.style.left = leftPos + 'px';

    for (let i = 0; i < game.total; i++) {

        game.main[i] = makerElement(gameArea, 'div', '', 'wheel')
        for (let x = 0; x < game.totItems; x++) {

            const el = makerElement(game.main[i], 'div', x + 1, 'box');
        }
        game.main[i].style.left = i * 100 + 'px';
    }
}

function makerElement(parent, ele, html, myClass) {
    const el = document.createElement(ele);
    el.classList.add(myClass);
    el.innerHTML = html;
    parent.append(el);
    return el;
}

function updateMessage(html){
    message.innerHTML = html;
}
function startSpin() {
    game.coins --;
    updateMessage(`You have ${game.coins} left.`)
    game.inPlay = true;
    spinner = 500;
    //console.log('spinning ' + game.inPlay);
    for (let i = 0; i < game.total; i++) {
        game.main[i].mover = Math.floor(Math.random() * 50) + 10;
    }
    game.ani = requestAnimationFrame(spin);
}

function spin() {
    spinner--;
    if (spinner <= 0) {
        game.inPlay = false;
        cancelAnimationFrame(game.ani);
        btn.textContent = 'SPIN'
    }

        //console.log('running');
        let holder = [];
        for (let i = 0; i < game.total; i++) {
            let el = game.main[i];
            let elY = el.offsetTop;
            //console.log(el.offsetTop)
            if (el.mover > 0) {
                el.mover--;
                //console.log(el.mover);
                elY += game.speed;
                if (elY > -150){
                    elY -= 100;
                    const last = el.lastElementChild;
                    el.prepend(last);
                }
                if (el.mover == 0 && elY % 50 != 0)
                el.mover++;
            }
            el.style.top = elY + 'px';
        }
        if (game.inPlay) {
        game.ani = requestAnimationFrame(spin);
    }

}