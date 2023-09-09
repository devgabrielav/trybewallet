import { screen } from '@testing-library/dom';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';
import { CoinType, GlobalStateType, Response } from './types';
import mockData from './tests/helpers/mockData';
import { ADD_EXPENSE, addNewExpense, deleteExpense, REMOVE_EXPENSE, REQUEST_STARTED, requestStarted, actionCreatorWallet, ADD_WALLET } from './redux/actions';
import * as fetchCoins from './components/WalletForm';

const testEmail = 'teste@teste.com';
const editExpenseButton = 'Editar despesa';
const senhaTeste = '12345678';

const mockTest: GlobalStateType = {
  user: {
    email: testEmail,
  },
  wallet: {
    currencies: [],
    expenses: [{
      id: 1,
      value: '11',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: 'Teste',
      exchangeRates: mockData,
    }],
    editor: false,
    idToEdit: 0,
  },
};

describe('Testa se na rota principal, tem um input email, senha e um botão. E se o botão redireciona para a wallet', () => {
  it('Inputs e botão na tela', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const inputSenha = screen.getByPlaceholderText('Senha') as HTMLInputElement;
    const button = screen.getByRole('button', { name: 'Entrar' }) as HTMLButtonElement;

    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  it('É redirecionado para a wallet', async () => {
    const { user } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const inputSenha = screen.getByPlaceholderText('Senha') as HTMLInputElement;
    const button = screen.getByRole('button', { name: 'Entrar' }) as HTMLButtonElement;
    await user.type(inputEmail, testEmail);
    await user.type(inputSenha, '12345678');
    await user.click(button);
    expect(screen.getByRole('button', { name: 'Adicionar despesa' })).toBeInTheDocument();
  });
});

describe('Testa componente Table', () => {
  it('Espera que editor seja falso, e botão falso', () => {
    const { store } = renderWithRouterAndRedux(<App />, '/carteira', mockTest);
    expect(store.getState().wallet.editor).toBe(false);
    const buttonEditExpense = screen.queryByRole('button', { name: editExpenseButton });
    expect(buttonEditExpense).not.toBeInTheDocument();
  });
  it('Testa dispatchs edit e changeId', async () => {
    const { store, user } = renderWithRouterAndRedux(<App />, '/carteira', mockTest);
    const buttonEdit = screen.getByRole('button', { name: 'Editar' });
    await user.click(buttonEdit);
    expect(store.getState().wallet.editor).toBe(true);
    expect(store.getState().wallet.idToEdit).toBe(1);
    const buttonEditExpense = screen.queryByRole('button', { name: editExpenseButton });
    expect(buttonEditExpense).toBeInTheDocument();
  });
});

describe('Testa componente WalletForm', () => {
  it('Testa o editar', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/carteira', mockTest);
    const buttonEdit = screen.getByRole('button', { name: 'Editar' });
    await user.click(buttonEdit);
    const valorInput = screen.getByPlaceholderText('Digite um valor');
    const descrInput = screen.getByPlaceholderText('Digite a descrição');
    expect(valorInput).toHaveValue(11);
    expect(descrInput).toHaveValue('Teste');
    await user.clear(descrInput);
    expect(descrInput).toHaveValue('');
    await user.type(descrInput, 'Testando');
    expect(descrInput).toHaveValue('Testando');
    const buttonEditExpense = screen.getByRole('button', { name: editExpenseButton });
    await user.click(buttonEditExpense);
    const descr = screen.getByText('Testando');
    const value = screen.getByText('11.00');
    const coin = screen.getByText('Dólar Americano/Real Brasileiro');
    const camb = screen.getByText('4.75');
    const cValue = screen.getAllByText('52.28')[1];
    expect(cValue).toHaveClass('expenseBorder');
    const cCoin = screen.getByText('Real');
    expect(descr).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(coin).toBeInTheDocument();
    expect(camb).toBeInTheDocument();
    expect(cValue).toBeInTheDocument();
    expect(cCoin).toBeInTheDocument();
  });
  it('Testa adicionar despesa e o dispatch addNewExpense e deleteExpense', async () => {
    const { user, store } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const inputSenha = screen.getByPlaceholderText('Senha') as HTMLInputElement;
    const button = screen.getByRole('button', { name: 'Entrar' }) as HTMLButtonElement;
    await user.type(inputEmail, testEmail);
    await user.type(inputSenha, senhaTeste);
    await user.click(button);
    const totalField = screen.getByTestId('total-field');
    const valorInput = screen.getByPlaceholderText('Digite um valor');
    const descrInput = screen.getByPlaceholderText('Digite a descrição');
    const fetchCoin = vi.spyOn(fetchCoins, 'fetchCoins');
    expect(totalField.innerHTML).toBe('0.00');
    await user.type(valorInput, '11');
    await user.type(descrInput, 'Test');
    const expenseTest = {
      id: 0,
      value: '11',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: 'Test',
      exchangeRates: fetchCoins.fetchCoins(),
    };
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const fetchedCoin: CoinType[] = await response.json();

    const expectedResult = {
      type: ADD_EXPENSE,
      payload: expenseTest,
    };

    const expectedDeleteResult = {
      type: REMOVE_EXPENSE,
      payload: [],
    };

    expect(await fetchCoins.fetchCoins()).toEqual(fetchedCoin);
    expect(addNewExpense(expenseTest)).toEqual(expectedResult);
    expect(fetchCoin).toHaveBeenCalled();
    expect(deleteExpense(0, store.getState().wallet.expenses)).toEqual(expectedDeleteResult);
  });
});

describe('Testa fetchCuurrencies', () => {
  it('Busca moedas, chama requestStarted e actionCreatorWallet', async () => {
    renderWithRouterAndRedux(<App />, '/carteira', mockTest);
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const { USDT, ...rest }: Response = await response.json();
    const stringArray : string[] = Object.keys(rest);
    const testStart = {
      type: REQUEST_STARTED,
      payload: '',
    };
    const testCurrencies = {
      type: ADD_WALLET,
      payload: stringArray,
    };
    expect(requestStarted()).toEqual(testStart);
    expect(actionCreatorWallet(stringArray)).toEqual(testCurrencies);
  });
});
