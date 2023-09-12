import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import ListItem from '../ListItem';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('../../../../assets/profileImg.jpg', () => 'defaultImage');

describe('<ListItem />', () => {
  it('renders without crashing', () => {
    render(<ListItem title="Test Item" />);
  });

  it('displays the title', () => {
    const {getByText} = render(<ListItem title="Test Item" />);
    expect(getByText('Test Item')).toBeTruthy();
  });

  it('displays the subTitle', () => {
    const {getByText} = render(
      <ListItem title="Test Item" subTitle="Sub Title" />,
    );
    expect(getByText('Sub Title')).toBeTruthy();
  });

  it('displays the default profile image when imageUrl is not provided', () => {
    const {getByTestId} = render(
      <ListItem title="Test Item" isProfile={true} />,
    );
    const image = getByTestId('profile-image');
    expect(image.props.source).toBe('defaultImage');
  });

  it('displays the image from imageUrl', () => {
    const testImageUrl = 'http://test.com/image.jpg';
    const {getByTestId} = render(
      <ListItem title="Test Item" isProfile={true} imageUrl={testImageUrl} />,
    );
    const image = getByTestId('profile-image');
    expect(image.props.source.uri).toBe(testImageUrl);
  });

  it('displays the default profile image on image load error', () => {
    const testImageUrl = 'http://test.com/image.jpg';
    const {getByTestId} = render(
      <ListItem title="Test Item" isProfile={true} imageUrl={testImageUrl} />,
    );
    const image = getByTestId('profile-image');
    fireEvent(image, 'onError');
    expect(image.props.source).toBe('defaultImage');
  });

  it('triggers the onPress handler when pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <ListItem title="Test Item" onPress={onPressMock} />,
    );
    fireEvent.press(getByText('Test Item'));
    expect(onPressMock).toHaveBeenCalled();
  });
  it('renders the default Arrow icon when no endIcons or endIcon are provided', () => {
    const {getByTestId} = render(<ListItem title="Test Item" />);
    const arrowIcon = getByTestId('default-arrow-icon');
    expect(arrowIcon).toBeTruthy();
  });

  it('renders the provided endIcon', () => {
    const testIcon = {
      name: 'heart',
      onPress: jest.fn(),
    };
    const {getByTestId} = render(
      <ListItem title="Test Item" endIcon={testIcon} />,
    );
    const icon = getByTestId('end-single-icon');
    fireEvent.press(icon);
    expect(testIcon.onPress).toHaveBeenCalled();
  });

  it('renders multiple endIcons and they are pressable', () => {
    const icons = [
      {name: 'heart', onPress: jest.fn()},
      {name: 'star', onPress: jest.fn()},
    ];
    const {getAllByTestId} = render(
      <ListItem title="Test Item" endIcons={icons} />,
    );
    const renderedIcons = getAllByTestId('end-multi-icon');
    expect(renderedIcons.length).toBe(icons.length);

    // Simulate press on each icon
    renderedIcons.forEach((icon, index) => {
      fireEvent.press(icon);
      expect(icons[index].onPress).toHaveBeenCalled();
    });
  });
});
