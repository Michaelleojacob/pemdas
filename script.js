const enterbtn = document.querySelector('.enterbtn');
const displayDiv = document.querySelector('.displayExp');
const displayResult = document.querySelector('.displayResult');
const numArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const opArray = ["+", "-", "*", "/", "^"];
const parensArray = ["(", ")"]
let expression = '';
let userInputArr = [];
let currNum = ''

//click on calc
enterbtn.addEventListener('click', () => {
    console.log('hello');
})

//keydown for enter
window.addEventListener('keydown', (e) => {
    if(e.key === "Enter"){
    }
})

//keydown for getting the user input
window.addEventListener('keydown', (e) => {
    if(numArray.includes(e.key)){
        if(currNum.includes(".") && e.key === '.'){
            return;
        }
        currNum += e.key;
        displayDiv.textContent += `${e.key}`;
        userInputArr.push(currNum);
    }
})

//checking if keydown contrains an operand (op)
window.addEventListener('keydown', (e) => {
    if(opArray.includes(e.key)){
        if(userInputArr[userInputArr.length -1] === ("+" || "-" || "*" || "/" || "^" || "(")){
            return;
        }
        userInputArr.push(e.key)
        currNum = '';
        displayDiv.textContent += ` ${e.key} `;
    }
})

//checking if keydown includes parens ( )
window.addEventListener('keydown', (e) => {
    if(parensArray.includes(e.key)){
        userInputArr.push(e.key);
        displayDiv.textContent += ` ${e.key} `;
    }
})

//backspace functionality
window.addEventListener('keydown', (e) => {
    if(e.key === "Backspace"){

        userInputArr.pop()

        if(displayDiv.textContent.endsWith(" ")){
            displayDiv.textContent = displayDiv.textContent.slice(0, -3);
            return;
        };

        displayDiv.textContent = displayDiv.textContent.slice(0, -1);
    }
})

//logic for a op b
const compute = (num1, op, num2) => {
    if(op === "+"){
        result = num1 + num2;
        return result;
    }
    if(op === "-"){
        result = num1 - num2;
        return result;
    }
    if(op === "*"){
        result = num1 * num2;
        return result;
    }
    if(op === "/"){
        result = num1 / num2;
        return result;
    }
    if(op === "^"){
        result = num1 ** num2;
        return result;
    }
}

//Will find first item left to right Mult/Div or Add/Sub
const multDivOrAddSub = (op1, op2) => {
    //check if userArr contains either multilply/divide OR add/sub
    if(!userInputArr.includes(op1) && !userInputArr.includes(op2)){
        return;
    }

    //if this function does not find one of the arguments, but does find the other arg
    //run the other arg
    if(!userInputArr.includes(op1) && userInputArr.includes(op2)){
        return runOperand(op2)
    }
    //see above
    if(userInputArr.includes(op1) && !userInputArr.includes(op2)){
        return runOperand(op1)
    }

    //goes through left to right: mult/div and add/sub by their index
    let item1 = userInputArr.indexOf(op1);
    let item2 = userInputArr.indexOf(op2);
    if(item1 < item2){
        runOperand(op1)
    }
    else {
        runOperand(op2)
    }
}

//logic to run compute on any operand. +,-,*,/
const runOperand = (op) => {
    if(!userInputArr.includes(op)){
        return;
    };
    let opIndex = userInputArr.indexOf(op);
    let a = userInputArr[opIndex - 1];
    a = parseInt(a);
    let b = userInputArr[opIndex + 1];
    b = parseInt(b);
    compute(a, op, b);
    userInputArr[opIndex - 1] = result;
    userInputArr.splice(opIndex, 2);
    console.log(userInputArr);
}

//mult and div logic
const checkArrForMultAndDiv = () => {
    if(userInputArr.includes("*") || userInputArr.includes("/")){
        multDivOrAddSub("*", "/");
        if(userInputArr.includes("*") || userInputArr.includes("/")){
            return checkArrForMultAndDiv();
        }
        else{
            return;
        }
    }
}

//add and sub logic
const checkArrForAddAndSub = () => {
    if(userInputArr.includes("+") || userInputArr.includes("-")){
        multDivOrAddSub("+", "-");
        if(userInputArr.includes("+") || userInputArr.includes("-")){
            return checkArrForAddAndSub();
        }
        else{
            return;
        }
    }
}

// userInputArr = ["1", "+", "30", "/", "3", "*", "4"];
// userInputArr = ["1", "*", "2", "*", "3"];
console.log(userInputArr);