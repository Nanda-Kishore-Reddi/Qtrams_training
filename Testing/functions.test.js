import { capitalize, calculator, reverseString, caesarCipher, analyzeArray } from './functions';

test('capitalize first character of a string', () => {
  expect(capitalize('hello')).toBe('Hello');
  expect(capitalize('world')).toBe('World');
  expect(capitalize('')).toBe('');
});

test('calculator operations', () => {
  expect(calculator.add(2, 3)).toBe(5);
  expect(calculator.subtract(5, 3)).toBe(2);
  expect(calculator.multiply(4, 3)).toBe(12);
  expect(calculator.divide(10, 2)).toBe(5);
  expect(calculator.divide(10, 0)).toBe(Infinity);
});

test('reverse a string', () => {
  expect(reverseString('hello')).toBe('olleh');
  expect(reverseString('abcd')).toBe('dcba');
  expect(reverseString('')).toBe('');
});

test('caesar cipher shifts correctly', () => {
  expect(caesarCipher('abc', 3)).toBe('def');
  expect(caesarCipher('xyz', 3)).toBe('abc');
  expect(caesarCipher('HeLLo', 3)).toBe('KhOOr');
  expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!');
  expect(caesarCipher('123', 3)).toBe('123');
});

test('analyze an array of numbers', () => {
  const result = analyzeArray([1, 8, 3, 4, 2, 6]);
  expect(result).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });

  const emptyResult = analyzeArray([]);
  expect(emptyResult.average).toBeNaN();
  expect(emptyResult.min).toBeNaN();
  expect(emptyResult.max).toBeNaN();
  expect(emptyResult.length).toBe(0);

  const negativeResult = analyzeArray([-5, -10, -3, -2, -1]);
  expect(negativeResult).toEqual({
    average: -4.2,
    min: -10,
    max: -1,
    length: 5,
  });

  
  const singleElementResult = analyzeArray([5]);
  expect(singleElementResult).toEqual({
    average: 5,
    min: 5,
    max: 5,
    length: 1,
  });
});

