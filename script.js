const enterbtn = document.querySelector('.enterbtn');
const displayDiv = document.querySelector('.displayExp');
const displayResult = document.querySelector('.displayResult');
const numArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const opArray = ["+", "-", "*", "/", "^"];
const parensArray = ["(", ")"];
let userInputArr = [];
let currNum = '';
let lastArrItem = userInputArr[userInputArr.length - 1];
let result = '';

//clears all after a result
window.addEventListener("keydown", (e) => {
    if(result === ""){
        return;
    }
    if(result !== ""){
        userInputArr = [];
        currNum = '';
        result = '';
        displayDiv.textContent = '';
        displayResult.textContent = '';
    }
})

//click button calc
enterbtn.addEventListener('click', () => {
})

//enter
window.addEventListener('keydown', (e) => {

    makeSureParensAreBalanced(userInputArr);

    if(e.key === "Enter"){
        if(currNum !== ''){
            userInputArr.push(currNum);
            currNum = '';
        }
        if(opArray.includes(userInputArr[userInputArr.length - 1])){
            return;
        }

        //not comparing exponents to anything, just running it first:
        //which is why it's not "check"exponents.
        checkArrForParens(userInputArr);
        exponents(userInputArr);
        checkArrForMultAndDiv(userInputArr);
        checkArrForAddAndSub(userInputArr);

        result = userInputArr;
        displayResult.textContent = result;
        userInputArr = [];
        return result;
    }
})

//numbers - user input
window.addEventListener('keydown', (e) => {
    if(numArray.includes(e.key)){

        checkCurrNumIsSetLastItemOfArr();

        if(currNum.includes(".") && e.key === '.'){
            return;
        }
        currNum += e.key;
        displayDiv.textContent += `${e.key}`;
    }
})

//sets currNum as last item in Arr. (userInputArr)
const checkCurrNumIsSetLastItemOfArr = () => {
    if(userInputArr.length > 0){
        if(userInputArr[userInputArr.length - 1] === "*"){
            return;
        }
        else if(userInputArr[userInputArr.length - 1] === "/"){
            return;
        }
        else if(userInputArr[userInputArr.length - 1] === "+"){
            return;
        }
        else if(userInputArr[userInputArr.length - 1] === "-"){
            return;
        }
        else if(userInputArr[userInputArr.length - 1] === "^"){
            return;
        }
        else if(userInputArr[userInputArr.length - 1] === ")"){
            return;
        }
        else if(userInputArr[userInputArr.length - 1] === "("){
            return;
        }
        else if(userInputArr[userInputArr.length - 1] === ""){
            return;
        }
        currNum = userInputArr.pop();
    }
}

//operand (op) - user input
window.addEventListener('keydown', (e) => {
    if(opArray.includes(e.key)){
        currNumCheckIfEmpty();
        if(userInputArr.length === 0){
            return;
        }
        if(userInputArr[userInputArr.length -1] === ("+" || "-" || "*" || "/" || "^" || "(")){
            return;
        }
        userInputArr.push(e.key)
        displayDiv.textContent += ` ${e.key} `;
        currNum = '';
    }
})

//parens ( ) - user input
window.addEventListener('keydown', (e) => {
if(parensArray.includes(e.key)){
    if(currNum !== ''){
        userInputArr.push(currNum);
        currNum = '';
    }

    if(userInputArr.length === 0 && e.key === ")"){
        return;
    }
    
    if(userInputArr.length > 0 && e.key === "("){
        if(userInputArr[userInputArr.length -1] !== ("+" || "-" || "*" || "/" || "^")){
            userInputArr.push("*");
        }
    }
    currNum = '';
    userInputArr.push(e.key);
    displayDiv.textContent += ` ${e.key} `;
    }
})

//backspace 
window.addEventListener('keydown', (e) => {
    if(e.key === "Backspace"){    
        
        if(currNum === ""){
            if(typeof(userInputArr[userInputArr.length - 1]) === "undefined"){
                return;
            }

            if(displayDiv.textContent.endsWith(" ")){
                displayDiv.textContent = displayDiv.textContent.slice(0, -3);
                userInputArr.pop();
                return
            };
            
            displayDiv.textContent = displayDiv.textContent.slice(0, -1);
    
            if(userInputArr[userInputArr.length - 1].length === 1){
                userInputArr.pop();
                return;
            }
    
            if(userInputArr[userInputArr.length - 1].length > 1){
                userInputArr[userInputArr.length - 1] = userInputArr[userInputArr.length - 1].slice(0, -1);
                return;
            }
        }
        else{
            currNum = currNum.slice(0,-1);
            displayDiv.textContent = displayDiv.textContent.slice(0,-1);
        }
        
    }
})

