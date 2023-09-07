const {calculateAge} = require('../calculateAge');

// Mock a Firebase Timestamp
const mockTimestamp = dateString => ({
  toDate: () => new Date(dateString),
});

describe('calculateAge', () => {
  it('should correctly calculate age when birthday has passed in the current year', () => {
    const dob = mockTimestamp('1990-01-01');
    expect(calculateAge(dob)).toBe(new Date().getFullYear() - 1990);
  });

  it('should correctly calculate age when birthday is yet to come in the current year', () => {
    const dob = mockTimestamp('1990-12-31');
    expect(calculateAge(dob)).toBe(new Date().getFullYear() - 1990 - 1);
  });

  it('should handle edge case of Feb 29 in a leap year', () => {
    const dob = mockTimestamp('2000-02-29');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    if (currentDate < new Date(currentYear, 2, 1)) {
      // If it's before March 1
      expect(calculateAge(dob)).toBe(currentYear - 2000 - 1);
    } else {
      expect(calculateAge(dob)).toBe(currentYear - 2000);
    }
  });
});
