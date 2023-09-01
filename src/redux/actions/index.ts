import { Dispatch, ExpenseType, Response } from '../../types';

// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_WALLET = 'ADD_WALLET';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REQUEST_COIN = 'REQUEST_COIN';
export const ADD_TOTAL = 'ADD_TOTAL';

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

export const actionTotal = (value: number) => {
  return {
    type: ADD_TOTAL,
    payload: value,
  };
};

export const addNewExpense = (expenses: ExpenseType) => ({
  type: ADD_EXPENSE,
  payload: expenses,
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
      console.log(error);
    }
  };
}
