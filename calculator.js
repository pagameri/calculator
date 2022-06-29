function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error"
  } else if (a === 0) {
    return a;
  }
  return a / b;
}

function operate(operator, num1, num2) {
  let result;
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch(operator) {
    case 'add':
      result = add(num1, num2);
      return round(result);
    case 'subtract':
      result = subtract(num1, num2);
      return round(result); 
    case 'multiply':
      result = multiply(num1, num2);
      return round(result); 
    case 'divide':
      result = divide(num1, num2);
      if (result === "Error") {
        return result;
      }
      return round(result); 
  }
}

function round(number) { // Round long decimals to 9 digits
  let temp = number;
  let lengthOfNumber = temp.toString().length;
  if (lengthOfNumber <= 9) {
    return number;
  }

  let temp2 = Math.trunc(number);
  let lengthOfWholePart = temp2.toString().length;
  let decimalPlacesToBe = 9 - lengthOfWholePart;
  return number.toFixed((decimalPlacesToBe));
}

const numbers = document.querySelectorAll('.numbers');
const decimal = document.querySelector('.decimal')
const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operators');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');

let operatorPressed;
let subtotal;
let lastValue;
let newValue;
let currentValue = [];
let totalled = false;

function enterFirstDigit(digit) {
  currentValue.push(digit);
  display.innerText = digit;
}

function enterFurtherDigits(digit) {
  currentValue.push(digit);
  display.innerText += digit;
}

numbers.forEach((number) => {
  number.addEventListener('click', e => {
    if (totalled) { // Start new calculation
      totalled = false;
      enterFirstDigit(e.target.innerText);
      lastValue = null;
    } else if (currentValue.length === 0) {
      enterFirstDigit(e.target.innerText);
    } else if (currentValue.length < 9) {
      enterFurtherDigits(e.target.innerText);
    } 
  });
});

decimal.addEventListener('click', e => {
  if (currentValue.includes('.')) {
    return
  } else if (currentValue.length === 0) {
    currentValue.push('0.');
    display.innerText = '0.';
  } else {
    enterFurtherDigits(e.target.innerText);
  }
});

operators.forEach((operatorBtn) => {
  operatorBtn.addEventListener('click', e => {
    if (currentValue.length === 0 && !totalled) { // First btn is operator
      lastValue = '0';
      operatorPressed = e.target.id;
    } else if (lastValue === undefined || lastValue === null) { // First round of calculations
      lastValue = currentValue.join('');
      currentValue = [];
      operatorPressed = e.target.id;
    } else if (totalled) {
      totalled = false;
      operatorPressed = e.target.id;
    } else { // Subsequent calculations
      newValue = currentValue.join('');
      currentValue = [];
      subtotal = operate(operatorPressed, lastValue, newValue);
      operatorPressed = e.target.id;
      display.innerText = subtotal;
      lastValue = subtotal;
    }
  });
});

equal.addEventListener('click', e => {
  let total;
  if (lastValue === undefined) { // First btn pressed is '='
    return;
  }
  
  
  if (totalled) { // Totalled and = pressed again
    total = operate(operatorPressed, lastValue, newValue);
    display.innerText = total;
    lastValue = total;
  } else if (currentValue.length === 0) { // After at least one totalled operation with immediate operator press:
    newValue = lastValue;
    total = operate(operatorPressed, lastValue, newValue);
    display.innerText = total;
    lastValue = total;
    totalled = true;
  } else {
    newValue = currentValue.join('');
    currentValue = [];
    total = operate(operatorPressed, lastValue, newValue);
    display.innerText = total;
    lastValue = total;
    totalled = true;
  }
});

clear.addEventListener('click', e => {
  operatorPressed = undefined;
  subtotal = undefined;
  lastValue = undefined;
  newValue = undefined;
  currentValue = [];
  totalled = false;
  display.innerText = '0';
});

backspace.addEventListener('click', e => {
  if (currentValue.length > 1) {
    currentValue.pop();
    display.innerText = display.innerText.slice(0, -1);
  } else if (currentValue.length === 1) {
    currentValue.pop();
    display.innerText = '0';
  } else {
    return;
  }
});

