import toNumber from '../src/toNumber.js';

describe('toNumber', () => {
  it('should return the same number for a valid number', () => {
    expect(toNumber(42)).toBe(42);
    expect(toNumber(-42)).toBe(-42);
    expect(toNumber(3.14159)).toBe(3.14159);
  });

  it('should handle `Number.MIN_VALUE` correctly', () => {
    expect(toNumber(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
  });

  it('should handle `Infinity` and `-Infinity` correctly', () => {
    expect(toNumber(Infinity)).toBe(Infinity);
    expect(toNumber(-Infinity)).toBe(-Infinity);
  });

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

  it('should return NaN for non-numeric strings', () => {
    expect(toNumber('abc')).toBeNaN();
    expect(toNumber('42abc')).toBeNaN();
    expect(toNumber('abc42')).toBeNaN();
  });

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

  it('should return NaN for invalid hexadecimal, binary, or octal strings', () => {
    expect(toNumber('0b123')).toBeNaN();
    expect(toNumber('0o89')).toBeNaN();
    expect(toNumber('0xZZ')).toBeNaN();
  });

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

  it('should return NaN for NaN', () => {
    expect(toNumber(NaN)).toBeNaN();
  });

  it('should handle special numeric constants', () => {
    expect(toNumber(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
    expect(toNumber(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
  });

  it('should return NaN for objects that cannot be coerced', () => {
    expect(toNumber({})).toBeNaN();
    expect(toNumber([])).toBe(0);
    expect(toNumber([1])).toBe(1);
    expect(toNumber([1, 2])).toBeNaN();
  });

  it('should return NaN for symbols', () => {
    const symbol = Symbol('test');
    expect(toNumber(symbol)).toBeNaN();
  });  

  it('should return NaN for functions', () => {
    expect(toNumber(() => {})).toBeNaN();
  });

  it('should handle extremely large numbers', () => {
    expect(toNumber('1e+308')).toBe(1e308);
    expect(toNumber('-1e+308')).toBe(-1e308);
  });

  it('should handle extremely small numbers', () => {
    expect(toNumber('1e-308')).toBe(1e-308);
  });

  it('should handle cases with mixed whitespace and numeric characters', () => {
    expect(toNumber('  -42abc')).toBeNaN();
    expect(toNumber('42   ')).toBe(42);
  });

  it('should return NaN for null prototype objects', () => {
    const nullProtoObject = Object.create(null);
    expect(toNumber(nullProtoObject)).toBeNaN();
  });

  it('should handle very large floating-point strings', () => {
    expect(toNumber('1.7976931348623157e+308')).toBe(1.7976931348623157e+308); 
  });

  it('should handle very small floating-point strings', () => {
    expect(toNumber('5e-324')).toBe(5e-324);
  });

  it('should return NaN for strings with embedded spaces', () => {
    expect(toNumber('4 2')).toBeNaN();
    expect(toNumber('4.2.3')).toBeNaN();
  });

  it('should handle exponential notation correctly', () => {
    expect(toNumber('1e10')).toBe(1e10);
    expect(toNumber('-1e-10')).toBe(-1e-10);
  });

  it('should handle objects with a custom `valueOf` method returning strings', () => {
    const obj = {
      valueOf: () => '42',
    };
    expect(toNumber(obj)).toBe(42);
  });

  it('should handle objects with a custom `valueOf` method returning numbers', () => {
    const obj = {
      valueOf: () => 99,
    };
    expect(toNumber(obj)).toBe(99);
  });

  it('should return NaN for objects with circular references', () => {
    const circularObj = {};
    circularObj.self = circularObj;
    expect(toNumber(circularObj)).toBeNaN();
  });

  it('should handle booleans in object wrappers', () => {
    expect(toNumber(new Boolean(true))).toBe(1);
    expect(toNumber(new Boolean(false))).toBe(0);
  });

  it('should handle special number-like strings with padding', () => {
    expect(toNumber('  0xFF  ')).toBe(255);
    expect(toNumber('  0b1010 ')).toBe(10);
    expect(toNumber('  0o77  ')).toBe(63);
  });

  it('should handle empty array as 0 and array with one element as a number', () => {
    expect(toNumber([])).toBe(0);
    expect(toNumber([42])).toBe(42);
    expect(toNumber(['42'])).toBe(42);
  });

  it('should return NaN for arrays with multiple elements', () => {
    expect(toNumber([1, 2, 3])).toBeNaN();
  });

  it('should return NaN for objects with no coercible value', () => {
    expect(toNumber(Object.create(null))).toBeNaN();
  });

  it('should handle custom objects that stringify to numbers', () => {
    const obj = {
      toString() {
        return '123';
      },
    };
    expect(toNumber(obj)).toBe(123);
  });

  it('should return NaN for objects with a `toString` that throws an error', () => {
    const obj = {
      toString() {
        throw new Error('Cannot convert to string');
      },
    };
    expect(() => toNumber(obj)).toThrow();
  });

});
