import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import BackArrow from '../BackArrow';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('@react-navigation/native', () => ({
  useTheme: jest.fn(() => ({colors: {text: 'black'}})),
}));

describe('<BackArrow />', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(<BackArrow onPress={jest.fn()} />);
    expect(getByTestId('back-arrow-button')).toBeTruthy();
    expect(getByTestId('back-arrow-icon')).toBeTruthy();
  });

  it('calls onPress when the icon is pressed', () => {
    const mockOnPress = jest.fn();
    const {getByTestId} = render(<BackArrow onPress={mockOnPress} />);

    const button = getByTestId('back-arrow-button');
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('uses the correct icon name', () => {
    const {getByTestId} = render(<BackArrow onPress={jest.fn()} />);
    const icon = getByTestId('back-arrow-icon');
    expect(icon.props.name).toBe('arrow-left');
  });
});
