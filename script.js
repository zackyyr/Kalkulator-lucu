const display = document.getElementById('user-input');
const numberButtons = document.querySelectorAll('.numbers');
const operatorButtons = document.querySelectorAll('.operations');

let currentNumber = "";
let previousNumber = "";
let operator = null;
let shouldResetDisplay = false;

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (shouldResetDisplay) {
            currentNumber = "";
            shouldResetDisplay = false;
        }
        if (button.innerText === "." && currentNumber.includes(".")) return;
        if (currentNumber === "0" && button.innerText !== ".") currentNumber = "";
        currentNumber += button.innerText;
        display.innerText = currentNumber;
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.innerText === "=") {
            calculate();
            return;
        }
        if (button.innerText === "AC") {
            clearAll();
            return;
        }
        if (button.innerText === "DEL") {
            deleteLast();
            return;
        }
        if (currentNumber === "") return;

        if (previousNumber !== "") calculate();

        operator = button.innerText;
        previousNumber = currentNumber;
        currentNumber = "";
        shouldResetDisplay = true;
    });
});

function calculate() {
    if (previousNumber === "" || currentNumber === "" || operator === null) return;

    const num1 = parseFloat(previousNumber);
    const num2 = parseFloat(currentNumber);
    let result;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
        case "%":
            result = num1 % num2;
            break;
        default:
            return;
    }

    display.innerText = result;
    currentNumber = result.toString();
    previousNumber = "";
    operator = null;
    shouldResetDisplay = true;
}

function clearAll() {
    currentNumber = "";
    previousNumber = "";
    operator = null;
    display.innerText = "0";
}

function deleteLast() {
    currentNumber = currentNumber.slice(0, -1);
    display.innerText = currentNumber || "0";
}
