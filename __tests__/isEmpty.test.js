import isEmpty from '../src/isEmpty.js';

describe('isEmpty', () => {
  describe('Primitive Values', () => {
    it('should return true for null ID1', () => {
      expect(isEmpty(null)).toBe(true);
    });

    it('should return true for undefined ID2', () => {
      expect(isEmpty(undefined)).toBe(true);
    });

    it('should return true for a boolean value ID3', () => {
      expect(isEmpty(true)).toBe(true);
      expect(isEmpty(false)).toBe(true);
    });

    it('should return true for a number ID4', () => {
      expect(isEmpty(0)).toBe(true);
      expect(isEmpty(1)).toBe(true);
      expect(isEmpty(-1)).toBe(true);
      expect(isEmpty(NaN)).toBe(true);
    });

    it('should return true for an empty string ID5', () => {
      expect(isEmpty('')).toBe(true);
    });

    it('should return false for a non-empty string ID6', () => {
      expect(isEmpty('abc')).toBe(false);
      expect(isEmpty(' ')).toBe(false);
    });
  });

  describe('Collections', () => {
    it('should return true for an empty array ID7', () => {
      expect(isEmpty([])).toBe(true);
    });

    it('should return false for a non-empty array ID8', () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
    });

    it('should return true for an empty object ID9', () => {
      expect(isEmpty({})).toBe(true);
    });

    it('should return false for a non-empty object ID10', () => {
      expect(isEmpty({ a: 1 })).toBe(false);
    });

    it('should return true for an empty Map ID11', () => {
      expect(isEmpty(new Map())).toBe(true);
    });

    it('should return false for a non-empty Map ID', () => {
      const map = new Map();
      map.set('key', 'value');
      expect(isEmpty(map)).toBe(false);
    });

    it('should return true for an empty Set ID13', () => {
      expect(isEmpty(new Set())).toBe(true);
    });

    it('should return false for a non-empty Set ID14', () => {
      const set = new Set();
      set.add(1);
      expect(isEmpty(set)).toBe(false);
    });

    it('should return false for arrays with falsy values ID15', () => {
      expect(isEmpty([null, undefined, 0, false, ''])).toBe(false);
    });

    it('should return false for a Set with null values explicitly added ID16', () => {
      const set = new Set();
      set.add(null);
      expect(isEmpty(set)).toBe(false);
    });
  });

  describe('Buffers and Arguments', () => {
    it('should return true for an empty Buffer ID17', () => {
      expect(isEmpty(Buffer.alloc(0))).toBe(true);
    });

    it('should return false for a non-empty Buffer ID18', () => {
      expect(isEmpty(Buffer.alloc(10))).toBe(false);
    });

    it('should return true for arguments with no elements ID19', () => {
      const args = (function () {
        return arguments;
      })();
      expect(isEmpty(args)).toBe(true);
    });

    it('should return false for arguments with elements ID20', () => {
      const args = (function () {
        return arguments;
      })(1, 2, 3);
      expect(isEmpty(args)).toBe(false);
    });
  });

  describe('Functions and Prototypes', () => {
    it('should return true for a function ID21', () => {
      expect(isEmpty(() => {})).toBe(true);
    });

    it('should return false for functions with properties ID22', () => {
      function func() {}
      func.prop = 'value';
      expect(isEmpty(func)).toBe(false);
    });

    it('should return true for Object.prototype ID23', () => {
      expect(isEmpty(Object.prototype)).toBe(true);
    });

    it('should return true for Array.prototype', () => {
      expect(isEmpty(Array.prototype)).toBe(true);
    });

    it('should return true for Function.prototype ID24', () => {
      expect(isEmpty(Function.prototype)).toBe(true);
    });

    it('should return true for the prototype of a custom constructor ID25', () => {
      function MyConstructor() {}
      expect(isEmpty(MyConstructor.prototype)).toBe(true);
    });

    it('should return false for a prototype object with own properties ID26', () => {
      function MyConstructor() {}
      MyConstructor.prototype.someProperty = 'value';
      expect(isEmpty(MyConstructor.prototype)).toBe(false);
    });
  });

  describe('Special Objects', () => {
    it('should return true for a Date object ID27', () => {
      expect(isEmpty(new Date())).toBe(true);
    });

    it('should return true for a Symbol ID28', () => {
      expect(isEmpty(Symbol('test'))).toBe(true);
    });

    it('should return true for an empty WeakMap ID29', () => {
      expect(isEmpty(new WeakMap())).toBe(true);
    });

    it('should return true for an empty WeakSet ID30', () => {
      expect(isEmpty(new WeakSet())).toBe(true);
    });

    it('should handle objects with non-enumerable properties ID31', () => {
      const obj = Object.create(
        {},
        {
          nonEnum: {
            value: 42,
            enumerable: false,
          },
        }
      );
      expect(isEmpty(obj)).toBe(true);
    });

    it('should return false for objects with symbol-keyed properties ID32', () => {
      const sym = Symbol('key');
      const obj = { [sym]: 'value' };
      expect(isEmpty(obj)).toBe(false);
    });

    it('should handle objects that inherit properties but have no own properties ID33', () => {
      function Parent() {}
      Parent.prototype.prop = 'inherited';
      const obj = new Parent();
      expect(isEmpty(obj)).toBe(true);
    });
  });

  describe('Regular Expressions and Custom Objects', () => {
    it('should return true for a newly created RegExp object ID34', () => {
      expect(isEmpty(/test/)).toBe(true);
    });

    it('should return false for a RegExp object with properties ID35', () => {
      const regex = /test/;
      regex.prop = 'value';
      expect(isEmpty(regex)).toBe(false);
    });

    it('should handle custom iterable objects correctly ID36', () => {
      const customIterable = {
        length: 0,
        [Symbol.iterator]: function* () {},
      };
      expect(isEmpty(customIterable)).toBe(true);
    });
  });
});
