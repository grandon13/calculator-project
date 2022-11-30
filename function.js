const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const basicOperations = {add, substract, multiply, divide};

function operate (operator, a, b) {
    return basicOperations[operator](a, b);
}