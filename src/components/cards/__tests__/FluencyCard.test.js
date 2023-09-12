import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import FluencyCard from '../FluencyCard';
import colors from '../../../config/colors';

// Mocking AppText component for simplicity
jest.mock('../../text/AppText.js', () => {
  const Text = require('react-native').Text;
  return ({children, color}) => <Text style={{color}}>{children}</Text>;
});
jest.mock('react-native-gesture-handler', () => {
  const {TouchableOpacity} = require('react-native');
  return {
    TouchableOpacity: TouchableOpacity,
  };
});

describe('<FluencyCard />', () => {
  it('renders the title correctly', () => {
    const {getByText} = render(<FluencyCard title="English" />);
    expect(getByText('English')).toBeTruthy();
  });

  it('triggers the onPress handler when pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <FluencyCard title="English" onPress={onPressMock} />,
    );

    fireEvent.press(getByText('English'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('applies the isSelected style when isSelected prop is true', () => {
    const {getByText} = render(
      <FluencyCard title="English" isSelected={true} />,
    );
    const titleElement = getByText('English');

    expect(titleElement.props.style.color).toBe('white');
  });

  it('applies the default color style when isSelected prop is false or not provided', () => {
    const {getByText} = render(<FluencyCard title="English" />);
    const titleElement = getByText('English');

    expect(titleElement.props.style.color).toBe(colors.darkGray);
  });
});
