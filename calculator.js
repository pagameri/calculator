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

// Round long decimal numbers to 9 digits
function round(number) {
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

const numbers = document.querySelectorAll('.numbers button');
const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operators button');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');

let operatorPressed;
let subtotal;
let lastValue;
let newValue;
let currentValue = [];
let totalled = false;

numbers.forEach((number) => {
  number.addEventListener('click', e => {
    // Handle decimal point
    if (e.target.className === 'dot') {
      if (currentValue.includes('.')) {
        return
      } else if (currentValue.length === 0) {
        currentValue.push('0.');
        display.innerText = '0.';
      } else {
        currentValue.push(e.target.innerText);
        display.innerText += e.target.innerText;
      }
    }
    // If totalled and digit pressed, start new calculation
    else if (totalled) {
      totalled = false;
      currentValue.push(e.target.innerText);
      display.innerText = e.target.innerText;
      lastValue = null;
    }
    // First digit entered 
    else if (currentValue.length === 0) {
      currentValue.push(e.target.innerText);
      display.innerText = e.target.innerText;
    }
    // Further digits entered
    else if (currentValue.length < 9) {
      currentValue.push(e.target.innerText);
      display.innerText += e.target.innerText;
    } 
  });
});

operators.forEach((operatorBtn) => {
  operatorBtn.addEventListener('click', e => {
    // If calculation starts with operator pressed
    if (currentValue.length === 0) {
      lastValue = '0';
      operatorPressed = e.target.className;
    }
    else if (lastValue === undefined || lastValue === null) {
      lastValue = currentValue.join('');
      currentValue = [];
      operatorPressed = e.target.className;
    }
    // If calculation has been totalled
     else if (totalled) {
      totalled = false;
      newValue = currentValue.join('');
      currentValue = [];
      operatorPressed = e.target.className;
      subtotal = operate(operatorPressed, lastValue, newValue);
      display.innerText = subtotal;
      lastValue = subtotal;
    }
    // For any subsequent operations
    else {
      newValue = currentValue.join('');
      currentValue = [];
      subtotal = operate(operatorPressed, lastValue, newValue);
      operatorPressed = e.target.className;
      display.innerText = subtotal;
      lastValue = subtotal;
    }
  });
});


equal.addEventListener('click', e => {
  let total;
  // If equal pressed before operation: do nothing
  if (lastValue === undefined) {
    return;
  }
  // For subsequent equals without any further operation
  if (totalled) {
    total = operate(operatorPressed, lastValue, newValue);
    display.innerText = total;
    lastValue = total;
  }
  else {
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
