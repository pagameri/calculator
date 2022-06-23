
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
  }
  return a / b;
}
let result;
function operate(operator, num1, num2) {
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

let operatorPressed;
let subtotal;
let lastValue;

numbers.forEach((number) => {
  number.addEventListener('click', e => {
    if (display.innerText === '0' || subtotal === null) {
      display.innerText = e.target.innerText;
    }
    else if (display.innerText === subtotal) {
      display.innerText = e.target.innerText;
    } else if (display.innerText.length < 9) {
      display.innerText += e.target.innerText;
    }
  });
});

operators.forEach((operatorBtn) => {
  operatorBtn.addEventListener('click', e => {
    if (subtotal === undefined) {
      subtotal = display.innerText;
      lastValue = subtotal;
      operatorPressed = e.target.className;
    } else if (subtotal === null) {
      subtotal = display.innerText;
      lastValue = subtotal;
      operatorPressed = e.target.className;
    } else if (operatorPressed === undefined) {
      operatorPressed = e.target.className;
    } else {
      subtotal = operate(operatorPressed, subtotal, display.innerText).toString();
      operatorPressed = e.target.className;
      display.innerText = subtotal;
    }
  });
});

equal.addEventListener('click', e => {
  if (display.innerText !== 0 && (subtotal === undefined || subtotal === null)) {
    if (operatorPressed === undefined) {
      subtotal = display.innerText;
    } else {
      subtotal = display.innerText;
      let total = operate(operatorPressed, subtotal, lastValue);
      display.innerText = total;
      subtotal = null;
    }
  } else if (subtotal === undefined) {
    return;
  } else {
    let total = operate(operatorPressed, subtotal, display.innerText);
    display.innerText = total;
    subtotal = null;
  }
});

