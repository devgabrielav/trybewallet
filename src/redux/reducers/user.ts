import { AnyAction } from 'redux';
import { ADD_EMAIL } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_EMAIL_STATE = {
  email: '',
};
const user = (state = INITIAL_EMAIL_STATE, action: AnyAction) => {
  switch (action.type) {
    case ADD_EMAIL: {
      return {
        ...state,
        email: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default user;
