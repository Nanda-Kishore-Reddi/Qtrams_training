export function capitalize(str) {
    if (!str) return '';
    return str[0].toUpperCase() + str.slice(1);
  }
  
  export const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => (b === 0 ? Infinity : a / b),
  };
  
  export function reverseString(str) {
    return str.split('').reverse().join('');
  }
  
  export function caesarCipher(str, shift) {
    return str
      .split('')
      .map((char) => {
        if (/[a-zA-Z]/.test(char)) {
          const base = char < 'a' ? 65 : 97;
          return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
        }
        return char;
      })
      .join('');
  }
  
  export function analyzeArray(arr) {
    if (arr.length === 0) {
      return {
        average: NaN,
        min: NaN,
        max: NaN,
        length: 0,
      };
    }
    
    const average = arr.reduce((sum, num) => sum + num, 0) / arr.length;
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const length = arr.length;
  
    return { average, min, max, length };
  }
  
  
  