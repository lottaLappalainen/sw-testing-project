import add from '../src/add.js';

describe('add', () => {
  describe('Basic Addition', () => {
    it('should add two positive numbers ID1', () => {
      expect(add(6, 4)).toBe(10);
    });

    it('should add a positive and a negative number ID2', () => {
      expect(add(6, -4)).toBe(2);
    });

    it('should add two negative numbers ID3', () => {
      expect(add(-6, -4)).toBe(-10);
    });

    it('should add a number and zero ID4', () => {
      expect(add(6, 0)).toBe(6);
      expect(add(0, 4)).toBe(4);
    });

    it('should add zero and zero ID5', () => {
      expect(add(0, 0)).toBe(0);
    });
  });

  describe('Decimal Numbers', () => {
    it('should handle adding numbers with decimals ID6', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3, 10);
    });

    it('should handle adding very small numbers ID7', () => {
      expect(add(1e-10, 1e-10)).toBe(2e-10);
    });
  });

  describe('Large Numbers', () => {
    it('should handle adding large numbers ID8', () => {
      expect(add(1e10, 1e10)).toBe(2e10);
    });

    it('should handle adding extremely large and small values ID9', () => {
      expect(add(Number.MAX_VALUE, 1)).toBe(Number.MAX_VALUE);
      expect(add(-Number.MAX_VALUE, -1)).toBe(-Number.MAX_VALUE);
      expect(add(Number.MIN_VALUE, 1)).toBeCloseTo(1, 10);
      expect(add(-Number.MIN_VALUE, -1)).toBeCloseTo(-1, 10);
    });
  });

  describe('Special Numbers', () => {
    it('should handle adding Infinity ID10', () => {
      expect(add(Infinity, 10)).toBe(Infinity);
      expect(add(10, Infinity)).toBe(Infinity);
      expect(add(Infinity, -Infinity)).toBeNaN();
    });

    it('should handle adding NaN ID11', () => {
      expect(add(NaN, 10)).toBeNaN();
      expect(add(10, NaN)).toBeNaN();
      expect(add(NaN, NaN)).toBeNaN();
    });

    it('should handle adding negative zero ID12', () => {
      expect(Object.is(add(0, -0), 0)).toBe(true);
      expect(Object.is(add(-0, -0), -0)).toBe(true);
    });
  });

  describe('Non-Numeric Inputs', () => {
    it('should handle adding non-numeric inputs that can be coerced to numbers ID13', () => {
      expect(add('6', '4')).toBe(10);
      expect(add('6', 4)).toBe(10);
      expect(add(6, '4')).toBe(10);
      expect(add(true, 1)).toBe(2);
      expect(add(false, 1)).toBe(1);
    });

    it('should return NaN for non-numeric inputs that cannot be coerced ID14', () => {
      expect(add('a', 4)).toBeNaN();
      expect(add(6, 'b')).toBeNaN();
      expect(add({}, [])).toBeNaN();
      expect(add(null, undefined)).toBeNaN();
    });
  });
});
