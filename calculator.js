
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



//   // let integer = Math.round(temp);
//   let integerLength = temp.toString().length;
//   if (integerLength < 9) {
//     return number;
//   }
//   switch(integerLength) {
//     case (integerLength === 9):
//       return Math.round(number);
//     case (integerLength > 9):
//       return number.toFixed((9 - integerLength));
//   }
// }

const numbers = document.querySelectorAll('.numbers button');
const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operators button');
const equal = document.querySelector('.equal');

let operatorPressed;
let subtotal;

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
      operatorPressed = e.target.className;
    } else if (subtotal === null) {
      subtotal = display.innerText;
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
  if (subtotal === undefined && display.innerText !== 0 || subtotal === null && display.innerText !== 0) {
    subtotal = display.innerText;
  } 
  else if (subtotal === undefined) {
    return;
  } else {
    let total = operate(operatorPressed, subtotal, display.innerText);
    display.innerText = total;
    subtotal = null;
    operatorPressed = null;
  }
});




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