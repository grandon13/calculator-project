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

let data = {first: "", second: "", operator: ""};

const screen = document.querySelector('.visor');
function display(a) {
    a = Number(a);
    screen.textContent = a;
}

const btns = document.querySelectorAll('.btn');    
btns.forEach( item => item.addEventListener( 'click', () => {

    if (item.classList[1] === 'ac') {
        data = {first: "", second: "", operator: ""}
        display(0);
    }

    if (!data.operator) {
        if (item.classList[1] === 'pad') {
            data.first += item.id;
            display(data.first);
        }

        else if (data.first && item.classList[1] === 'op') {
            data.operator = item.id;
        }

        else if (data.second && item.classList[1] === 'op') {
            data.first = data.second;
            data.second = "";
            data.operator = item.id;
        }
    }

    else {
        if (item.classList[1] === 'pad') {
            data.second += item.id;
            display(data.second);
        }

        else if (data.second && item.classList[1] === 'op') {
            data.first = operate(data.operator, data.first, data.second);
            display(data.first);
            data.second = "";
            data.operator = item.id;
        }

        else if (data.second && item.classList[1] === 'equal') {
            data.second = operate(data.operator, data.first, data.second);
            display(data.second);
            data.first = "";
            data.operator = "";
        }        
    }
}));
