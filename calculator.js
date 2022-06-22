
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
  return a / b;
}

function operate(operator, num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch(operator) {
    case 'add':
      return add(num1, num2);
    case 'subtract':
      return subtract(num1, num2);
    case 'multiply':
      return multiply(num1, num2);
    case 'divide':
      return divide(num1, num2);
  }
}

const numbers = document.querySelectorAll('.numbers button');
const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operators button');
const equal = document.querySelector('.equal');

let operatorPressed;
let subtotal;

numbers.forEach((number) => {
  number.addEventListener('click', e => {
    if (display.innerText === '0') {
      display.innerText = e.target.innerText;
    }
    else if (display.innerText === subtotal) {
      display.innerText = e.target.innerText;
    }
    else if (display.innerText.length < 11) {
      display.innerText += e.target.innerText;
    }
  });
});

operators.forEach((operatorBtn) => {
  operatorBtn.addEventListener('click', e => {
    if (subtotal === undefined) {
      subtotal = display.innerText;
      operatorPressed = e.target.className;
    } else {
      subtotal = operate(operatorPressed, subtotal, display.innerText).toString();
      display.innerText = subtotal;
    }
  });
});

// equal.addEventListener('click', e => {

// });




// // let displayValue;
// let operatorsPressed;
// let valuesEntered = [];


// numbers.forEach((number) => {
//   number.addEventListener('click', e => {
//     if (display.innerText === '0') {
//       display.innerText = e.target.innerText;
//     }
//     else if (display.innerText.length < 11) {
//       display.innerText += e.target.innerText;
//     }
//   })
// });

// operators.forEach((operatorBtn) => {
//   operatorBtn.addEventListener('click', e => {
//     valuesEntered.push(display.innerText);
//     display.innerText = '0';
//     operatorsPressed.push(e.target.className);
//     console.log(valuesEntered);
//     console.log(operatorsPressed);
//   })
// });

// equal.addEventListener('click', e => {
//   valuesEntered.push(display.innerText);
//   display.innerText = calculateTotal(operatorsPressed, valuesEntered);
// })

// function calculateTotal() {

// }