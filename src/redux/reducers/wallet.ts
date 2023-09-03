import { AnyAction } from 'redux';
import { ADD_EXPENSE, ADD_WALLET, REMOVE_EXPENSE } from '../actions';

const INITIAL_WALLET_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que está sendo editada
};

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const wallet = (state = INITIAL_WALLET_STATE, action: AnyAction) => {
  switch (action.type) {
    case ADD_WALLET: {
      return {
        ...state,
        currencies: action.payload,
      };
    }
    case ADD_EXPENSE: {
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    }
    case REMOVE_EXPENSE: {
      return {
        ...state,
        expenses: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default wallet;
