import {getPotentialMatches} from '../matchingUtils';

const proficiencyLevelsMock = [
  {proficiency: 'Beginner', value: 1},
  {proficiency: 'Intermediate', value: 2},
  {proficiency: 'Advanced', value: 3},
  {proficiency: 'Native', value: 4},
];

const createUser = (id, interests, proficiency) => ({
  id,
  uid: id,
  selectedInterests: interests.map(interest => ({interest})),
  selectedProficiency: [{proficiency}],
});

describe('getPotentialMatches', () => {
  //Basic matching
  it('should match users with common interests and matching proficiencies', () => {
    const currentUser = createUser('1', ['Music', 'Movies'], 'Beginner');
    const allUsers = [
      createUser('2', ['Music'], 'Beginner'),
      createUser('3', ['Sports'], 'Beginner'),
    ];

    const matches = getPotentialMatches(currentUser, allUsers);
    expect(matches).toEqual([allUsers[0]]);
  });

  //No current user in potential matches
  it('should not return the currentUser in the matched list', () => {
    const currentUser = createUser('1', ['Music'], 'Beginner');
    const allUsers = [
      createUser('1', ['Music'], 'Beginner'),
      createUser('2', ['Movies'], 'Intermediate'),
    ];

    const matches = getPotentialMatches(currentUser, allUsers);
    expect(matches).not.toContainEqual(currentUser);
  });

  //No common interests
  it('should not match users with no common interests', () => {
    const currentUser = createUser('1', ['Music'], 'Beginner');
    const allUsers = [createUser('2', ['Sports'], 'Beginner')];

    const matches = getPotentialMatches(currentUser, allUsers);
    expect(matches).toEqual([]);
  });

  //Match users based on proficiency levels
  it('should match users based on proficiency levels', () => {
    const currentUser = createUser('1', ['Music'], 'Beginner');
    const allUsers = [
      createUser('2', ['Music'], 'Intermediate'),
      createUser('3', ['Music'], 'Beginner'),
      createUser('4', ['Music'], 'Advanced'),
      createUser('5', ['Music'], 'Native'),
      createUser('6', ['Music'], 'NoLevel'), // Test for a non-existent proficiency
    ];

    const matches = getPotentialMatches(currentUser, allUsers);
    expect(matches).toEqual(allUsers.slice(0, 4)); // The first four users should match
  });

  //Special case for proficiency level 4 (native)
  it('should handle proficiency level 4 of currentUser', () => {
    const currentUser = createUser('1', ['Music'], 'Native');
    const allUsers = [
      createUser('2', ['Music'], 'Beginner'),
      createUser('3', ['Music'], 'Intermediate'),
      createUser('4', ['Music'], 'Advanced'),
      createUser('5', ['Music'], 'Native'),
    ];

    const matches = getPotentialMatches(currentUser, allUsers);
    expect(matches).toEqual(allUsers);
  });
});
