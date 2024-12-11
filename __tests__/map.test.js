import map from '../src/map.js';

describe('map', () => {
  describe('Basic Functionality', () => {
    it('should apply the iteratee to each element of the array ID1', () => {
      const array = [1, 2, 3];
      const iteratee = (n) => n * 2;
      expect(map(array, iteratee)).toEqual([2, 4, 6]);
    });

    it('should handle an empty array ID2', () => {
      expect(map([], (n) => n * 2)).toEqual([]);
    });

    it('should work with an iteratee that returns a constant ID3', () => {
      const array = [1, 2, 3];
      expect(map(array, () => 42)).toEqual([42, 42, 42]);
    });

    it('should provide value, index, and array to the iteratee ID4', () => {
      const array = ['a', 'b', 'c'];
      const iteratee = jest.fn();
      map(array, iteratee);
      expect(iteratee).toHaveBeenCalledTimes(3);
      expect(iteratee).toHaveBeenNthCalledWith(1, 'a', 0, array);
      expect(iteratee).toHaveBeenNthCalledWith(2, 'b', 1, array);
      expect(iteratee).toHaveBeenNthCalledWith(3, 'c', 2, array);
    });

    it('should not modify the original array ID5', () => {
      const array = [1, 2, 3];
      const iteratee = (n) => n * 2;
      map(array, iteratee);
      expect(array).toEqual([1, 2, 3]);
    });
  });

  describe('Complex Iteratee Behavior', () => {
    it('should handle a function that modifies elements based on index ID6', () => {
      const array = [1, 2, 3];
      const iteratee = (n, index) => n + index;
      expect(map(array, iteratee)).toEqual([1, 3, 5]);
    });

    it('should work with a function that uses the entire array context ID7', () => {
      const array = [1, 2, 3];
      const iteratee = (n, index, arr) => n + arr[arr.length - 1];
      expect(map(array, iteratee)).toEqual([4, 5, 6]);
    });

    it('should work with a dynamically created iteratee ID8', () => {
      const createMultiplier = (factor) => (n) => n * factor;
      const array = [1, 2, 3];
      const iteratee = createMultiplier(3);
      expect(map(array, iteratee)).toEqual([3, 6, 9]);
    });

    it('should work with an iteratee that depends on element type ID9', () => {
      const array = [1, 'a', { value: 3 }];
      const iteratee = (el) =>
        typeof el === 'number'
          ? el * 2
          : typeof el === 'string'
          ? el.toUpperCase()
          : el.value;
      expect(map(array, iteratee)).toEqual([2, 'A', 3]);
    });

    it('should correctly handle a generator function iteratee ID10', () => {
      const array = [1, 2, 3];
      function* generator(n) {
        yield n * 2;
      }
      const iteratee = (n) => [...generator(n)][0];
      expect(map(array, iteratee)).toEqual([2, 4, 6]);
    });
  });

  describe('Special Cases', () => {
    it('should handle `null` and `undefined` values in the array ID11', () => {
      const array = [1, null, 3, undefined];
      const iteratee = (n) => (n == null ? 'missing' : n * 2);
      expect(map(array, iteratee)).toEqual([2, 'missing', 6, 'missing']);
    });

    it('should return an empty array for a null input ID12', () => {
      expect(map(null, (n) => n * 2)).toEqual([]);
    });

    it('should return an empty array for an undefined input ID13', () => {
      expect(map(undefined, (n) => n * 2)).toEqual([]);
    });

    it('should handle sparse arrays ID14', () => {
      const array = [1, , 3];
      const iteratee = (n) => (n == null ? 'missing' : n * 2);
      expect(map(array, iteratee)).toEqual([2, 'missing', 6]);
    });

    it('should explicitly process undefined values in sparse arrays ID15', () => {
      const array = [1, , 3];
      const iteratee = (n) => (n === undefined ? 'undefined' : n * 2);
      expect(map(array, iteratee)).toEqual([2, 'undefined', 6]);
    });

    it('should work with deeply nested arrays ID16', () => {
      const array = [[[1, 2]], [[3, 4]], [[5, 6]]];
      const iteratee = (nested) => nested.flat().map((n) => n * 2);
      expect(map(array, iteratee)).toEqual([
        [2, 4],
        [6, 8],
        [10, 12],
      ]);
    });

    it('should correctly process negative numbers ID17', () => {
      const array = [-1, -2, -3];
      const iteratee = (n) => Math.abs(n);
      expect(map(array, iteratee)).toEqual([1, 2, 3]);
    });

    it('should handle an iteratee that throws an error ID18', () => {
      const array = [1, 2, 3];
      const iteratee = (n) => {
        if (n === 2) throw new Error('Test error');
        return n * 2;
      };
      expect(() => map(array, iteratee)).toThrow('Test error');
    });
  });

  describe('Different Data Types', () => {
    it('should work with strings in the array ID19', () => {
      const array = ['foo', 'bar', 'baz'];
      const iteratee = (str) => str.toUpperCase();
      expect(map(array, iteratee)).toEqual(['FOO', 'BAR', 'BAZ']);
    });

    it('should work with objects in the array ID20', () => {
      const array = [{ value: 1 }, { value: 2 }, { value: 3 }];
      const iteratee = (obj) => obj.value * 2;
      expect(map(array, iteratee)).toEqual([2, 4, 6]);
    });

    it('should handle nested arrays ID21', () => {
      const array = [
        [1, 2],
        [3, 4],
        [5, 6],
      ];
      const iteratee = (subArray) => subArray.map((n) => n * 2);
      expect(map(array, iteratee)).toEqual([
        [2, 4],
        [6, 8],
        [10, 12],
      ]);
    });

    it('should correctly process a Set converted to an array ID22', () => {
      const set = new Set([1, 2, 3]);
      const iteratee = (n) => n * 3;
      expect(map([...set], iteratee)).toEqual([3, 6, 9]);
    });
  });

  describe('Performance and Efficiency', () => {
    it('should handle large arrays efficiently ID23', () => {
      const largeArray = Array.from({ length: 1000000 }, (_, i) => i);
      const iteratee = (n) => n * 2;
      expect(map(largeArray, iteratee)).toHaveLength(1000000);
    });
  });

  describe('Error Handling', () => {
    it('should throw an error if iteratee is not a function ID24', () => {
      const array = [1, 2, 3];
      expect(() => map(array, null)).toThrow('iteratee is not a function');
    });
  });
});
