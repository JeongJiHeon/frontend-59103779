import { formatDate, formatDateTime, formatTime, isValidDate, parseISODate } from '@/utils/date';

describe('Date Utils', () => {
  const testDate = new Date('2024-01-15T14:30:00');

  describe('formatDate', () => {
    it('should format date with default format', () => {
      const result = formatDate(testDate);
      expect(result).toBe('2024-01-15');
    });

    it('should format date with custom format', () => {
      const result = formatDate(testDate, 'yyyy/MM/dd');
      expect(result).toBe('2024/01/15');
    });
  });

  describe('formatDateTime', () => {
    it('should format date and time', () => {
      const result = formatDateTime(testDate);
      expect(result).toBe('2024-01-15 14:30');
    });
  });

  describe('formatTime', () => {
    it('should format time only', () => {
      const result = formatTime(testDate);
      expect(result).toBe('14:30');
    });
  });

  describe('isValidDate', () => {
    it('should return true for valid dates', () => {
      expect(isValidDate(new Date())).toBe(true);
    });

    it('should return false for invalid dates', () => {
      expect(isValidDate(new Date('invalid'))).toBe(false);
      expect(isValidDate('not a date')).toBe(false);
      expect(isValidDate(null)).toBe(false);
    });
  });

  describe('parseISODate', () => {
    it('should parse valid ISO date string', () => {
      const result = parseISODate('2024-01-15T14:30:00');
      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2024);
    });

    it('should return null for invalid date string', () => {
      expect(parseISODate('invalid')).toBeNull();
    });
  });
});
