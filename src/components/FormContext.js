import React, {createContext, useReducer} from 'react';

export const FormContext = createContext();

const initialState = {
  firstName: '',
  lastName: '',
  dob: '',
  selectedImage: null,
  selectedInterests: [],
  selectedProficiency: [],
  bio: '',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    default:
      return state;
  }
};

export const FormProvider = ({children}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{state, dispatch}}>
      {children}
    </FormContext.Provider>
  );
};
export default FormContext;
