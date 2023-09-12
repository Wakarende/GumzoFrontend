/**
 * Calculates the age based on a given date of birth.
 *
 * @param {firebase.firestore.Timestamp} dob - The date of birth as a Firestore timestamp.
 * @returns {number} - The calculated age.
 */

export const calculateAge = dob => {
  //Convert Firestore timestamp to JavaScript Date object
  const birthDate = dob.toDate();
  const currentDate = new Date();

  //Calculate the year difference
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  //Calculate the month difference between the current date and the birth date
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};
