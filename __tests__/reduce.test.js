import reduce from '../src/reduce.js';

describe('reduce', () => {
  describe('Basic Functionality', () => {
    it('should sum numbers in an array', () => {
      const array = [1, 2, 3, 4];
      const iteratee = (sum, n) => sum + n;
      expect(reduce(array, iteratee, 0)).toBe(10);
    });

    it('should concatenate strings in an array', () => {
      const array = ['a', 'b', 'c'];
      const iteratee = (result, str) => result + str;
      expect(reduce(array, iteratee, '')).toBe('abc');
    });

    it('should use the first element as the initial accumulator if none is provided', () => {
      const array = [1, 2, 3];
      const iteratee = (product, n) => product * n;
      expect(reduce(array, iteratee)).toBe(6);
    });

    it('should return the accumulator when the collection is empty', () => {
      expect(reduce([], (sum, n) => sum + n, 42)).toBe(42);
    });

    it('should return undefined if no accumulator is provided and the collection is empty', () => {
      expect(reduce([], (sum, n) => sum + n)).toBeUndefined();
    });
  });

  describe('Object Collections', () => {
    it('should work with objects as collections', () => {
      const object = { a: 1, b: 2, c: 3 };
      const iteratee = (sum, value) => sum + value;
      expect(reduce(object, iteratee, 0)).toBe(6);
    });

    it('should accumulate keys and values from an object', () => {
      const object = { a: 1, b: 2, c: 1 };
      const iteratee = (result, value, key) => {
        (result[value] || (result[value] = [])).push(key);
        return result;
      };
      expect(reduce(object, iteratee, {})).toEqual({ 1: ['a', 'c'], 2: ['b'] });
    });
  });

  describe('Advanced Use Cases', () => {
    it('should handle nested arrays', () => {
      const array = [
        [1, 2],
        [3, 4],
      ];
      const iteratee = (flat, subArray) => flat.concat(subArray);
      expect(reduce(array, iteratee, [])).toEqual([1, 2, 3, 4]);
    });

    it('should count occurrences of values in an array', () => {
      const array = ['a', 'b', 'a', 'c', 'b'];
      const iteratee = (counts, value) => {
        counts[value] = (counts[value] || 0) + 1;
        return counts;
      };
      expect(reduce(array, iteratee, {})).toEqual({ a: 2, b: 2, c: 1 });
    });

    it('should compute the maximum value in an array', () => {
      const array = [1, 5, 3, 9, 2];
      const iteratee = (max, n) => (n > max ? n : max);
      expect(reduce(array, iteratee, -Infinity)).toBe(9);
    });

    it('should reverse an array', () => {
      const array = [1, 2, 3];
      const iteratee = (reversed, n) => [n, ...reversed];
      expect(reduce(array, iteratee, [])).toEqual([3, 2, 1]);
    });
  });

  describe('Handling Edge Cases', () => {
    it('should handle sparse arrays', () => {
      const array = [1, , 3];
      const iteratee = (sum, n) => sum + (n || 0);
      expect(reduce(array, iteratee, 0)).toBe(4);
    });

    it('should handle `null` and `undefined` values in the array', () => {
      const array = [1, null, 3, undefined];
      const iteratee = (sum, n) => sum + (n || 0);
      expect(reduce(array, iteratee, 0)).toBe(4);
    });

    it('should throw an error if no iteratee is provided', () => {
      expect(() => reduce([1, 2, 3])).toThrow('iteratee is not a function');
    });

    it('should provide accumulator, value, index|key, and collection to the iteratee', () => {
      const array = [10, 20, 30];
      const iteratee = jest.fn((acc, value, index, collection) => acc + value);
      reduce(array, iteratee, 0);
      expect(iteratee).toHaveBeenCalledTimes(3);
      expect(iteratee).toHaveBeenNthCalledWith(1, 0, 10, 0, array);
      expect(iteratee).toHaveBeenNthCalledWith(2, 10, 20, 1, array);
      expect(iteratee).toHaveBeenNthCalledWith(3, 30, 30, 2, array);
    });
  });

  describe('Performance', () => {
    it('should handle large collections efficiently', () => {
      const array = Array.from({ length: 100000 }, (_, i) => i);
      const iteratee = (sum, n) => sum + n;
      expect(reduce(array, iteratee, 0)).toBe((100000 * (100000 - 1)) / 2);
    });
  });
});
