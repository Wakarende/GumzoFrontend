import React from 'react';
import {Text} from 'react-native';
import {render} from '@testing-library/react-native';
import NotificationBadge from '../NotificationBadge';

// Mocking AppText component
jest.mock('../../text/AppText.js', () => {
  const Text = require('react-native').Text;
  return ({children}) => <Text>{children}</Text>;
});

describe('<NotificationBadge />', () => {
  it('renders correctly when count is provided', () => {
    const {getByText} = render(<NotificationBadge count={5} />);
    expect(getByText('5')).toBeTruthy();
  });

  it('does not render when count is not provided', () => {
    const {queryByText} = render(<NotificationBadge />);
    expect(queryByText(/./)).toBeNull();
  });

  it('does not render when count is zero', () => {
    const {queryByText} = render(<NotificationBadge count={0} />);
    expect(queryByText('0')).toBeNull();
  });

  it('displays the correct count value', () => {
    const {getByText} = render(<NotificationBadge count={42} />);
    expect(getByText('42')).toBeTruthy();
  });
});
