// Selecting the only div present in the html
const output = document.querySelector('.myDiv');

// Creating other elements
const gameArea = document.createElement('div');
const message = document.createElement('div');
const btn = document.createElement('button');


message.innerHTML = output.textContent;

// clearing the text content of .myDiv
output.innerHTML = '';

// sending the created elements to .myDiv
output.append(btn);
output.append(message);
output.append(gameArea);


// setting up all the game object

const game ={total:4, inPlay:false, coins:100, speed:5,
totItems:4, main:[]};

btn.textContent ='SPIN';

// clicking the button to spin or stop
btn.addEventListener('click',(e)=>{
    if(btn.textContent == 'SPIN' && !game.inPlay){
        btn.textContent = 'STOP'
        startSpin();
    }else{
        game.inPlay = false;
        btn.textContent = 'SPIN'
    }

})


function startSpin(){
    console.log('spinning ' + game.inPlay);
}