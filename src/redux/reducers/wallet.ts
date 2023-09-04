import { AnyAction } from 'redux';
import {
  ADD_EXPENSE, ADD_WALLET, BUTTON_EDIT, REMOVE_EXPENSE, FIND_EXPENSE, SAVE_EDIT,
} from '../actions';
import { ExpenseTypeCurr } from '../../types';

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
    case BUTTON_EDIT: {
      return {
        ...state,
        editor: action.payload,
      };
    }
    case FIND_EXPENSE: {
      return {
        ...state,
        idToEdit: action.payload,
      };
    }
    case SAVE_EDIT: {
      return {
        ...state,
        expenses: state.expenses
          .map((expense: ExpenseTypeCurr) => (expense.id === action.payload.id ? {
            ...expense,
            value: action.payload.value,
            currency: action.payload.currency,
            method: action.payload.method,
            tag: action.payload.tag,
            description: action.payload.description,
          } : expense)),
      };
    }
    default: {
      return state;
    }
  }
};

export default wallet;
