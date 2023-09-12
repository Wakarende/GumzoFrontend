import React from 'react';
import {render} from '@testing-library/react-native';

import ListItemSeparator from '../ListItemSeparator';
import colors from '../../../config/colors';

describe('<ListItemSeparator />', () => {
  it('renders without crashing', () => {
    const {getByTestId} = render(<ListItemSeparator />);
    const separator = getByTestId('list-item-separator');
    expect(separator).toBeTruthy();
  });

  it('has the expected styles', () => {
    const {getByTestId} = render(<ListItemSeparator />);
    const separator = getByTestId('list-item-separator');

    // Check width, height, and backgroundColor
    expect(separator.props.style).toMatchObject({
      width: '90%',
      height: 1,
      backgroundColor: colors.lightGray,
    });
  });
});
