import toNumber from '../src/toNumber.js';

describe('toNumber', () => {
  describe('Basic Numeric Conversion', () => {
    it('should return the same number for a valid number', () => {
      expect(toNumber(42)).toBe(42);
      expect(toNumber(-42)).toBe(-42);
      expect(toNumber(3.14159)).toBe(3.14159);
    });

    it('should handle `Infinity` and `-Infinity` correctly', () => {
      expect(toNumber(Infinity)).toBe(Infinity);
      expect(toNumber(-Infinity)).toBe(-Infinity);
    });

    it('should handle special numeric constants', () => {
      expect(toNumber(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
      expect(toNumber(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
    });

    it('should return NaN for NaN', () => {
      expect(toNumber(NaN)).toBeNaN();
    });
  });

  describe('String Conversion', () => {
    it('should convert numeric strings to numbers', () => {
      expect(toNumber('42')).toBe(42);
      expect(toNumber('-42')).toBe(-42);
      expect(toNumber('3.14')).toBe(3.14);
      expect(toNumber('0')).toBe(0);
    });

    it('should handle strings with leading or trailing whitespace', () => {
      expect(toNumber('  42')).toBe(42);
      expect(toNumber('42  ')).toBe(42);
      expect(toNumber('  3.14  ')).toBe(3.14);
    });

    it('should handle special number-like strings with padding', () => {
      expect(toNumber('  0xFF  ')).toBe(255);
      expect(toNumber('  0b1010 ')).toBe(10);
      expect(toNumber('  0o77  ')).toBe(63);
    });

    it('should return NaN for non-numeric strings', () => {
      expect(toNumber('abc')).toBeNaN();
      expect(toNumber('42abc')).toBeNaN();
      expect(toNumber('abc42')).toBeNaN();
    });

    it('should return NaN for strings with embedded spaces', () => {
      expect(toNumber('4 2')).toBeNaN();
      expect(toNumber('4.2.3')).toBeNaN();
    });
  });

  describe('Special Number Formats', () => {
    it('should handle binary string values', () => {
      expect(toNumber('0b101')).toBe(5);
      expect(toNumber('0b110')).toBe(6);
    });

    it('should handle octal string values', () => {
      expect(toNumber('0o10')).toBe(8);
      expect(toNumber('0o20')).toBe(16);
    });

    it('should handle hexadecimal string values', () => {
      expect(toNumber('0x1F')).toBe(31);
      expect(toNumber('0xFF')).toBe(255);
    });

    it('should handle exponential notation correctly', () => {
      expect(toNumber('1e10')).toBe(1e10);
      expect(toNumber('-1e-10')).toBe(-1e-10);
    });
  });

  describe('Edge Cases with Special Strings', () => {
    it('should handle edge cases for hex strings', () => {
      expect(toNumber('0x')).toBeNaN();
      expect(toNumber('0x1G')).toBeNaN();
      expect(toNumber('0x123.')).toBeNaN();
      expect(toNumber('+0x123')).toBeNaN();
      expect(toNumber('-0x')).toBeNaN();
    });

    it('should return NaN for invalid hex strings not matched by reIsBadHex', () => {
      expect(toNumber('ZZZ')).toBeNaN();
      expect(toNumber('0y123')).toBeNaN();
      expect(toNumber(' 0x1G ')).toBeNaN();
    });
  });

  describe('Special Inputs', () => {
    it('should return 0 for null', () => {
      expect(toNumber(null)).toBe(0);
    });

    it('should return NaN for undefined', () => {
      expect(toNumber(undefined)).toBeNaN();
    });

    it('should return 0 for an empty string', () => {
      expect(toNumber('')).toBe(0);
    });

    it('should convert true to 1 and false to 0', () => {
      expect(toNumber(true)).toBe(1);
      expect(toNumber(false)).toBe(0);
    });
  });

  describe('Objects and Arrays', () => {
    it('should return 0 for an object that coerces to 0', () => {
      const obj = { valueOf: () => 0 };
      expect(toNumber(obj)).toBe(0);
    });

    it('should handle objects with custom `valueOf` methods', () => {
      const obj = { valueOf: () => '42' };
      expect(toNumber(obj)).toBe(42);
    });

    it('should return NaN for objects that cannot be coerced', () => {
      expect(toNumber({})).toBeNaN();
      expect(toNumber(Object.create(null))).toBeNaN();
    });

    it('should handle arrays with single elements', () => {
      expect(toNumber([42])).toBe(42);
      expect(toNumber(['42'])).toBe(42);
    });

    it('should return NaN for arrays with multiple elements', () => {
      expect(toNumber([1, 2, 3])).toBeNaN();
    });
  });

  describe('Symbols and Functions', () => {
    it('should return NaN for symbols', () => {
      const symbol = Symbol('test');
      expect(toNumber(symbol)).toBeNaN();
    });

    it('should return NaN for functions', () => {
      expect(toNumber(() => {})).toBeNaN();
    });
  });

  describe('Handling Large and Small Numbers', () => {
    it('should handle extremely large numbers', () => {
      expect(toNumber('1e+308')).toBe(1e308);
      expect(toNumber('-1e+308')).toBe(-1e308);
    });

    it('should handle extremely small numbers', () => {
      expect(toNumber('1e-308')).toBe(1e-308);
      expect(toNumber('5e-324')).toBe(5e-324);
    });

    it('should handle very large floating-point strings', () => {
      expect(toNumber('1.7976931348623157e+308')).toBe(1.7976931348623157e308);
    });

    it('should handle very small floating-point strings', () => {
      expect(toNumber('5e-324')).toBe(5e-324);
    });
  });

  describe('Error Handling', () => {
    it('should return NaN for null prototype objects', () => {
      const nullProtoObject = Object.create(null);
      expect(toNumber(nullProtoObject)).toBeNaN();
    });

    it('should return NaN for objects with a `toString` that throws an error', () => {
      const obj = {
        toString() {
          throw new Error('Cannot convert to string');
        },
      };
      expect(() => toNumber(obj)).toThrow();
    });

    it('should return NaN for objects with circular references', () => {
      const circularObj = {};
      circularObj.self = circularObj;
      expect(toNumber(circularObj)).toBeNaN();
    });
  });
});
