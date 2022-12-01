const basicOperations = {
    add: (a, b) => a + b,
    substract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
};

function operate (operator, a, b) {
    a = Number(a);
    b = Number(b);
    return basicOperations[operator](a, b);
}

let data = new Object();
function reset() {
    data = {first: "", second: "", operator: "", screen: 0};
}
reset();

const screen = document.querySelector('.visor');
function display() {
    screen.textContent = data.screen;
}

const btns = document.querySelectorAll('.btn');    
btns.forEach( item => item.addEventListener( 'click', () => {
        
}));
