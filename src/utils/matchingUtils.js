import {proficiencyLevels} from './proficiency';

//Function to determine potential matches for the current user based on interests and proficiency
export const getPotentialMatches = (currentUser, allUsers) => {
  return allUsers.filter(user => {
    //Don't include current user as a potential match
    if (user.id === currentUser.uid) {
      return false;
    }
    //Function to fetch numeric value given to each proficiency
    function getProficiencyValue(proficiency) {
      const level = proficiencyLevels.find(
        level => level.proficiency === proficiency,
      );
      return level ? level.value : 0;
    }

    //Function to check if user and current user share any common interests
    const hasCommonInterests =
      user.selectedInterests?.some(interestObj =>
        currentUser.selectedInterests?.some(
          currentUserInterestObj =>
            currentUserInterestObj.interest === interestObj.interest,
        ),
      ) || false;

    //Map proficiency descriptions to their corresponding numeric values
    const currentUserProficiencyValue = getProficiencyValue(
      currentUser.selectedProficiency[0]?.proficiency,
    );
    const userProficiencyValue = getProficiencyValue(
      user.selectedProficiency[0]?.proficiency,
    );

    //Function to check if the proficiency meets the requirements for matching
    const proficiencyMeetsNeeds =
      currentUserProficiencyValue === 4
        ? true
        : userProficiencyValue >= currentUserProficiencyValue;

    //Return true if  conditions are met
    return hasCommonInterests && proficiencyMeetsNeeds;
  });
};
