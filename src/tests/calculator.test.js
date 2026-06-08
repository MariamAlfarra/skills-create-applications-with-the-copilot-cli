const { operate, toNumber } = require('../calculator');

describe('toNumber', () => {
  test('parses numeric strings', () => {
    expect(toNumber('3')).toBe(3);
    expect(toNumber('5.5')).toBe(5.5);
    expect(toNumber('-2')).toBe(-2);
  });

  test('returns null for non-numeric', () => {
    expect(toNumber('abc')).toBeNull();
    expect(toNumber('')).toBeNull();
  });
});

describe('operate - addition', () => {
  test('adds multiple numbers with add', () => {
    expect(operate('add', [2, 3])).toBe(5);
    expect(operate('+', [1, 2, 3])).toBe(6);
  });

  test('adding zero operands should throw', () => {
    expect(() => operate('add', [])).toThrow('No numeric operands provided');
  });
});

describe('operate - subtraction', () => {
  test('subtracts with sub and -', () => {
    expect(operate('sub', [10, 4])).toBe(6);
    expect(operate('-', [10, 4, 3])).toBe(3);
  });

  test('single operand returns negation', () => {
    expect(operate('sub', [5])).toBe(-5);
  });
});

describe('operate - multiplication', () => {
  test('multiplies numbers', () => {
    expect(operate('mul', [45, 2])).toBe(90);
    expect(operate('*', [3, 4, 2])).toBe(24);
    expect(operate('x', [2, 3])).toBe(6);
  });

  test('multiplying with no operands throws', () => {
    expect(() => operate('mul', [])).toThrow('No numeric operands provided');
  });
});

describe('operate - division', () => {
  test('divides numbers', () => {
    expect(operate('div', [20, 5])).toBe(4);
    expect(operate('/', [100, 2, 5])).toBe(10);
  });

  test('single operand returns reciprocal', () => {
    expect(operate('div', [2])).toBe(0.5);
  });

  test('division by zero throws', () => {
    expect(() => operate('div', [10, 0])).toThrow('Division by zero');
    expect(() => operate('/', [0])).toThrow('Division by zero');
  });
});

describe('operate - errors and unknowns', () => {
  test('unknown operator throws', () => {
    expect(() => operate('pow', [2, 3])).toThrow('Unknown operator: pow');
  });
});
