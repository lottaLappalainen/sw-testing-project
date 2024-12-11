import get from '../src/get.js';

describe('get', () => {
  describe('Basic Functionality', () => {
    it('should return the value at the given path of an object ID1', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(get(obj, 'a.b.c')).toBe(42);
    });

    it('should return the default value if the path does not exist ID2', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(get(obj, 'a.b.d', 'default')).toBe('default');
    });

    it('should return undefined if the path does not exist and no default is provided ID3', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(get(obj, 'a.b.d')).toBeUndefined();
    });

    it('should return undefined for an empty path ID4', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(get(obj, '')).toBeUndefined();
    });

    it('should handle deeply nested objects ID5', () => {
      const obj = { a: { b: { c: { d: { e: 42 } } } } };
      expect(get(obj, 'a.b.c.d.e')).toBe(42);
    });

    it('should handle deeply nested missing paths with a default value ID6', () => {
      const obj = { a: { b: { c: { d: { e: 42 } } } } };
      expect(get(obj, 'a.b.x.y.z', 'not found')).toBe('not found');
    });
  });

  describe('Paths as Arrays', () => {
    it('should handle path as an array ID7', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(get(obj, ['a', 'b', 'c'])).toBe(42);
    });

    it('should return default value for non-existent key in path array ID8', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(get(obj, ['a', 'x', 'y'], 'default')).toBe('default');
    });

    it('should handle paths with special characters using array notation ID9', () => {
      const obj = { 'a.b': { c: 42 } };
      expect(get(obj, ['a.b', 'c'])).toBe(42);
    });
  });

  describe('Handling Arrays in Objects', () => {
    it('should handle paths with array indices ID10', () => {
      const obj = { a: [{ b: { c: 42 } }] };
      expect(get(obj, 'a.0.b.c')).toBe(42);
    });

    it('should return the default value if array index does not exist ID11', () => {
      const obj = { a: [{ b: { c: 42 } }] };
      expect(get(obj, 'a.1.b.c', 'default')).toBe('default');
    });

    it('should handle mixed array indices and object keys in path ID12', () => {
      const obj = { a: [{ b: { c: [10, 20, { d: 42 }] } }] };
      expect(get(obj, 'a.0.b.c.2.d')).toBe(42);
    });

    it('should handle paths that resolve to empty arrays ID13', () => {
      const obj = { a: [] };
      expect(get(obj, 'a.0', 'default')).toBe('default');
    });

    it('should return undefined for undefined array values ID14', () => {
      const obj = { a: [undefined] };
      expect(get(obj, 'a.0')).toBeUndefined();
    });
  });

  describe('Special Characters and Edge Cases', () => {
    it('should handle paths with special characters ID15', () => {
      const obj = { 'a.b': { c: 42 } };
      expect(get(obj, 'a\\.b.c')).toBeUndefined();
    });

    it('should work with paths that include numbers as keys ID16', () => {
      const obj = { a: { 0: { b: 42 } } };
      expect(get(obj, 'a.0.b')).toBe(42);
    });

    it('should handle numeric string keys ID17', () => {
      const obj = { 123: { b: 42 } };
      expect(get(obj, '123.b')).toBe(42);
    });

    it('should handle functions as values in the path ID18', () => {
      const obj = { a: { b: () => 42 } };
      expect(get(obj, 'a.b')()).toBe(42);
    });
  });

  describe('Handling Invalid Inputs', () => {
    it('should return undefined for empty objects with a path ID19', () => {
      expect(get({}, 'a.b.c')).toBeUndefined();
    });

    it('should handle null as the target object ID20', () => {
      expect(get(null, 'a.b.c', 'default')).toBe('default');
    });

    it('should handle undefined as the target object ID21', () => {
      expect(get(undefined, 'a.b.c', 'default')).toBe('default');
    });

    it('should return default value for null path ID22', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(get(obj, null, 'default')).toBe('default');
    });

    it('should return default value for non-string, non-array path ID23', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(get(obj, 123, 'default')).toBe('default');
    });

    it('should return default value for deeply invalid paths ID24', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(get(obj, 'a.b.x.y.z.w', 'not found')).toBe('not found');
    });

    it('should handle path segments that are null in the object ID25', () => {
      const obj = { a: { b: null } };
      expect(get(obj, 'a.b.c', 'default')).toBe('default');
    });
  });

  describe('Special Object Properties', () => {
    it('should handle symbol keys ID26', () => {
      const sym = Symbol('key');
      const obj = { [sym]: 42 };
      expect(get(obj, sym)).toBe(42);
    });

    it('should not access inherited properties from prototype ID27', () => {
      function Proto() {
        this.a = 42;
      }
      Proto.prototype.b = 100;
      const obj = new Proto();
      expect(get(obj, 'b')).toBeUndefined();
    });
  });
});
