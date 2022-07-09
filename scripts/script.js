// Вычислить сумму двух чисел
const add = (summandOne, summandTwo) => summandOne + summandTwo;

// Вычислить разность двух чисел
const subtract = (minuend, subtrahend) => minuend - subtrahend;

// Вычислить произведение двух чисел
const multiply = (factorOne, factorTwo) => factorOne * factorTwo;

// Вычислить частное двух чисел
const divide = (numerator, denominator) => numerator / denominator;

// Выполнить заданную операцию над двумя числами
const operate = function (operationNum, operandOne, operandTwo) {
    switch (operationNum) {
        case 0:
            return add(operandOne, operandTwo);
        case 1:
            return subtract(operandOne, operandTwo);
        case 2:
            return multiply(operandOne, operandTwo);
        case 3:
            return divide(operandOne, operandTwo);
        default:
            console.log('Недопустимое значение параметра operationNum');
            return null;
    }
}