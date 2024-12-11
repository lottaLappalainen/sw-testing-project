import eq from '../src/eq.js';

describe('eq', () => {
  describe('Object References', () => {
    it('should return true for the same object reference', () => {
      const obj = { a: 1 };
      expect(eq(obj, obj)).toBe(true);
    });

    it('should return false for different object references with the same structure', () => {
      const obj1 = { a: 1 };
      const obj2 = { a: 1 };
      expect(eq(obj1, obj2)).toBe(false);
    });

    it('should return false for different instances of the same class', () => {
      class MyClass {}
      const instance1 = new MyClass();
      const instance2 = new MyClass();
      expect(eq(instance1, instance2)).toBe(false);
    });
  });

  describe('Primitive Values', () => {
    it('should return true for identical primitive values', () => {
      expect(eq('a', 'a')).toBe(true);
      expect(eq(42, 42)).toBe(true);
      expect(eq(true, true)).toBe(true);
      expect(eq(null, null)).toBe(true);
      expect(eq(undefined, undefined)).toBe(true);
    });

    it('should return false for different primitive values', () => {
      expect(eq('a', 'b')).toBe(false);
      expect(eq(42, 43)).toBe(false);
      expect(eq(true, false)).toBe(false);
      expect(eq(null, undefined)).toBe(false);
    });

    it('should handle special cases with zero', () => {
      expect(eq(0, -0)).toBe(true);
      expect(eq(-0, 0)).toBe(true);
    });

    it('should return true for NaN compared to NaN', () => {
      expect(eq(NaN, NaN)).toBe(true);
    });

    it('should handle large numbers correctly', () => {
      const largeNum = Number.MAX_VALUE;
      expect(eq(largeNum, largeNum)).toBe(true);
      expect(eq(largeNum, largeNum - 1)).toBe(false);
    });
  });

  describe('Boxed Primitives', () => {
    it('should return false for boxed primitives compared to their primitive counterparts', () => {
      expect(eq('a', Object('a'))).toBe(false);
      expect(eq(42, Object(42))).toBe(false);
      expect(eq(true, Object(true))).toBe(false);
    });

    it('should return true for boxed primitives with the same reference', () => {
      const str = Object('a');
      expect(eq(str, str)).toBe(true);

      const num = Object(42);
      expect(eq(num, num)).toBe(true);

      const bool = Object(true);
      expect(eq(bool, bool)).toBe(true);
    });
  });

  describe('Functions', () => {
    it('should return false for functions even if they have the same structure', () => {
      const func1 = () => {};
      const func2 = () => {};
      expect(eq(func1, func2)).toBe(false);
    });

    it('should return true for the same function reference', () => {
      const func = () => {};
      expect(eq(func, func)).toBe(true);
    });
  });

  describe('Special Objects', () => {
    it('should handle special objects like dates', () => {
      const date1 = new Date(2023, 1, 1);
      const date2 = new Date(2023, 1, 1);
      expect(eq(date1, date1)).toBe(true);
      expect(eq(date1, date2)).toBe(false);
    });

    it('should handle arrays', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [1, 2, 3];
      expect(eq(arr1, arr1)).toBe(true);
      expect(eq(arr1, arr2)).toBe(false);
    });

    it('should handle symbols correctly', () => {
      const sym1 = Symbol('test');
      const sym2 = Symbol('test');
      expect(eq(sym1, sym1)).toBe(true);
      expect(eq(sym1, sym2)).toBe(false);
    });
  });

  describe('Type Mismatches', () => {
    it('should return false for different types even if values are equivalent', () => {
      expect(eq('42', 42)).toBe(false);
      expect(eq('true', true)).toBe(false);
    });
  });

  describe('Null and Undefined', () => {
    it('should return true for null compared to null', () => {
      expect(eq(null, null)).toBe(true);
    });

    it('should return true for undefined compared to undefined', () => {
      expect(eq(undefined, undefined)).toBe(true);
    });

    it('should return false for null compared to undefined', () => {
      expect(eq(null, undefined)).toBe(false);
    });
  });
});
