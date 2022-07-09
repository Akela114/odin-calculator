// Вычислить сумму двух чисел
const add = (summandOne, summandTwo) => summandOne + summandTwo;

// Вычислить разность двух чисел
const subtract = (minuend, subtrahend) => minuend - subtrahend;

// Вычислить произведение двух чисел
const multiply = (factorOne, factorTwo) => factorOne * factorTwo;

// Вычислить частное двух чисел
const divide = (numerator, denominator) => numerator / denominator;

// Выполнить заданную операцию над двумя числами
const operate = function (operationType, operandOne, operandTwo) {
    switch (operationType) {
        case '+':
            return add(operandOne, operandTwo);
        case '-':
            return subtract(operandOne, operandTwo);
        case '*':
            return multiply(operandOne, operandTwo);
        case '/':
            return divide(operandOne, operandTwo);
        default:
            console.log('Недопустимое значение параметра operationType');
            return null;
    }
}

// Обновить значение, отображаемое на дисплее
const updateDisplay = function () {
    display.textContent = Math.round(operandOne * 100) / 100;
    if (operationType) {
        display.textContent += operationType;
        display.textContent += Math.round(operandTwo * 100) / 100;
    }
}

let operandOne = 0;
let operandTwo = 0;
let operationType = null;

const display = document.querySelector('.calculator-display');
updateDisplay();

const numButtons = document.querySelectorAll('.number');
numButtons.forEach(button => {
    button.addEventListener('click', event => {
        if (!operationType) {
            operandOne *= 10;
            operandOne += +event.target.textContent;
        } else {
            operandTwo *= 10;
            operandTwo += +event.target.textContent;
        }
        updateDisplay();
    });
});

// Обновить тип операции
const updateCalculationsData = opType => {
    if (!operationType || !operandTwo) operationType = opType;
    else performOperation(opType);
    updateDisplay();
}

const operationButtons = document.querySelectorAll('.operation');
operationButtons.forEach(button => {
    button.addEventListener('click', event => updateCalculationsData(event.target.textContent));
});

// Выполнить операцию над операндами
const performOperation = (opType = null) => {
    if (operationType) {
        if (operandTwo || operationType != '/') {
            operandOne = operate(operationType, operandOne, operandTwo);
            operationType = opType;
            operandTwo = 0;
            updateDisplay();
        } else {
            alert('Деление на 0 не допускается');
        }
    }
}

const equalButton = document.querySelector('.operation-equal');
equalButton.addEventListener('click', () => performOperation());

// Сбросить данные
const resetData = () => {
    operandOne = 0;
    operandTwo = 0;
    operationType = null;
    updateDisplay();
}

const clearButton = document.querySelector('.operation-clear');
clearButton.addEventListener('click', resetData);