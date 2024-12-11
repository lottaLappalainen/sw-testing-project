import toNumber from '../src/toNumber.js';

describe('toNumber', () => {
  describe('Basic Numeric Conversion', () => {
    it('should return the same number for a valid number ID1', () => {
      expect(toNumber(42)).toBe(42);
      expect(toNumber(-42)).toBe(-42);
      expect(toNumber(3.14159)).toBe(3.14159);
    });

    it('should handle `Infinity` and `-Infinity` correctly ID2', () => {
      expect(toNumber(Infinity)).toBe(Infinity);
      expect(toNumber(-Infinity)).toBe(-Infinity);
    });

    it('should handle special numeric constants ID3', () => {
      expect(toNumber(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
      expect(toNumber(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
    });

    it('should return NaN for NaN', () => {
      expect(toNumber(NaN)).toBeNaN();
    });
  });

  describe('String Conversion', () => {
    it('should convert numeric strings to numbers ID4', () => {
      expect(toNumber('42')).toBe(42);
      expect(toNumber('-42')).toBe(-42);
      expect(toNumber('3.14')).toBe(3.14);
      expect(toNumber('0')).toBe(0);
    });

    it('should handle strings with leading or trailing whitespace ID5', () => {
      expect(toNumber('  42')).toBe(42);
      expect(toNumber('42  ')).toBe(42);
      expect(toNumber('  3.14  ')).toBe(3.14);
    });

    it('should handle special number-like strings with padding ID6', () => {
      expect(toNumber('  0xFF  ')).toBe(255);
      expect(toNumber('  0b1010 ')).toBe(10);
      expect(toNumber('  0o77  ')).toBe(63);
    });

    it('should return NaN for non-numeric strings ID6', () => {
      expect(toNumber('abc')).toBeNaN();
      expect(toNumber('42abc')).toBeNaN();
      expect(toNumber('abc42')).toBeNaN();
    });

    it('should return NaN for strings with embedded spaces ID7', () => {
      expect(toNumber('4 2')).toBeNaN();
      expect(toNumber('4.2.3')).toBeNaN();
    });
  });

  describe('Special Number Formats', () => {
    it('should handle binary string values ID8', () => {
      expect(toNumber('0b101')).toBe(5);
      expect(toNumber('0b110')).toBe(6);
    });

    it('should handle octal string values ID9', () => {
      expect(toNumber('0o10')).toBe(8);
      expect(toNumber('0o20')).toBe(16);
    });

    it('should handle hexadecimal string values ID10', () => {
      expect(toNumber('0x1F')).toBe(31);
      expect(toNumber('0xFF')).toBe(255);
    });

    it('should handle exponential notation correctly ID11', () => {
      expect(toNumber('1e10')).toBe(1e10);
      expect(toNumber('-1e-10')).toBe(-1e-10);
    });
  });

  describe('Edge Cases with Special Strings', () => {
    it('should handle edge cases for hex strings ID12', () => {
      expect(toNumber('0x')).toBeNaN();
      expect(toNumber('0x1G')).toBeNaN();
      expect(toNumber('0x123.')).toBeNaN();
      expect(toNumber('+0x123')).toBeNaN();
      expect(toNumber('-0x')).toBeNaN();
    });

    it('should return NaN for invalid hex strings not matched by reIsBadHex ID12', () => {
      expect(toNumber('ZZZ')).toBeNaN();
      expect(toNumber('0y123')).toBeNaN();
      expect(toNumber(' 0x1G ')).toBeNaN();
    });
  });

  describe('Special Inputs', () => {
    it('should return 0 for null ID13', () => {
      expect(toNumber(null)).toBe(0);
    });

    it('should return NaN for undefined ID14', () => {
      expect(toNumber(undefined)).toBeNaN();
    });

    it('should return 0 for an empty string ID15', () => {
      expect(toNumber('')).toBe(0);
    });

    it('should convert true to 1 and false to 0 ID16', () => {
      expect(toNumber(true)).toBe(1);
      expect(toNumber(false)).toBe(0);
    });
  });

  describe('Objects and Arrays', () => {
    it('should return 0 for an object that coerces to 0 ID17', () => {
      const obj = { valueOf: () => 0 };
      expect(toNumber(obj)).toBe(0);
    });

    it('should handle objects with custom `valueOf` methods ID18', () => {
      const obj = { valueOf: () => '42' };
      expect(toNumber(obj)).toBe(42);
    });

    it('should return NaN for objects that cannot be coerced ID19', () => {
      expect(toNumber({})).toBeNaN();
      expect(toNumber(Object.create(null))).toBeNaN();
    });

    it('should handle arrays with single elements ID20', () => {
      expect(toNumber([42])).toBe(42);
      expect(toNumber(['42'])).toBe(42);
    });

    it('should return NaN for arrays with multiple elements ID21', () => {
      expect(toNumber([1, 2, 3])).toBeNaN();
    });
  });

  describe('Symbols and Functions', () => {
    it('should return NaN for symbols ID22', () => {
      const symbol = Symbol('test');
      expect(toNumber(symbol)).toBeNaN();
    });

    it('should return NaN for functions ID23', () => {
      expect(toNumber(() => {})).toBeNaN();
    });
  });

  describe('Handling Large and Small Numbers', () => {
    it('should handle extremely large numbers ID24', () => {
      expect(toNumber('1e+308')).toBe(1e308);
      expect(toNumber('-1e+308')).toBe(-1e308);
    });

    it('should handle extremely small numbers ID25', () => {
      expect(toNumber('1e-308')).toBe(1e-308);
      expect(toNumber('5e-324')).toBe(5e-324);
    });

    it('should handle very large floating-point strings ID26', () => {
      expect(toNumber('1.7976931348623157e+308')).toBe(1.7976931348623157e308);
    });

    it('should handle very small floating-point strings ID27', () => {
      expect(toNumber('5e-324')).toBe(5e-324);
    });
  });

  describe('Error Handling', () => {
    it('should return NaN for null prototype objects ID28', () => {
      const nullProtoObject = Object.create(null);
      expect(toNumber(nullProtoObject)).toBeNaN();
    });

    it('should return NaN for objects with a `toString` that throws an error ID29', () => {
      const obj = {
        toString() {
          throw new Error('Cannot convert to string');
        },
      };
      expect(() => toNumber(obj)).toThrow();
    });

    it('should return NaN for objects with circular references ID30', () => {
      const circularObj = {};
      circularObj.self = circularObj;
      expect(toNumber(circularObj)).toBeNaN();
    });
  });
});
