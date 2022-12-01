const basicOperations = {
    add: (a, b) => a + b,
    substract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
};

function operate (operator, a, b) {
    a = Number(a);
    b = Number(b);
    
    let total = basicOperations[operator](a, b);
    let magnitude = Math.floor(Math.log10(total));
    let decimals = 9 - magnitude;

    if (magnitude > 9) {
        return NaN;
    }

    total = Math.round( total * (10 ** decimals)) / 10 ** decimals;
    return total;
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
        if (item.classList[1] === 'del') {
            data.first = data.first.slice(0, data.first.length -1);
            display(data.first);
        }

        if (item.classList[1] === 'pad' && data.first.length < 10) {
            data.second = "";
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
        if (item.classList[1] === 'del') {
            data.second = data.second.slice(0, data.second.length -1);
            display(data.second);
        }

        if (item.classList[1] === 'pad' && data.second.length < 10) {
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
