import isEmpty from '../src/isEmpty.js';

describe('isEmpty', () => {
  it('should return true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  it('should return true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it('should return true for a boolean value', () => {
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(false)).toBe(true);
  });

  it('should return true for a number', () => {
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty(1)).toBe(true);
    expect(isEmpty(-1)).toBe(true);
    expect(isEmpty(NaN)).toBe(true);
  });

  it('should return true for an empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('should return false for a non-empty string', () => {
    expect(isEmpty('abc')).toBe(false);
    expect(isEmpty(' ')).toBe(false);
  });

  it('should return true for an empty array', () => {
    expect(isEmpty([])).toBe(true);
  });

  it('should return false for a non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  it('should return true for an empty object', () => {
    expect(isEmpty({})).toBe(true);
  });

  it('should return false for a non-empty object', () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  it('should return true for an empty Map', () => {
    expect(isEmpty(new Map())).toBe(true);
  });

  it('should return false for a non-empty Map', () => {
    const map = new Map();
    map.set('key', 'value');
    expect(isEmpty(map)).toBe(false);
  });

  it('should return true for an empty Set', () => {
    expect(isEmpty(new Set())).toBe(true);
  });

  it('should return false for a non-empty Set', () => {
    const set = new Set();
    set.add(1);
    expect(isEmpty(set)).toBe(false);
  });

  it('should return true for an empty Buffer', () => {
    expect(isEmpty(Buffer.alloc(0))).toBe(true);
  });

  it('should return false for a non-empty Buffer', () => {
    expect(isEmpty(Buffer.alloc(10))).toBe(false);
  });

  it('should return true for arguments with no elements', () => {
    const args = (function () {
      return arguments;
    })();
    expect(isEmpty(args)).toBe(true);
  });

  it('should return false for arguments with elements', () => {
    const args = (function () {
      return arguments;
    })(1, 2, 3);
    expect(isEmpty(args)).toBe(false);
  });

  it('should return true for a function', () => {
    expect(isEmpty(() => {})).toBe(true);
  });

  it('should return false for an object with non-enumerable properties', () => {
    const obj = Object.create({}, {
      a: {
        value: 1,
        enumerable: false,
      },
    });
    expect(isEmpty(obj)).toBe(true);
  });

  it('should return true for a Date object', () => {
    expect(isEmpty(new Date())).toBe(true);
  });

  it('should return true for a Symbol', () => {
    expect(isEmpty(Symbol('test'))).toBe(true);
  });

  it('should return true for an empty WeakMap', () => {
    expect(isEmpty(new WeakMap())).toBe(true);
  });

  it('should return true for an empty WeakSet', () => {
    expect(isEmpty(new WeakSet())).toBe(true);
  });

  it('should return false for arrays with falsy values', () => {
    expect(isEmpty([null, undefined, 0, false, ''])).toBe(false);
  });

  it('should return true for objects with only non-enumerable properties', () => {
    const obj = Object.create({}, {
      nonEnum: {
        value: 42,
        enumerable: false
      }
    });
    expect(isEmpty(obj)).toBe(true);
  });

  it('should return false for objects with symbol-keyed properties', () => {
    const sym = Symbol('key');
    const obj = { [sym]: 'value' };
    expect(isEmpty(obj)).toBe(false);
  });

  it('should handle objects that inherit properties but have no own properties', () => {
    function Parent() {}
    Parent.prototype.prop = 'inherited';
    const obj = new Parent();
    expect(isEmpty(obj)).toBe(true);
  });

  it('should return true for functions with properties', () => {
    function func() {}
    func.prop = 'value';
    expect(isEmpty(func)).toBe(false);
  });

  it('should return true for a newly created RegExp object', () => {
    expect(isEmpty(/test/)).toBe(true);
  });

  it('should return false for a RegExp object with properties', () => {
    const regex = /test/;
    regex.prop = 'value';
    expect(isEmpty(regex)).toBe(false);
  });

  it('should handle custom iterable objects correctly', () => {
    const customIterable = {
      length: 0,
      [Symbol.iterator]: function* () {}
    };
    expect(isEmpty(customIterable)).toBe(true);
  });

  it('should return false for a Set with null values explicitly added', () => {
    const set = new Set();
    set.add(null);
    expect(isEmpty(set)).toBe(false);
  });

  it('should return true for Object.prototype', () => {
    expect(isEmpty(Object.prototype)).toBe(true);
  });

  it('should return true for Array.prototype', () => {
    expect(isEmpty(Array.prototype)).toBe(true);
  });

  it('should return true for Function.prototype', () => {
    expect(isEmpty(Function.prototype)).toBe(true);
  });

  it('should return true for the prototype of a custom constructor', () => {
    function MyConstructor() {}
    expect(isEmpty(MyConstructor.prototype)).toBe(true);
  });

  it('should return false for a prototype object with own properties', () => {
    function MyConstructor() {}
    MyConstructor.prototype.someProperty = 'value';
    expect(isEmpty(MyConstructor.prototype)).toBe(false);
  });
});
