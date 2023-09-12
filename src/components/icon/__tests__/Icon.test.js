import React from 'react';
import {render} from '@testing-library/react-native';

import Icon from '../Icon';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

describe('<Icon />', () => {
  it('renders without crashing', () => {
    render(<Icon name="heart" />);
  });

  it('uses the passed icon name', () => {
    const iconName = 'heart';
    const {getByTestId} = render(<Icon name={iconName} />);
    const icon = getByTestId('material-icon');

    expect(icon.props.name).toBe(iconName);
  });

  it('applies the provided size, backgroundColor, and iconColor', () => {
    const {getByTestId} = render(
      <Icon name="heart" size={50} backgroundColor="red" iconColor="blue" />,
    );

    const iconWrapper = getByTestId('icon-wrapper');
    const icon = getByTestId('material-icon');

    expect(iconWrapper.props.style).toMatchObject({
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'red',
    });
    expect(icon.props.color).toBe('blue');
    expect(icon.props.size).toBe(25); // since size * 0.5
  });
});
