const PRECISION = 100000;

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
    const maxLength = Math.max(operandOne.toString().length + 1, operandTwo.toString().length + 1);
    let fontSizeNew = maxLength > 9 
        ? Math.max(fontSize - Math.round((maxLength - 9) * 3.5), fontSize - Math.round(9 * 3.5))
        : fontSize;
    displayOne.style.fontSize = displayTwo.style.fontSize = fontSizeNew + 'px';
    displayOne.textContent = operandOne;
    if (!operationType && isFractionalPart && (operandOne % 1 === 0)) {
        displayOne.textContent += '.';
        for (let i = isFractionalPart; i < 0.1; i *= 10) {
            displayOne.textContent += 0;
        }
    }
    if (operationType) {
        displayOne.textContent += operationType;
        displayTwo.textContent = operandTwo;
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

let fontSize = 56;
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
                const fraction = Math.round(1 / isFractionalPart);
                operandOne = Math.round(operandOne * fraction) / fraction;
                isFractionalPart /= 10;
            } else {
                operandOne *= 10;
                operandOne += +event.target.textContent;
            }
        } else {
            if (isFractionalPart) {
                operandTwo += isFractionalPart * +event.target.textContent;
                const fraction = Math.round(1 / isFractionalPart);
                operandTwo = Math.round(operandTwo * fraction) / fraction;
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
            operandOne = Math.round(operate(operationType, operandOne, operandTwo) * PRECISION) / PRECISION;
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
