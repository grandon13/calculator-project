let data = {first: "", second: "", operator: ""};

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
    let magnitude = total !== 0 ? Math.floor(Math.log10(Math.abs(total))) : 0;    
    let decimals = 9 - magnitude;

    if (magnitude > 9) {
        return NaN;
    }

    total = Math.round( total * (10 ** decimals)) / 10 ** decimals;
    return total;
}

const screen = document.querySelector('.visor');
function display(a) {
    a = a.toString();
    if(Number(a) === 0 && a.indexOf('.') < 0 && a.indexOf('-') < 0) {
        a = Number(a);
    }        
        screen.textContent = a;
}

let firstZero = false;
const btns = document.querySelectorAll('.btn');    
btns.forEach( item => item.addEventListener( 'click', () => {

    if (item.classList[1] === 'ac') {
        data = {first: "", second: "", operator: ""}
        display('0');
    }

    if (!data.operator) {
        if (item.classList[1] === 'del') {
            data.first = data.first.slice(0, data.first.length - 1);
            display(data.first);
        }

        if (item.classList[1] === 'pad' && data.first.length < 10) {
            data.second = "";

            if (!firstZero) {             
                data.first += item.id;
                display(data.first);
                firstZero = data.first === '0';
            }
            else {
                data.first = item.id;
                display(data.first);
                firstZero = data.first === '0';
            }
        }

        else if (!data.first && item.id === 'substract') {
            data.first = '-';
            display(data.first);
            firstZero = false;
        }

        else if (data.first && item.classList[1] === 'op') {
            data.operator = item.id;
            firstZero = false;
        }

        else if (data.second && item.classList[1] === 'op') {
            data.first = data.second;
            data.second = "";
            data.operator = item.id;
            firstZero = false;
        }
        else if( data.first.length > 0 && data.first.indexOf('.') < 0 && item.classList[1] === 'dot') {
            data.first += item.id;
            display(data.first);
            firstZero = false;
        }
    }

    else {
        if (item.classList[1] === 'del') {
            data.second = data.second.slice(0, data.second.length -1);
            display(data.second);
        }

        if (item.classList[1] === 'pad' && data.second.length < 10) {
            if (!firstZero) {             
                data.second += item.id;
                display(data.second);
                firstZero = data.second === '0';
            }
            else {
                data.second = item.id;
                display(data.second);
                firstZero = data.second === '0';
            }
        }

        else if (!data.second && item.id === 'substract') {
            data.second = '-';
            display(data.second);
            firstZero = false;
        }

        else if (data.second && item.classList[1] === 'op') {
            data.first = operate(data.operator, data.first, data.second);
            display(data.first);
            data.second = "";
            data.operator = item.id;
            firstZero = false;
        }

        else if (data.second && item.classList[1] === 'equal') {
            data.second = operate(data.operator, data.first, data.second);
            display(data.second);
            data.first = "";
            data.operator = "";
            firstZero = false;
        }

        else if( data.second.length > 0 && data.second.indexOf('.') < 0 && item.classList[1] === 'dot') {
            data.second += item.id;
            display(data.second);
            firstZero = false;
        }
    }
}));
