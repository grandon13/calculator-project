const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const basicOperations = {add, substract, multiply, divide};
const screen = document.querySelector('.visor');
const btns = document.querySelectorAll('.btn');
let data = new Object();

function operate (operator, a, b) {
    a = Number(a);
    b = Number(b);
    return basicOperations[operator](a, b);
}

function reset() {
    data = {first: "", second: "", operator: "", screen: 0, stage: 0};
}

function display() {
    screen.textContent = data.screen;
}

reset(0);
    
btns.forEach(item => item.addEventListener('click', () => {
        
    if(! data.stage) {
        if(item.classList[1] === 'pad') {
            data.first += item.id;
            data.screen = data.first;
            display();
        }
        else if (item.classList[1] === 'op') {            
            data.operator = item.id;
            console.log(data.operator);
            data.stage++;
        }
        else if(item.classList[1] === 'ac') {
            reset();
            display();
        }
    }

    else if (data.stage === 1){
        if(item.classList[1] === 'pad') {
            data.second += item.id;
            data.screen = data.second;
            display();
        }
        else if (item.classList[1] === 'equal'){
            data.screen = operate(data.operator, data.first, data.second);
            display();
            data.operator = "";
            data.first = data.screen;
            data.second = "";
        }
        else if(item.classList[1] === 'ac') {
            reset();
            display();
        }
        else if (item.classList[1] === 'op' && data.second) {
            data.screen = operate(data.operator, data.first, data.second);
            display();
            data.operator = item.id;
            console.log(data.operator);
            data.first = data.screen;
            data.second = "";
        }
        
    }
    else if(item.classList[1] === 'ac') {
        reset();
        display();
    }
}));
