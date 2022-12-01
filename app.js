// Selecting the only div present in the html
const output = document.querySelector('.myDiv');
output.innerHTML = '';

const message = makerElement(output, 'div', 'message', 'message');

const gameArea = makerElement(output, 'div', '', 'gameArea');

const btn = makerElement(output, 'button', 'SPIN', 'btn');


// setting up all the game object

const game = {
    total: 4, inPlay: false, coins: 100, speed: 5,
    totItems: 3, main: []
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
        stopGamePlay();

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
            el.faceValue = x + 1
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
        stopGamePlay();
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
                if (el.mover == 0 && elY % 50 != 0){
                     el.mover++;}
                el.style.top = elY + 'px';
            }else{
                let viewEl = el.children[2];
                let outputVal = elY == -200 ? viewEl.faceValue : '-';
                let tempObj = {
                    'txt' : viewEl.faceValue,
                    'elY' : elY,
                    'outputV' : outputVal,
                    'output' : viewEl.textContent
                }
                holder.push(tempObj);
            }
        }

        if (holder.length >= game.total){
            stopGamePlay();
            holder.sort();
            console.log(holder);
            const myObj ={};
            holder.forEach((val)=>{
                if (val.outputV != '-'){
                    if(myObj[val.outputV]){
                        myObj[val.outputV]++;
                    }else{
                        myObj[val.outputV] = 1;
                    }
                }
            });
            payout(myObj);
        }
        if (game.inPlay) {
        game.ani = requestAnimationFrame(spin);
    }

}

function payout(score){
    for (const prop in score){
        let val = Number(score[prop]);
        console.log(prop + 'x' + val);
        let basePay = game.total /2;
        if (val >= 2){
            let totalPaid = Math.floor(val * basePay);
            if (prop == '2'){
                console.log('You got more than 2 - 2s');
                totalPaid *= 5;
            }
            game.coins += totalPaid;
            let html = `Number ${prop} is out ${val} times. Payout ${totalPaid} Coins ${game.coins}`;
            updateMessage(html);
        }

    }
}

function stopGamePlay(){
    game.inPlay = false;
    cancelAnimationFrame(game.ani);
    btn.textContent = 'SPIN';
    btn.style.backgroundColor = 'green';
}