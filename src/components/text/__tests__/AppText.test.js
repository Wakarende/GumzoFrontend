import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import AppText from '../AppText';

describe('<AppText />', () => {
  it('renders without crashing', () => {
    render(<AppText>Sample Text</AppText>);
  });

  it('displays the provided text', () => {
    const {getByText} = render(<AppText>Sample Text</AppText>);
    expect(getByText('Sample Text')).toBeTruthy();
  });

  it('triggers the onPress handler when pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <AppText onPress={onPressMock}>Press me</AppText>,
    );
    fireEvent.press(getByText('Press me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('applies the provided styles', () => {
    const style = {color: 'red'};
    const {getByText} = render(<AppText style={style}>Styled Text</AppText>);
    const appliedStyles = getByText('Styled Text').props.style;
    const matchedStyle = appliedStyles.find(s => s.color === style.color);
    expect(matchedStyle).toMatchObject(style);
  });

  it('honors the numberOfLines prop', () => {
    const {getByText} = render(
      <AppText numberOfLines={2}>This is some long text</AppText>,
    );
    expect(getByText('This is some long text').props.numberOfLines).toBe(2);
  });

  it('honors the adjustsFontSizeToFit prop', () => {
    const {getByText} = render(
      <AppText adjustsFontSizeToFit={true}>Adjustable Text</AppText>,
    );
    expect(getByText('Adjustable Text').props.adjustsFontSizeToFit).toBe(true);
  });
});
