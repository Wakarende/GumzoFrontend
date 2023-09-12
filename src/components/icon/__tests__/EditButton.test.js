import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import EditButton from '../editProfileIcon';
import colors from '../../../config/colors';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
  return {
    __esModule: true,
    default: () => {
      return 'Icon';
    },
  };
});

describe('<EditButton />', () => {
  it('renders without crashing', () => {
    render(<EditButton onPress={jest.fn()} />);
  });

  it('displays the correct icon with right name, size, and color', () => {
    const {getByTestId} = render(<EditButton onPress={jest.fn()} />);
    const icon = getByTestId('edit-icon');

    expect(icon.props.name).toBe('square-edit-outline');
    expect(icon.props.size).toBe(25);
    expect(icon.props.color).toBe(colors.grannySmithApple);
  });

  it('calls the onPress handler when pressed', () => {
    const mockPress = jest.fn();
    const {getByTestId} = render(<EditButton onPress={mockPress} />);
    const button = getByTestId('edit-button');

    fireEvent.press(button);

    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
