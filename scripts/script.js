const PRECISION = 10 ** 10;

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
    displayOne.textContent = Math.round(operandOne * PRECISION) / PRECISION;
    if (!operationType && isFractionalPart && (operandOne % 1 === 0)) {
        displayOne.textContent += '.';
        for (let i = isFractionalPart; i < 0.1; i *= 10) {
            displayOne.textContent += 0;
        }
    }
    if (operationType) {
        displayOne.textContent += operationType;
        displayTwo.textContent = Math.round(operandTwo * PRECISION) / PRECISION;
        if (isFractionalPart && (operandTwo % 1 === 0)) {
            displayTwo.textContent += '.';
            for (let i = isFractionalPart; i < 0.1; i *= 10) {
                displayTwo.textContent += 0;
            }
        }
    } else {
        displayTwo.textContent = '';
    }
}

let operandOne = 0;
let operandTwo = 0;
let operationType = null;
let isFractionalPart = false;

const displayOne = document.querySelector('.operand-one');
const displayTwo = document.querySelector('.operand-two');
updateDisplay();

const numButtons = document.querySelectorAll('.number');
numButtons.forEach(button => {
    button.addEventListener('click', event => {
        if (!operationType) {
            if (isFractionalPart) {
                operandOne += isFractionalPart * +event.target.textContent;
                isFractionalPart /= 10;
            } else {
                operandOne *= 10;
                operandOne += +event.target.textContent;
            }
        } else {
            if (isFractionalPart) {
                operandTwo += isFractionalPart * +event.target.textContent;
                isFractionalPart /= 10;
            } else {
                operandTwo *= 10;
                operandTwo += +event.target.textContent;
            }
        }
        updateDisplay();
    });
});

// Обновить тип операции
const updateCalculationsData = opType => {
    if (!operationType || !operandTwo) {
        operationType = opType;
        isFractionalPart = false;
    }
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
            isFractionalPart = false;
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
    isFractionalPart = false;
    updateDisplay();
}

const clearButton = document.querySelector('.operation-clear');
clearButton.addEventListener('click', resetData);

const dotButton = document.querySelector('.operation-dot');
dotButton.addEventListener('click', () => {
    if (!isFractionalPart) {
        isFractionalPart = 0.1;
        updateDisplay();
    }
});
