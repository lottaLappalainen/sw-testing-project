import every from '../src/every.js';

describe('every', () => {
  it('should return true for an empty array', () => {
    expect(every([], Boolean)).toBe(true);
  });

  it('should return true if all elements pass the predicate', () => {
    const array = [2, 4, 6, 8];
    const predicate = (value) => value % 2 === 0;
    expect(every(array, predicate)).toBe(true);
  });

  it('should return false if any element fails the predicate', () => {
    const array = [2, 4, 5, 8];
    const predicate = (value) => value % 2 === 0;
    expect(every(array, predicate)).toBe(false);
  });

  it('should handle a predicate that checks for truthy values', () => {
    const array = [1, 'non-empty', true];
    const predicate = Boolean;
    expect(every(array, predicate)).toBe(true);
  });

  it('should return false for an array with falsy values when checking for truthy values', () => {
    const array = [0, 'non-empty', false];
    const predicate = Boolean;
    expect(every(array, predicate)).toBe(false);
  });

  it('should stop iteration once a falsy value is encountered', () => {
    const array = [1, 2, 0, 3, 4];
    const predicate = (value) => value > 0;
    expect(every(array, predicate)).toBe(false); 
  });

  it('should return true for all values when checking for non-falsy values in an array', () => {
    const array = [true, 1, 'hello', [], {}];
    const predicate = (value) => value;
    expect(every(array, predicate)).toBe(true);
  });

  it('should return false if the predicate fails for any element', () => {
    const array = [true, 0, 'hello', []];
    const predicate = (value) => value !== 0; 
    expect(every(array, predicate)).toBe(false);
  });

  it('should handle array with `undefined` values correctly', () => {
    const array = [undefined, undefined];
    const predicate = (value) => value === undefined;
    expect(every(array, predicate)).toBe(true);
  });

  it('should return false if any `undefined` value does not match the predicate', () => {
    const array = [undefined, null];
    const predicate = (value) => value === undefined;
    expect(every(array, predicate)).toBe(false);
  });

  it('should handle array with boolean values correctly', () => {
    const array = [true, true, true];
    const predicate = (value) => value === true;
    expect(every(array, predicate)).toBe(true);
  });

  it('should handle array with `null` values correctly', () => {
    const array = [null, null];
    const predicate = (value) => value === null;
    expect(every(array, predicate)).toBe(true);
  });

  it('should return false if `null` is not equal to the expected value', () => {
    const array = [null, 'text'];
    const predicate = (value) => value === null;
    expect(every(array, predicate)).toBe(false);
  });

  it('should handle large arrays correctly', () => {
    const largeArray = new Array(1000000).fill(10); 
    const predicate = (value) => value === 10;
    expect(every(largeArray, predicate)).toBe(true);
  });

  it('should return false for large arrays if one element fails', () => {
    const largeArray = new Array(1000000).fill(10);
    largeArray[999999] = 5;
    const predicate = (value) => value === 10;
    expect(every(largeArray, predicate)).toBe(false);
  });

  it('should handle arrays with mixed types correctly', () => {
    const array = [1, '2', 3, true];
    const predicate = (value) => typeof value === 'number';
    expect(every(array, predicate)).toBe(false);
  });

  it('should handle `NaN` values correctly', () => {
    const array = [NaN, NaN];
    const predicate = (value) => isNaN(value);
    expect(every(array, predicate)).toBe(true);
  });

  it('should return false if any `NaN` value does not match the predicate', () => {
    const array = [NaN, 1];
    const predicate = (value) => isNaN(value);
    expect(every(array, predicate)).toBe(false);
  });

  it('should return true for array of objects when checking for a specific property value', () => {
    const array = [{ a: 1 }, { a: 1 }, { a: 1 }];
    const predicate = (obj) => obj.a === 1;
    expect(every(array, predicate)).toBe(true);
  });

  it('should return false for array of objects when one object fails the predicate', () => {
    const array = [{ a: 1 }, { a: 2 }, { a: 1 }];
    const predicate = (obj) => obj.a === 1;
    expect(every(array, predicate)).toBe(false);
  });
});
