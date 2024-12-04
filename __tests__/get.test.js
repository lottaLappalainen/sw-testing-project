import get from '../src/get.js';

describe('get', () => {
  it('should return the value at the given path of an object', () => {
    const obj = { a: { b: { c: 42 } } };
    expect(get(obj, 'a.b.c')).toBe(42);
  });

  it('should return default value if path does not exist', () => {
    const obj = { a: { b: { c: 42 } } };
    expect(get(obj, 'a.b.d', 'default')).toBe('default');
  });

  it('should return undefined if path does not exist and no default is provided', () => {
    const obj = { a: { b: { c: 42 } } };
    expect(get(obj, 'a.b.d')).toBeUndefined();
  });
});
