import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import PrimaryButton from '../PrimaryButton';

describe('<PrimaryButton />', () => {
  it('renders correctly', () => {
    const {getByText} = render(<PrimaryButton label="Submit" />);
    expect(getByText('Submit')).toBeTruthy();
  });

  it('fires onPress event', () => {
    const mockOnPress = jest.fn();
    const {getByText} = render(
      <PrimaryButton label="Submit" onPress={mockOnPress} />,
    );

    fireEvent.press(getByText('Submit'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('applies custom styles', () => {
    const customStyle = {backgroundColor: 'red'};
    const {getByTestId} = render(
      <PrimaryButton label="Submit" style={customStyle} />,
    );

    expect(getByTestId('primary-button').props.style.backgroundColor).toEqual(
      'red',
    );
  });

  it('applies custom label styles', () => {
    const customLabelStyle = {fontSize: 20};
    const {getByTestId} = render(
      <PrimaryButton label="Submit" labelStyle={customLabelStyle} />,
    );

    expect(getByTestId('primary-button-label').props.style).toContainEqual(
      customLabelStyle,
    );
  });
});
