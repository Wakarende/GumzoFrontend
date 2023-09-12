import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ChatActions from '../ChatActions';

// Mocking MaterialCommunityIcons component
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
  const {Text} = require('react-native');
  return props => <Text {...props}>MaterialCommunityIcons</Text>;
});

describe('ChatActions', () => {
  //Test if the component renders without any crashes
  it('renders the component without crashing', () => {
    //Create mock functions to be passed as props
    const mockOnStart = jest.fn();
    const mockOnStop = jest.fn();

    //Render the component with mock functions
    const {getByTestId} = render(
      <ChatActions
        onStartRecording={mockOnStart}
        onStopRecording={mockOnStop}
      />,
    );

    //Check if the component's main container is present in the rendered output
    expect(getByTestId('icon-container')).toBeDefined();
  });

  //Test if the onStartRecording callback gets triggered when the microphone icon is pressed.
  it('triggers onStartRecording when microphone icon is pressed', () => {
    //Create mock functions to be passed as props
    const mockOnStart = jest.fn();
    const mockOnStop = jest.fn();

    //Render the component with mock functions
    const {getAllByText} = render(
      <ChatActions
        onStartRecording={mockOnStart}
        onStopRecording={mockOnStop}
      />,
    );

    const icons = getAllByText('MaterialCommunityIcons');
    const microphoneIcon = icons[0];

    //Simulate a press event on the microphone icon
    fireEvent.press(microphoneIcon);

    //Assert that onStartRecording callback was called
    expect(mockOnStart).toHaveBeenCalled();
  });

  //Test if the onStopRecording callback gets triggered when the stop icon is pressed.
  it('triggers onStopRecording when stop icon is pressed', () => {
    //Create mock functions to be passed as props
    const mockOnStart = jest.fn();
    const mockOnStop = jest.fn();

    const {getAllByText} = render(
      <ChatActions
        onStartRecording={mockOnStart}
        onStopRecording={mockOnStop}
      />,
    );

    const icons = getAllByText('MaterialCommunityIcons');
    fireEvent.press(icons[1]); // index 1 represents the stop icon since it's the second MaterialCommunityIcons component
    expect(mockOnStop).toHaveBeenCalled();
  });
});
