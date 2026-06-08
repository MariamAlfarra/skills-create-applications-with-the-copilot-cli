#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - addition:     add, +
//  - subtraction:  sub, -
//  - multiplication: mul, *, x
//  - division:     div, /
//
// Usage examples:
//   node src/calculator.js add 2 3        # => 5
//   node src/calculator.js + 1 2 3        # => 6
//   node src/calculator.js mul 4 5.5      # => 22
//   node src/calculator.js / 10 2         # => 5
//
// The CLI accepts an operator followed by one or more numeric operands.
// On invalid input (non-numeric operand, unknown operator, division by zero),
// the program prints an error message to stderr and exits with code 1.

const { argv, exit } = require('process');

function printUsageAndExit() {
  console.error('Usage: node src/calculator.js <op> <num1> <num2> [num3 ...]');
  console.error('Operators: add | +    (addition)');
  console.error('           sub | -    (subtraction)');
  console.error('           mul | * | x (multiplication)');
  console.error('           div | /    (division)');
  exit(1);
}

function toNumber(str) {
  if (typeof str !== 'string' || str.trim() === '') return null;
  const n = Number(str);
  return Number.isFinite(n) ? n : null;
}

function operate(op, nums) {
  if (nums.length === 0) {
    throw new Error('No numeric operands provided');
  }

  switch (op) {
    case 'add':
    case '+':
      return nums.reduce((a, b) => a + b, 0);

    case 'sub':
    case '-':
      if (nums.length === 1) return -nums[0];
      return nums.slice(1).reduce((acc, n) => acc - n, nums[0]);

    case 'mul':
    case '*':
    case 'x':
      return nums.reduce((a, b) => a * b, 1);

    case 'div':
    case '/':
      if (nums.length === 1) {
        if (nums[0] === 0) throw new Error('Division by zero');
        return 1 / nums[0];
      }
      return nums.slice(1).reduce((acc, n) => {
        if (n === 0) throw new Error('Division by zero');
        return acc / n;
      }, nums[0]);

    default:
      throw new Error(`Unknown operator: ${op}`);
  }
}

function main() {
  const args = argv.slice(2);
  if (args.length < 2) {
    printUsageAndExit();
  }

  const op = args[0];
  const rawNums = args.slice(1);
  const nums = rawNums.map((s) => {
    const n = toNumber(s);
    if (n === null) {
      console.error(`Invalid number: ${s}`);
      exit(1);
    }
    return n;
  });

  try {
    const result = operate(op, nums);
    // Print result to stdout
    console.log(result);
    exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    exit(1);
  }
}

if (require.main === module) {
  main();
}

// Exported utility functions
function modulo(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError('Arguments must be finite numbers');
  }
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a % b;
}

function power(base, exponent) {
  if (!Number.isFinite(base) || !Number.isFinite(exponent)) {
    throw new TypeError('Arguments must be finite numbers');
  }
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (!Number.isFinite(n)) {
    throw new TypeError('Argument must be a finite number');
  }
  if (n < 0) {
    throw new Error('Cannot compute square root of negative number');
  }
  return Math.sqrt(n);
}

// Export functions for unit testing
module.exports = { operate, toNumber, modulo, power, squareRoot };
