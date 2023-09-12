import {proficiencyLevels} from './proficiency';

/**
 * Function to find potential matches for the current user based on shared interests and proficiency level.
 *
 * @param {Object} currentUser - The currently authenticated user object, containing interests and proficiency details.
 * @param {Array} allUsers - An array containing user objects to be filtered as potential matches.
 * @returns {Array} An array of user objects that match the criteria for potential connections.
 */
export const getPotentialMatches = (currentUser, allUsers) => {
  return allUsers.filter(user => {
    //Ensure current user is not included as a potential match
    if (user.id === currentUser.uid) {
      return false;
    }

    /**
     * Helper function to fetch the numeric representation of a given proficiency level.
     *
     * @param {string} proficiency - The string representation of a proficiency level.
     * @returns {number} The numeric value associated with the provided proficiency level. If not found, it defaults to 0.
     */
    function getProficiencyValue(proficiency) {
      const level = proficiencyLevels.find(
        level => level.proficiency === proficiency,
      );
      return level ? level.value : 0;
    }

    /**
     * Check if the user and the current user share any common interests.
     */
    const hasCommonInterests =
      user.selectedInterests?.some(interestObj =>
        currentUser.selectedInterests?.some(
          currentUserInterestObj =>
            currentUserInterestObj.interest === interestObj.interest,
        ),
      ) || false;

    // Convert the proficiency descriptions of both users to their corresponding numeric values
    const currentUserProficiencyValue = getProficiencyValue(
      currentUser.selectedProficiency[0]?.proficiency,
    );
    const userProficiencyValue = getProficiencyValue(
      user.selectedProficiency[0]?.proficiency,
    );

    /**
     * Determine if the proficiency level of the potential match meets the requirements.
     * A user with the highest proficiency value (4) is compatible with all users.
     * Otherwise, only users with a proficiency value greater than or equal to the current user are considered.
     */
    const proficiencyMeetsNeeds =
      currentUserProficiencyValue === 4
        ? true
        : userProficiencyValue >= currentUserProficiencyValue;

    // Only return potential matches that share common interests and meet the proficiency requirements
    return hasCommonInterests && proficiencyMeetsNeeds;
  });
};
