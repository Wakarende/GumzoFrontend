import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AppInput from '../AppInput';
import {FormProvider} from 'react-hook-form';
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

describe('AppInput', () => {
  const mockControl = {
    register: jest.fn(),
    unregister: jest.fn(),
    setValue: jest.fn(),
    getValues: jest.fn(),
    watch: jest.fn(),
    trigger: jest.fn(),
    formState: {},
    defaultValuesRef: {current: {}},
    handleSubmit: jest.fn(),
    reset: jest.fn(),
    clearErrors: jest.fn(),
    setError: jest.fn(),
    removeFieldEventListener: jest.fn(),
    mode: {
      isOnSubmit: false,
      isOnChange: false,
      isOnBlur: false,
      isOnAll: false,
    },
    reValidateMode: {
      isReValidateOnBlur: false,
      isReValidateOnChange: false,
    },
    fields: {},
  };

  const renderWithFormProvider = (ui, options = {}) => {
    return render(<FormProvider {...mockControl}>{ui}</FormProvider>, options);
  };

  it('renders the input without an icon correctly', () => {
    const {getByTestId} = renderWithFormProvider(
      <AppInput name="test" control={mockControl} />,
    );

    const input = getByTestId('text-input');
    expect(input).toBeTruthy();
  });

  it('renders the input with an icon correctly', () => {
    const {getByTestId} = renderWithFormProvider(
      <AppInput name="test" control={mockControl} icon="test-icon" />,
    );

    const icon = getByTestId('icon');
    expect(icon.children[0]).toBe('test-icon');
  });

  it('updates value on change', () => {
    const {getByTestId} = renderWithFormProvider(
      <AppInput name="test" control={mockControl} />,
    );

    const input = getByTestId('text-input');
    fireEvent.changeText(input, 'Test Value');
    expect(mockControl.setValue).toHaveBeenCalledWith('test', 'Test Value');
  });
});
