import React, {useContext} from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import {FormProvider, FormContext, formReducer} from '../FormContext';

// Test component to simulate and verify the behaviour of the provided context values
const TestComponent = () => {
  const contextValue = useContext(FormContext);
  console.log('Context Value:', contextValue);
  return (
    <div>
      <div data-testid="context-value">
        {JSON.stringify(contextValue.state)}
      </div>
      <div data-testid="context-dispatch">
        {typeof contextValue.dispatch === 'function'
          ? 'function'
          : 'not function'}
      </div>
    </div>
  );
};

//Test suite for the FormProvider component
describe('FormProvider', () => {
  it('provides initial state and dispatch function', () => {
    //Render the provider and check values using the TestComponent
    const {getByTestId} = render(
      <FormProvider>
        <TestComponent />
      </FormProvider>,
    );
    // Parse and validate that the default state values are correctly initialized
    const contextValue = JSON.parse(getByTestId('context-value').textContent);

    //Validate initial values of each field in the state
    expect(contextValue).toHaveProperty('firstName');
    expect(contextValue).toHaveProperty('lastName', '');
    expect(contextValue).toHaveProperty('dob', '');
    expect(contextValue).toHaveProperty('nativeLanguage', []);
    expect(contextValue).toHaveProperty('selectedImage', null);
    expect(contextValue).toHaveProperty('selectedInterests', []);
    expect(contextValue).toHaveProperty('selectedProficiency', []);
    expect(contextValue).toHaveProperty('bio', '');
    expect(contextValue).toHaveProperty('learningGoals', '');
  });
});

// Test suite for the formReducer logic
describe('formReducer', () => {
  // Test the UPDATE_FIELD action for the firstName field
  it('handles UPDATE_FIELD action', () => {
    //Initial state
    const initialState = {
      firstName: '',
    };
    //Dispatching action to update the firstName field
    const action = {
      type: 'UPDATE_FIELD',
      payload: {
        field: 'firstName',
        value: 'John',
      },
    };
    const updatedState = formReducer(initialState, action);
    //Validate that the firstName is updated correctly
    expect(updatedState.firstName).toBe('John');
  });

  //Test the UPDATE_FIELD action for last name field
  it('handles UPDATE_FIELD action for lastName', () => {
    //initial state
    const initialState = {lastName: ''};

    const action = {
      type: 'UPDATE_FIELD',
      payload: {
        field: 'lastName',
        value: 'Doe',
      },
    };
    const updatedState = formReducer(initialState, action);
    expect(updatedState.lastName).toBe('Doe');
  });

  //Test the UPDATE_FIELD action for dob field
  it('handles UPDATE_FIELD action for dob', () => {
    const initialState = {dob: ''};
    const action = {
      type: 'UPDATE_FIELD',
      payload: {
        field: 'dob',
        value: '2000-01-01',
      },
    };
    const updatedState = formReducer(initialState, action);
    expect(updatedState.dob).toBe('2000-01-01');
  });

  //Test the UPDATE_FIELD action for nativeLanguage field
  it('handles UPDATE_FIELD action for nativeLanguage', () => {
    const initialState = {nativeLanguage: []};
    const action = {
      type: 'UPDATE_FIELD',
      payload: {
        field: 'nativeLanguage',
        value: ['English'],
      },
    };
    const updatedState = formReducer(initialState, action);
    expect(updatedState.nativeLanguage).toEqual(['English']);
  });

  //Test the UPDATE_FIELD action for selectedImage field
  it('handles UPDATE_FIELD action for selectedImage', () => {
    const initialState = {selectedImage: ''};
    const action = {
      type: 'UPDATE_FIELD',
      payload: {
        field: 'selectedImage',
        value: 'some_image.png',
      },
    };
    const updatedState = formReducer(initialState, action);
    expect(updatedState.selectedImage).toBe('some_image.png');
  });

  //Test the UPDATE_FIELD action for selectedInterests field
  it('handles UPDATE_FIELD action for selectedInterests', () => {
    const initialState = {selectedInterests: []};
    const action = {
      type: 'UPDATE_FIELD',
      payload: {
        field: 'selectedInterests',
        value: ['Coding', 'Literature'],
      },
    };
    const updatedState = formReducer(initialState, action);
    expect(updatedState.selectedInterests).toEqual(['Coding', 'Literature']);
  });

  //Test the UPDATE_FIELD action for selectedProficiency field
  it('handles UPDATE_FIELD action for selectedProficiency', () => {
    const initialState = {selectedProficiency: []};
    const action = {
      type: 'UPDATE_FIELD',
      payload: {
        field: 'selectedProficiency',
        value: ['Intermediate'],
      },
    };
    const updatedState = formReducer(initialState, action);
    expect(updatedState.selectedProficiency).toEqual(['Intermediate']);
  });

  //Test the UPDATE_FIELD action for bio field
  it('handles UPDATE_FIELD action for bio', () => {
    const initialState = {bio: ''};
    const action = {
      type: 'UPDATE_FIELD',
      payload: {
        field: 'bio',
        value: 'A brief biography',
      },
    };
    const updatedState = formReducer(initialState, action);
    expect(updatedState.bio).toBe('A brief biography');
  });

  //Test the UPDATE_FIELD action for learningGoals field
  it('handles UPDATE_FIELD action for learningGoals', () => {
    const initialState = {learningGoals: ''};
    const action = {
      type: 'UPDATE_FIELD',
      payload: {
        field: 'learningGoals',
        value: 'Master JavaScript',
      },
    };
    const updatedState = formReducer(initialState, action);
    expect(updatedState.learningGoals).toBe('Master JavaScript');
  });

  //Test for unknown actions. Ensure the reducer does not modify the state.
  it('returns current state for unknown action', () => {
    const initialState = {
      firstName: 'John',
      lastName: 'Doe',
      dob: '2000-01-01',
      nativeLanguage: ['English'],
      selectedImage: 'some_image.png',
      selectedInterests: ['Coding', 'Literature'],
      selectedProficiency: ['Intermediate'],
      bio: 'A brief biography',
      learningGoals: 'Master JavaScript',
    };
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: {},
    };
    //Validate that the state remains unchanged for unknown actions
    const updatedState = formReducer(initialState, action);
    //Validation for each field
    expect(updatedState.firstName).toBe(initialState.firstName);
    expect(updatedState.lastName).toBe(initialState.lastName);
    expect(updatedState.dob).toBe(initialState.dob);
    expect(updatedState.nativeLanguage).toEqual(initialState.nativeLanguage);
    expect(updatedState.selectedImage).toBe(initialState.selectedImage);
    expect(updatedState.selectedInterests).toEqual(
      initialState.selectedInterests,
    );
    expect(updatedState.selectedProficiency).toEqual(
      initialState.selectedProficiency,
    );
    expect(updatedState.bio).toBe(initialState.bio);
    expect(updatedState.learningGoals).toBe(initialState.learningGoals);
    expect(updatedState.talkingPoints).toBe(initialState.talkingPoints);
  });
});
