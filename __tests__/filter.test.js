import filter from '../src/filter.js';

describe('filter', () => {
  it('should return an empty array if the input array is empty', () => {
    const result = filter([], () => true);
    expect(result).toEqual([]);
  });

  it('should return an empty array if no elements match the predicate', () => {
    const array = [1, 2, 3];
    const predicate = (value) => value > 5;
    expect(filter(array, predicate)).toEqual([]);
  });

  it('should return all elements if all match the predicate', () => {
    const array = [1, 2, 3];
    const predicate = (value) => value > 0;
    expect(filter(array, predicate)).toEqual([1, 2, 3]);
  });

  it('should return only the elements that match the predicate', () => {
    const array = [1, 2, 3, 4, 5];
    const predicate = (value) => value % 2 === 0;
    expect(filter(array, predicate)).toEqual([2, 4]);
  });

  it('should handle predicates with indices', () => {
    const array = [1, 2, 3, 4, 5];
    const predicate = (value, index) => index % 2 === 0; 
    expect(filter(array, predicate)).toEqual([1, 3, 5]);
  });

  it('should handle predicates with the original array passed as the third argument', () => {
    const array = [1, 2, 3];
    const predicate = (value, index, arr) => arr.includes(value);
    expect(filter(array, predicate)).toEqual([1, 2, 3]);
  });

  it('should handle objects within the array', () => {
    const array = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
      { user: 'wilma', active: true },
    ];
    const predicate = (obj) => obj.active;
    expect(filter(array, predicate)).toEqual([
      { user: 'barney', active: true },
      { user: 'wilma', active: true },
    ]);
  });

  it('should handle arrays with `null` values', () => {
    const array = [1, null, 2, null, 3];
    const predicate = (value) => value !== null;
    expect(filter(array, predicate)).toEqual([1, 2, 3]);
  });

  it('should handle arrays with `undefined` values', () => {
    const array = [1, undefined, 2, undefined, 3];
    const predicate = (value) => value !== undefined;
    expect(filter(array, predicate)).toEqual([1, 2, 3]);
  });

  it('should handle mixed data types in the array', () => {
    const array = [1, 'a', true, {}, []];
    const predicate = (value) => typeof value === 'number';
    expect(filter(array, predicate)).toEqual([1]);
  });

  it('should work correctly with boolean predicates', () => {
    const array = [true, false, true];
    const predicate = (value) => value;
    expect(filter(array, predicate)).toEqual([true, true]);
  });

  it('should handle arrays with `NaN` values', () => {
    const array = [NaN, 1, 2, NaN, 3];
    const predicate = (value) => !isNaN(value);
    expect(filter(array, predicate)).toEqual([1, 2, 3]);
  });

  it('should handle large arrays efficiently', () => {
    const largeArray = new Array(100000).fill(1).map((_, i) => i);
    const predicate = (value) => value % 1000 === 0;
    const result = filter(largeArray, predicate);
    expect(result).toEqual([0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000]);
  });

  it('should not modify the original array', () => {
    const array = [1, 2, 3];
    const predicate = (value) => value > 1;
    filter(array, predicate);
    expect(array).toEqual([1, 2, 3]); // Ensure immutability
  });

  it('should return an empty array if the predicate always returns false', () => {
    const array = [1, 2, 3];
    const predicate = () => false;
    expect(filter(array, predicate)).toEqual([]);
  });

  it('should return the original array if the predicate always returns true', () => {
    const array = [1, 2, 3];
    const predicate = () => true;
    expect(filter(array, predicate)).toEqual([1, 2, 3]);
  });

  it('should handle nested arrays', () => {
    const array = [[1, 2], [3, 4], [5, 6]];
    const predicate = (subArray) => subArray.includes(3);
    expect(filter(array, predicate)).toEqual([[3, 4]]);
  });

  it('should return a new array instance (not a reference to the original)', () => {
    const array = [1, 2, 3];
    const predicate = (value) => value > 1;
    const result = filter(array, predicate);
    expect(result).not.toBe(array);
    expect(result).toEqual([2, 3]);
  });
});
