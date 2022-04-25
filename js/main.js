const N_NUMBERS = 6;
const mysteryNumber = generateMysteryNumber();
var input = "";
var turn = 5;
var gamecheck = false;
console.log(mysteryNumber);

document.addEventListener('keydown', (event) => {
    let key = event.key;
    inputKey(key);
}, false);

function inputKey(key){
    if(turn == 0) {return}
    
    if(gamecheck || key == " "){
        input = "";
        clearBoxNumbres();
        gamecheck = false;
    }

    if(key.match("[0-9]") && input.length < N_NUMBERS){
        input += key;
        updateBoxNumebrs();
    }
    if(input.length === N_NUMBERS){
        takeTurn();
        validateReloadGame();
        game();
        gamecheck = true;
    }
    if(key == "Backspace"){
        input = input.slice(0,-1);
        updateBoxNumebrs();
    }
}

function updateBoxNumebrs(){
    clearBoxNumbres();
    let numbers = input.split("");
    let position = 1;
    numbers.forEach(number =>{
        let id =  "boxn-" + position;
        document.getElementById(id).innerHTML = number;
        animateInput(position);
        position++;
    });
}

function clearBoxNumbres(){
    for(let i = 1 ; i <= N_NUMBERS; i++){
        let id =  "boxn-" + i;
        document.getElementById(id).innerHTML = "";
        clearAnimateInput(i);
    }
    clearAnimateBox();
}

function generateMysteryNumber(){
    let min = Math.pow(10, N_NUMBERS - 1);
    let max = min * 9;
    let number = Math.floor(Math.random()* max) + min;
    return number.toString();
}

function game(){
    let actual = input.split("");
    let expected = mysteryNumber.split("");
    let countOk = 0;
    
    for(let i = 0; i < N_NUMBERS; i++){
        let box = i + 1;
        if(actual[i] === expected[i]){
            setGreen(box);
            actual[i] = "-1"; 
            expected[i] = "-2";
            countOk++;
        }else{ setGray(box); }
    }

    for(let i = 0; i < N_NUMBERS; i++){
        let box = i + 1;
        if(existNumber(actual[i], expected)){
            setYellow(box);
            let indexExist = expected.indexOf(actual[i]);
            expected[indexExist] = "-2";
        }
    }

    animateBox();
    if(countOk == N_NUMBERS){ winGame(); }
}

function existNumber(number, arr){
    return arr.indexOf(number) >= 0;
}

function setGreen(boxnumber){
    clearBoxClass(boxnumber);
    document.getElementById("boxn-" + boxnumber).classList.add("box-green");
}

function setYellow(boxnumber){
    clearBoxClass(boxnumber);
    document.getElementById("boxn-" + boxnumber).classList.add("box-yellow");
}

function setGray(boxnumber){
    clearBoxClass(boxnumber);
    document.getElementById("boxn-" + boxnumber).classList.add("box-gray");
}

function clearBoxClass(boxnumber){
    document.getElementById("boxn-" + boxnumber).className = "";
    document.getElementById("boxn-" + boxnumber).classList.add("boxnum");
    document.getElementById("boxn-" + boxnumber).classList.add("m-2");
}

function equals_numbers(str){
    let n = str.split("");
    let w = n[0];
    for(let i of n)
        if(i !== w)
            return false;
    return true;
}

function takeTurn(){
    if(turn > 0){
        this.turn -= 1;
        document.getElementById("num-turn").innerHTML = turn;
    }
}

function validateReloadGame(){
    if(this.turn == 0){
        document.getElementById("btn-reload").classList.remove("hidden-element");
    }
}

function pressKeyboard(key){
    inputKey(key.toString());
}

function animateInput(boxnumber){
    document.getElementById("boxn-" + boxnumber).classList.remove("pulse-input");
    document.getElementById("boxn-" + boxnumber).classList.add("pulse-input");
}

function clearAnimateInput(boxnumber){
    document.getElementById("boxn-" + boxnumber).classList.remove("pulse-input");
}

function winGame(){
    this.turn = 0;
    animateWinGame();
    console.log("Felicitaciones");
    document.getElementById("col-turns").innerHTML = getWinElement();
    validateReloadGame();
}

function animateBox(){
    for(let boxnumber = 1 ; boxnumber <= N_NUMBERS; boxnumber++){
        document.getElementById("boxn-" + boxnumber).classList.remove("animate-box");
        document.getElementById("boxn-" + boxnumber).classList.add("animate-box");
    }
}

function clearAnimateBox(){
    for(let boxnumber = 1 ; boxnumber <= N_NUMBERS; boxnumber++){
        document.getElementById("boxn-" + boxnumber).classList.remove("animate-box");
    }
}

function animateWinGame(){
    for(let boxnumber = 1 ; boxnumber <= N_NUMBERS; boxnumber++){
        document.getElementById("boxn-" + boxnumber).classList.add("animate-delay-" + boxnumber);
        document.getElementById("boxn-" + boxnumber).classList.add("animate-win");
    }
}

function getWinElement(){
    return `<h5 class="display-6"> ¡Felicitaciones! Encontraste el número oculto</h5>`;
}

function getBoxNumElement(boxnum){
    return `<div class="boxnum m-2" id="boxn-${boxnum}"></div>`;
}