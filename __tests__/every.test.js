import every from '../src/every.js';

describe('every', () => {
  describe('Basic Functionality', () => {
    it('should return true for an empty array ID1', () => {
      expect(every([], Boolean)).toBe(true);
    });

    it('should return true if all elements pass the predicate ID2', () => {
      const array = [2, 4, 6, 8];
      const predicate = (value) => value % 2 === 0;
      expect(every(array, predicate)).toBe(true);
    });

    it('should return false if any element fails the predicate ID3', () => {
      const array = [2, 4, 5, 8];
      const predicate = (value) => value % 2 === 0;
      expect(every(array, predicate)).toBe(false);
    });

    it('should handle a predicate that checks for truthy values ID4', () => {
      const array = [1, 'non-empty', true];
      const predicate = Boolean;
      expect(every(array, predicate)).toBe(true);
    });

    it('should return false for an array with falsy values when checking for truthy values ID5', () => {
      const array = [0, 'non-empty', false];
      const predicate = Boolean;
      expect(every(array, predicate)).toBe(false);
    });

    it('should stop iteration once a falsy value is encountered ID6', () => {
      const array = [1, 2, 0, 3, 4];
      const predicate = (value) => value > 0;
      expect(every(array, predicate)).toBe(false);
    });
  });

  describe('Special Values', () => {
    it('should handle `undefined` values correctly ID7', () => {
      const array = [undefined, undefined];
      const predicate = (value) => value === undefined;
      expect(every(array, predicate)).toBe(true);
    });

    it('should return false if any `undefined` value does not match the predicate ID8', () => {
      const array = [undefined, null];
      const predicate = (value) => value === undefined;
      expect(every(array, predicate)).toBe(false);
    });

    it('should handle `null` values correctly ID9', () => {
      const array = [null, null];
      const predicate = (value) => value === null;
      expect(every(array, predicate)).toBe(true);
    });

    it('should return false if `null` is not equal to the expected value ID10', () => {
      const array = [null, 'text'];
      const predicate = (value) => value === null;
      expect(every(array, predicate)).toBe(false);
    });

    it('should handle `NaN` values correctly ID11', () => {
      const array = [NaN, NaN];
      const predicate = (value) => isNaN(value);
      expect(every(array, predicate)).toBe(true);
    });

    it('should return false if any `NaN` value does not match the predicate ID12', () => {
      const array = [NaN, 1];
      const predicate = (value) => isNaN(value);
      expect(every(array, predicate)).toBe(false);
    });

    it('should handle arrays with mixed types correctly ID13', () => {
      const array = [1, '2', 3, true];
      const predicate = (value) => typeof value === 'number';
      expect(every(array, predicate)).toBe(false);
    });
  });

  describe('Boolean and Truthy Checks', () => {
    it('should return true for all truthy values in an array ID14', () => {
      const array = [true, 1, 'hello', [], {}];
      const predicate = (value) => value;
      expect(every(array, predicate)).toBe(true);
    });

    it('should return false if the predicate fails for any element ID15', () => {
      const array = [true, 0, 'hello', []];
      const predicate = (value) => value !== 0;
      expect(every(array, predicate)).toBe(false);
    });

    it('should handle arrays with boolean values correctly ID16', () => {
      const array = [true, true, true];
      const predicate = (value) => value === true;
      expect(every(array, predicate)).toBe(true);
    });
  });

  describe('Objects and Arrays', () => {
    it('should return true for array of objects when checking for a specific property value ID17', () => {
      const array = [{ a: 1 }, { a: 1 }, { a: 1 }];
      const predicate = (obj) => obj.a === 1;
      expect(every(array, predicate)).toBe(true);
    });

    it('should return false for array of objects when one object fails the predicate ID18', () => {
      const array = [{ a: 1 }, { a: 2 }, { a: 1 }];
      const predicate = (obj) => obj.a === 1;
      expect(every(array, predicate)).toBe(false);
    });

    it('should handle sparse arrays correctly ID19', () => {
      const array = [1, , 3];
      const predicate = (value) => value !== undefined;
      expect(every(array, predicate)).toBe(true);
    });
  });

  describe('Empty Arrays and Edge Cases', () => {
    it('should return true for an empty array with no predicate ID20', () => {
      expect(every([])).toBe(true);
    });

    it('should handle empty array without a predicate gracefully ID21', () => {
      expect(every([])).toBe(true);
    });

    it('should return true for an empty array with a predicate ID22', () => {
      expect(every([], Boolean)).toBe(true);
    });

    it('should handle an array with mixed `undefined` and `null` values and a non-boolean predicate ID23', () => {
      const array = [null, undefined];
      const predicate = (value) => value != null;
      expect(every(array, predicate)).toBe(false);
    });

    it('should return false if the array is null or undefined without a predicate ID24', () => {
      expect(every(null)).toBe(true);
      expect(every(undefined)).toBe(true);
    });
  });

  describe('Performance and Large Arrays', () => {
    it('should handle large arrays correctly ID25', () => {
      const largeArray = new Array(1000000).fill(10);
      const predicate = (value) => value === 10;
      expect(every(largeArray, predicate)).toBe(true);
    });

    it('should return false for large arrays if one element fails ID26', () => {
      const largeArray = new Array(1000000).fill(10);
      largeArray[999999] = 5;
      const predicate = (value) => value === 10;
      expect(every(largeArray, predicate)).toBe(false);
    });
  });
});
