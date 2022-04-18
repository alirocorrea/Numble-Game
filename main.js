const n_numbers = 6;
var input = "";
var mysteryNumber = generateMysteryNumber();
var turn = 5;
let gamecheck = false;

console.log(mysteryNumber);

document.addEventListener('keydown', (event) => {
    let key = event.key;

    if(gamecheck || key == " "){
        input = "";
        clearBoxNumbres();
        gamecheck = false;
    }
    if(key.match("[0-9]") && input.length < n_numbers){
        input += key;
        updateBoxNumebrs();
    }
    if(input.length === n_numbers && turn != 0){
        takeTurn();
        game();
        gamecheck = true;
    }
    if(key == "Backspace"){
        input = input.slice(0,-1);
        updateBoxNumebrs();
    }
}, false);

function updateBoxNumebrs(){
    clearBoxNumbres();
    let numbers = input.split("");
    let position = 1;
    numbers.forEach(number =>{
        let id =  "boxn-" + position;
        document.getElementById(id).innerHTML = number;
        position++;
    });
}

function clearBoxNumbres(){
    for(let i = 1 ; i <= n_numbers; i++){
        let id =  "boxn-" + i;
        document.getElementById(id).innerHTML = "";
    }
}

function generateMysteryNumber(){
    let min = Math.pow(10, n_numbers - 1);
    let max = min * 9;
    let number = Math.floor(Math.random()* max) + min;
    return number.toString();
}

function game(){
    let actual = input.split("");
    let expected = mysteryNumber.split(""); 
    let countOk = 0;
    for(let i = 0; i < n_numbers; i++){
        let boxnumber = i + 1;
        if(expected[i] == actual[i]){
            setGreen(boxnumber);
            expected[i] = "";
            countOk++;
        }else{
            setGray(boxnumber)
        }
    }
    for(let i = 0; i < n_numbers; i++){
        let boxnumber = i + 1;
        if(expected.indexOf(actual[i]) >= 0){
            setYellow(boxnumber);
            expected[expected.indexOf(actual[i])] = "";
        }
    }
    if(countOk == n_numbers)
        alert("Felicitaciones");
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
}

function imprimirArray(arr){
    let res = ""; 
    arr.forEach(x =>{
        res += x + " "; 
    });
    console.log(res);
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