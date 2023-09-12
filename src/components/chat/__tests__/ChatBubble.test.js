import React from 'react';
import {render} from '@testing-library/react-native';
import ChatBubble from '../ChatBubble';
import colors from '../../../config/colors';

// Mocking the Bubble component from react-native-gifted-chat
jest.mock('react-native-gifted-chat', () => ({
  Bubble: jest.fn(props => <mocked-bubble {...props} testID="mocked-bubble" />),
}));

describe('ChatBubble', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Bubble component with the correct styles', () => {
    const mockProps = {
      // Any other mock props you wish to pass to ChatBubble can be added here.
    };

    render(<ChatBubble {...mockProps} />);

    // Here we're checking that the Bubble component was called with the correct props
    const Bubble = require('react-native-gifted-chat').Bubble;
    expect(Bubble).toHaveBeenCalledWith(
      expect.objectContaining({
        textStyle: {
          left: {color: colors.darkGray},
          right: {color: colors.darkGray},
        },
        wrapperStyle: {
          right: {backgroundColor: colors.grannySmithApple},
        },
      }),
      expect.anything(),
    );
  });
});
