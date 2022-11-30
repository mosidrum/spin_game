// Selecting the only div present in the html
const output = document.querySelector('.myDiv');
output.innerHTML = document.body.clientWidth;

const message = makerElement(output, 'div', 'message', 'message');

const gameArea = makerElement(output, 'div', '', 'gameArea');

const btn = makerElement(output, 'button', 'SPIN', 'btn');



// clearing the text content of .myDiv


// sending the created elements to .myDiv



// setting up all the game object

const game = {
    total: 3, inPlay: false, coins: 100, speed: 5,
    totItems: 8, main: []
};
let spinner = 10;

// listening to the DOM
window.addEventListener('DOMContentLoaded', init);


// clicking the button to spin or stop
btn.addEventListener('click', (e) => {
    if (btn.textContent == 'SPIN' && !game.inPlay) {
        btn.textContent = 'STOP'
        spinner = 10;
        startSpin();
    } else {
        game.inPlay = false;
        cancelAnimationFrame(game.ani);
        btn.textContent = 'SPIN'
    }

})

function init() {
    console.log('ready');
    gameArea.style.width = game.total * 100 + 'px';
    let leftPos = (document.body.clientWidth - (game.total * 100)) / 2;
    console.log(leftPos);
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

function startSpin() {
    game.inPlay = true;
    console.log('spinning ' + game.inPlay);
    for (let i = 0; i < game.total; i++) {
        game.main[i].mover = Math.floor(Math.random() * 20);
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
    if (game.inPlay) {
        console.log('running');
        let holder = [];
        for (let i = 0; i < game.total; i++) {
            let el = game.main[i];
            let elY = el.offsetTop;
            console.log(el.offsetTop)
            if (el.mover > 0) {
                el.mover--;
                console.log(el.mover);
                elY += game.speed;
                el.style.top = elY + 'px';
            }
        }
        game.ani = requestAnimationFrame(spin);
    }

}