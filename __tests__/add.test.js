import add from '../src/add.js';

describe('add', () => {
  it('should add two positive numbers', () => {
    expect(add(6, 4)).toBe(10);
  });

  it('should add a positive and a negative number', () => {
    expect(add(6, -4)).toBe(2);
  });

  it('should add two negative numbers', () => {
    expect(add(-6, -4)).toBe(-10);
  });

  it('should add a number and zero', () => {
    expect(add(6, 0)).toBe(6);
    expect(add(0, 4)).toBe(4);
  });

  it('should add zero and zero', () => {
    expect(add(0, 0)).toBe(0);
  });

  it('should handle adding numbers with decimals', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 10); 
  });

  it('should handle adding large numbers', () => {
    expect(add(1e10, 1e10)).toBe(2e10);
  });

  it('should handle adding very small numbers', () => {
    expect(add(1e-10, 1e-10)).toBe(2e-10);
  });

  it('should handle adding Infinity', () => {
    expect(add(Infinity, 10)).toBe(Infinity);
    expect(add(10, Infinity)).toBe(Infinity);
    expect(add(Infinity, -Infinity)).toBeNaN(); 
  });

  it('should handle adding NaN', () => {
    expect(add(NaN, 10)).toBeNaN();
    expect(add(10, NaN)).toBeNaN();
    expect(add(NaN, NaN)).toBeNaN();
  });

  it('should handle adding non-numeric inputs that can be coerced to numbers', () => {
    expect(add('6', '4')).toBe(10);
    expect(add('6', 4)).toBe(10);
    expect(add(6, '4')).toBe(10);
    expect(add(true, 1)).toBe(2); 
    expect(add(false, 1)).toBe(1);
  });

  it('should return NaN for non-numeric inputs that cannot be coerced', () => {
    expect(add('a', 4)).toBeNaN();
    expect(add(6, 'b')).toBeNaN();
    expect(add({}, [])).toBeNaN();
    expect(add(null, undefined)).toBeNaN();
  });

  it('should handle adding negative zero', () => {
    expect(Object.is(add(0, -0), 0)).toBe(true); 
    expect(Object.is(add(-0, -0), -0)).toBe(true);
  });

  it('should handle adding extremely large and small values', () => {
    expect(add(Number.MAX_VALUE, 1)).toBe(Number.MAX_VALUE); 
    expect(add(-Number.MAX_VALUE, -1)).toBe(-Number.MAX_VALUE); 
    expect(add(Number.MIN_VALUE, 1)).toBeCloseTo(1, 10); 
    expect(add(-Number.MIN_VALUE, -1)).toBeCloseTo(-1, 10); 
  });
});