//logic for a op b
const compute = (num1, op, num2) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
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
const multDivOrAddSub = (x, op1, op2) => {
    //check if userArr contains either multilply/divide OR add/sub
    if(!x.includes(op1) && !x.includes(op2)){
        return;
    }

    //if this function does not find one of the arguments, but does find the other arg
    //run the other arg
    if(!x.includes(op1) && x.includes(op2)){
        return runOperand(x,op2)
    }
    //see above
    if(x.includes(op1) && !x.includes(op2)){
        return runOperand(x, op1)
    }

    //goes through left to right: mult/div and add/sub by their index
    let item1 = x.indexOf(op1);
    let item2 = x.indexOf(op2);
    if(item1 < item2){
        return runOperand(x, op1)
    }
    else {
        return runOperand(x, op2)
    }
}

//logic to run compute on any operand. +,-,*,/
const runOperand = (x, op) => {
    if(!x.includes(op)){
        return;
    };
    let opIndex = x.indexOf(op);
    let a = x[opIndex - 1];
    a = parseFloat(a);
    let b = x[opIndex + 1];
    b = parseFloat(b);
    compute(a, op, b);
    x[opIndex - 1] = result;
    x.splice(opIndex, 2);
}

//parens // split by parens
const chunkArrByParens = (x) => {
    for(let i=0; i<x.length; i++){
    }
    
    let firstClosingBracket = x.indexOf(")");
    
    let highestIndex = 0;
    
    for(let i=0; i<firstClosingBracket; i++){
        if(x[i] === "("){
            highestIndex = i;
        }
    }
    
    let myArr = x.map(x => x);
    
    let arr2 = myArr.slice(highestIndex + 1, firstClosingBracket);
    
    if(arr2.length === 1){
        x.splice(firstClosingBracket, 1);
        x.splice(highestIndex, 1);
    }
    
    if(arr2.length > 1){
        x.splice(highestIndex + 1, 1)
        let arr2Len = arr2.length;
        exponents(arr2);
        checkArrForMultAndDiv(arr2);
        checkArrForAddAndSub(arr2);
        x[highestIndex] = result;
        x.splice(highestIndex + 1, arr2Len);
    }
}

//parens === true/false
const checkArrForParens = (x) => {
    if(x.includes("(") && x.includes(")")){
        chunkArrByParens(x)
        if(x.includes("(") && x.includes(")")){
            return checkArrForParens(x);
        }
    }
    else{
        return;
    }
}

//exponents logic
const exponents = (x) => {
    if(x.includes("^")){
        runOperand(x, "^");
    }
}

//mult and div logic
const checkArrForMultAndDiv = (x) => {
    if(x.includes("*") || x.includes("/")){
        multDivOrAddSub(x, "*", "/");
        if(x.includes("*") || x.includes("/")){
            return checkArrForMultAndDiv(x);
        }
        else{
            return;
        }
    }
}

//add and sub logic
const checkArrForAddAndSub = (x) => {
    if(x.includes("+") || x.includes("-")){
        multDivOrAddSub(x, "+", "-");
        if(x.includes("+") || x.includes("-")){
            return checkArrForAddAndSub(x);
        }
        else{
            return;
        }
    }
}

//is curr empty
const currNumCheckIfEmpty = () => {
    if(currNum !== ''){
        userInputArr.push(currNum);
        currNum = '';
    }
}

// balanced parens check
const makeSureParensAreBalanced = (x) => {
    let openBracketCount = 0;
    let closingBracketCount = 0;
    for(let i=0; i<x.length; i++){
    if(x[i] === "("){
        openBracketCount++;
    }
    if(x[i] === ")"){
        closingBracketCount++;
    }
    }
    if(openBracketCount !== closingBracketCount){
    }

    if(openBracketCount === closingBracketCount){
    }
}
