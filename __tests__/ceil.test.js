import ceil from '../src/ceil.js';

describe('ceil', () => {
  describe('Basic Rounding', () => {
    it('should round up a positive decimal number to the nearest integer ID1', () => {
      expect(ceil(4.006)).toBe(5);
    });

    it('should round up a negative decimal number to the nearest integer ID2', () => {
      expect(ceil(-4.006)).toBe(-4);
    });

    it('should return the same integer if no rounding is needed ID3', () => {
      expect(ceil(5)).toBe(5);
      expect(ceil(-3)).toBe(-3);
    });

    it('should round up zero correctly ID4', () => {
      expect(ceil(0)).toBe(0);
    });
  });

  describe('Precision Rounding', () => {
    describe('Positive Precision', () => {
      it('should round up a number to a specific positive precision ID5', () => {
        expect(ceil(6.004, 2)).toBe(6.01);
        expect(ceil(4.1234, 3)).toBe(4.124);
      });

      it('should handle precision larger than the number of decimal places ID6', () => {
        expect(ceil(4.1, 5)).toBe(4.1);
        expect(ceil(-4.1, 5)).toBe(-4.1);
      });
    });

    describe('Negative Precision', () => {
      it('should round up a number to a specific negative precision ID7', () => {
        expect(ceil(6040, -2)).toBe(6100);
        expect(ceil(1234, -1)).toBe(1240);
      });

      it('should handle precision less than the number of digits in the number ID8', () => {
        expect(ceil(4567, -3)).toBe(5000);
        expect(ceil(-4567, -3)).toBe(-4000);
      });
    });

    describe('Precision of Zero', () => {
      it('should handle precision of zero ID10', () => {
        expect(ceil(4.006, 0)).toBe(5);
        expect(ceil(-4.006, 0)).toBe(-4);
      });
    });
  });

  describe('Edge Cases and Special Numbers', () => {
    it('should handle rounding of very small decimal numbers ID10', () => {
      expect(ceil(0.0004, 3)).toBe(0.001);
      expect(ceil(-0.0004, 3)).toBe(0);
    });

    it('should handle large positive numbers with high precision ID11', () => {
      expect(ceil(1234567.89123, 3)).toBe(1234567.892);
    });

    it('should handle large negative numbers with high precision ID12', () => {
      expect(ceil(-1234567.89123, 3)).toBe(-1234567.891);
    });

    it('should round up infinity correctly ID13', () => {
      expect(ceil(Infinity)).toBe(Infinity);
      expect(ceil(-Infinity)).toBe(-Infinity);
    });
  });

  describe('Invalid Inputs', () => {
    it('should return NaN when the input is not a number ID14', () => {
      expect(ceil(NaN)).toBeNaN();
      expect(ceil('string')).toBeNaN();
      expect(ceil(undefined)).toBeNaN();
    });

    it('should return default results for null and boolean inputs ID15', () => {
      expect(ceil(null)).toBe(0);
      expect(ceil(true)).toBe(1);
      expect(ceil(false)).toBe(0);
    });

    it('should return NaN if precision is not a valid number ID16', () => {
      expect(ceil(4.006, NaN)).toBeNaN();
      expect(ceil(4.006, 'string')).toBeNaN();
      expect(ceil(4.006, null)).toBeNaN();
      expect(ceil(4.006, true)).toBeNaN();
    });
  });
});
