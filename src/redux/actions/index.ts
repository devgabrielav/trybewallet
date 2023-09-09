import { Dispatch, ExpenseType, Response, ExpenseTypeCurr } from '../../types';

// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_WALLET = 'ADD_WALLET';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const REQUEST_COIN = 'REQUEST_COIN';
export const ADD_TOTAL = 'ADD_TOTAL';
export const UPDATE_TOTAL = 'UPDATE_TOTAL';
export const BUTTON_EDIT = 'BUTTON_EDIT';
export const FIND_EXPENSE = 'FIND_EXPENSE';
export const SAVE_EDIT = 'SAVE_EDIT';

export const actionCreatorEmail = (email = '') => ({
  type: ADD_EMAIL,
  payload: email,
});

export function requestStarted() {
  return {
    type: REQUEST_STARTED,
    payload: '',
  };
}

export const edit = (editor: boolean) => ({
  type: BUTTON_EDIT,
  payload: editor !== true,
});

export const changeId = (id: number) => ({
  type: FIND_EXPENSE,
  payload: id,
});

export const saveEdit = (expense: ExpenseTypeCurr) => {
  return {
    type: SAVE_EDIT,
    payload: expense,
  };
};

export const addNewExpense = (expenses: ExpenseType) => ({
  type: ADD_EXPENSE,
  payload: expenses,
});

export const deleteExpense = (id: number, expenses: ExpenseTypeCurr[]) => ({
  type: REMOVE_EXPENSE,
  payload: expenses.filter((expense: ExpenseTypeCurr) => expense.id !== id),
});

export function actionCreatorWallet(currencies: string[]) {
  return {
    type: ADD_WALLET,
    payload: currencies,
  };
}

export function fetchCurrencies() {
  return async (dispatch: Dispatch) => {
    dispatch(requestStarted());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const { USDT, ...rest }: Response = await response.json();
      const stringArray : string[] = Object.keys(rest);
      dispatch(actionCreatorWallet(stringArray));
    } catch (error: any) {
      return error;
    }
  };
}
