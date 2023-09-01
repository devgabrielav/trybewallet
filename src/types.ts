import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type InputType = {
  email: string,
  password: string,
};

export type Response = {
  [x: string]: {
    code:string;
    codein:string;
    name:string;
    high:string;
    low:string;
    varBid:string;
    pctChange:string;
    bid:string;
    ask:string;
    timestamp:string;
    create_date:string;
  }
};

export type ActionCurrency = {
  type: string,
  payload: Response,
};

export type GlobalStateType = {
  user: {
    email: string, // string que armazena o e-mail da pessoa usuária
  },
  wallet: {
    currencies: string[], // array de string
    expenses: ExpenseTypeCurr[], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: boolean, // valor booleano que indica se uma despesa está sendo editada
    idToEdit: number, // valor numérico que armazena o id da despesa que está sendo editada
  }
};

export type CoinType = {
  code:string,
  codein:string,
  name: string,
  high:string,
  low:string,
  varBid:string,
  pctChange:string,
  bid:string,
  ask:string,
  timestamp:string,
  create_date:string,
};

export type ReduxState = {
  isFetching: boolean,
  currencies: string,
};

export type ExpenseType = {
  id: number,
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
};

export type ExpenseTypeCurr = {
  id: number,
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
  exchangeRates: Response,
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
