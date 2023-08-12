import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import UserBioScreen from '../src/screens/profilesetup/UserBioScreen'; // Update with the actual path
import '@testing-library/jest-native/extend-expect';

describe('UserBioScreen Component Test', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockRoute = {
    params: {uid: 'test-uid'},
  };

  it('renders the bio input field and submit button', () => {
    const {getByPlaceholderText, getByText} = render(
      <UserBioScreen navigation={mockNavigation} route={mockRoute} />,
    );

    // Check if the input field and submit button are rendered
    expect(getByPlaceholderText('Bio')).not.toBeNull();
    expect(getByText('Submit')).not.toBeNull();
  });

  it('updates the bio input field when text is entered', () => {
    // NOTE: This test assumes that you're managing the input's value state within the UserBioScreen component.

    const {getByPlaceholderText} = render(
      <UserBioScreen navigation={mockNavigation} route={mockRoute} />,
    );

    const bioInput = getByPlaceholderText('Bio');
    fireEvent.changeText(bioInput, 'My Bio Description');

    // Verify that the input's value is updated
    expect(bioInput.props.value).toBe('My Bio Description');
  });

  it('calls navigation on submit', () => {
    const {getByText} = render(
      <UserBioScreen navigation={mockNavigation} route={mockRoute} />,
    );

    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);

    // Verify that the correct navigation function is called
    expect(mockNavigation.navigate).toHaveBeenCalledWith('DashboardScreen');
  });

  // You could add additional tests to cover other aspects of the component
});
