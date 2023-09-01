import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from './App';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';

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
    renderWithRouterAndRedux(<App />);
    const user = userEvent.setup();
    const inputEmail = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const inputSenha = screen.getByPlaceholderText('Senha') as HTMLInputElement;
    const button = screen.getByRole('button', { name: 'Entrar' }) as HTMLButtonElement;
    await user.type(inputEmail, 'teste@teste.com');
    await user.type(inputSenha, '12345678');
    await user.click(button);
    expect(screen.getByRole('button', { name: 'Adicionar despesa' })).toBeInTheDocument();
  });
});

/* describe('Testa componente WalletForm', () => {
  it('')
}); */
