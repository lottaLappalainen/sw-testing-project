import filter from '../src/filter.js';

describe('filter', () => {
  describe('Basic Functionality', () => {
    it('should return an empty array if the input array is empty ID1', () => {
      const result = filter([], () => true);
      expect(result).toEqual([]);
    });

    it('should return an empty array if no elements match the predicate ID2', () => {
      const array = [1, 2, 3];
      const predicate = (value) => value > 5;
      expect(filter(array, predicate)).toEqual([]);
    });

    it('should return all elements if all match the predicate ID3', () => {
      const array = [1, 2, 3];
      const predicate = (value) => value > 0;
      expect(filter(array, predicate)).toEqual([1, 2, 3]);
    });

    it('should return only the elements that match the predicate ID4', () => {
      const array = [1, 2, 3, 4, 5];
      const predicate = (value) => value % 2 === 0;
      expect(filter(array, predicate)).toEqual([2, 4]);
    });
  });

  describe('Advanced Predicate', () => {
    it('should handle predicates with indices ID5', () => {
      const array = [1, 2, 3, 4, 5];
      const predicate = (value, index) => index % 2 === 0;
      expect(filter(array, predicate)).toEqual([1, 3, 5]);
    });

    it('should handle predicates with the original array passed as the third argument ID6', () => {
      const array = [1, 2, 3];
      const predicate = (value, index, arr) => arr.includes(value);
      expect(filter(array, predicate)).toEqual([1, 2, 3]);
    });
  });

  describe('Special Values', () => {
    it('should handle arrays with `null` values ID7', () => {
      const array = [1, null, 2, null, 3];
      const predicate = (value) => value !== null;
      expect(filter(array, predicate)).toEqual([1, 2, 3]);
    });

    it('should handle arrays with `undefined` values ID8', () => {
      const array = [1, undefined, 2, undefined, 3];
      const predicate = (value) => value !== undefined;
      expect(filter(array, predicate)).toEqual([1, 2, 3]);
    });

    it('should handle arrays with `NaN` values ID9', () => {
      const array = [NaN, 1, 2, NaN, 3];
      const predicate = (value) => !isNaN(value);
      expect(filter(array, predicate)).toEqual([1, 2, 3]);
    });

    it('should work correctly with boolean predicates ID10', () => {
      const array = [true, false, true];
      const predicate = (value) => value;
      expect(filter(array, predicate)).toEqual([true, true]);
    });

    it('should handle arrays with mixed data types ID11', () => {
      const array = [1, 'a', true, {}, []];
      const predicate = (value) => typeof value === 'number';
      expect(filter(array, predicate)).toEqual([1]);
    });
  });

  describe('Complex Objects and Nested Structures', () => {
    it('should handle objects within the array ID12', () => {
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

    it('should handle nested arrays ID13', () => {
      const array = [
        [1, 2],
        [3, 4],
        [5, 6],
      ];
      const predicate = (subArray) => subArray.includes(3);
      expect(filter(array, predicate)).toEqual([[3, 4]]);
    });

    it('should handle arrays with deeply nested objects ID14', () => {
      const array = [
        { id: 1, nested: { active: true } },
        { id: 2, nested: { active: false } },
      ];
      const predicate = (item) => item.nested.active;
      expect(filter(array, predicate)).toEqual([
        { id: 1, nested: { active: true } },
      ]);
    });
  });

  describe('Performance and Large Arrays', () => {
    it('should handle large arrays efficiently ID15', () => {
      const largeArray = new Array(100000).fill(1).map((_, i) => i);
      const predicate = (value) => value % 1000 === 0;
      const result = filter(largeArray, predicate);
      const expected = Array.from({ length: 100 }, (_, i) => i * 1000);
      expect(result).toEqual(expected);
    });
  });

  describe('Edge Cases', () => {
    it('should not modify the original array ID16', () => {
      const array = [1, 2, 3];
      const predicate = (value) => value > 1;
      filter(array, predicate);
      expect(array).toEqual([1, 2, 3]);
    });

    it('should return an empty array if the predicate always returns false ID17', () => {
      const array = [1, 2, 3];
      const predicate = () => false;
      expect(filter(array, predicate)).toEqual([]);
    });

    it('should return the original array if the predicate always returns true ID18', () => {
      const array = [1, 2, 3];
      const predicate = () => true;
      expect(filter(array, predicate)).toEqual([1, 2, 3]);
    });

    it('should handle sparse arrays correctly ID19', () => {
      const array = [1, , 3]; // Sparse array with a hole.
      const predicate = (value) => value !== undefined;
      expect(filter(array, predicate)).toEqual([1, 3]);
    });

    it('should handle non-array input by returning an empty array ID20', () => {
      const nonArrayInputs = [123, 'string', { key: 'value' }, true, NaN];
      nonArrayInputs.forEach((input) => {
        expect(filter(input, () => true)).toEqual([]);
      });
    });

    it('should return an empty array if the input is null or undefined ID21', () => {
      expect(filter(null, () => true)).toEqual([]);
      expect(filter(undefined, () => true)).toEqual([]);
    });

    it('should return a new array instance (not a reference to the original) ID22', () => {
      const array = [1, 2, 3];
      const predicate = (value) => value > 1;
      const result = filter(array, predicate);
      expect(result).not.toBe(array);
      expect(result).toEqual([2, 3]);
    });
  });
});
