import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import InterestCard from '../InterestCard';
import colors from '../../../config/colors';

// Mocking MaterialCommunityIcons and AppText component for simplicity
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
// Mocking AppText component
jest.mock('../../text/AppText.js', () => {
  const Text = require('react-native').Text;
  return ({children}) => <Text>{children}</Text>;
});

describe('<InterestCard />', () => {
  it('renders the interest text correctly', () => {
    const {getByText} = render(<InterestCard interest="Gardening" />);
    expect(getByText('Gardening')).toBeTruthy();
  });

  it('triggers the onPress handler when pressed', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(<InterestCard onPress={onPressMock} />);

    fireEvent.press(getByTestId('interest-card'));
    expect(onPressMock).toHaveBeenCalled();
  });
  it('applies the isSelected style when isSelected prop is true', () => {
    const {getByTestId} = render(<InterestCard isSelected={true} />);
    const card = getByTestId('interest-card');

    expect(card.props.style.backgroundColor).toBe(colors.pastelGreen);
  });

  it('renders the correct icon based on the iconName prop', () => {
    const {getByTestId} = render(<InterestCard iconName="flower" />);
    const icon = getByTestId('interest-icon');
    expect(icon.props.name).toBe('flower');
  });
});
