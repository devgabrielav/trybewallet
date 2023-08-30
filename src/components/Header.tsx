import { useSelector } from 'react-redux';
import { GlobalStateType } from '../types';

function Header() {
  const { email } = useSelector((globalState: GlobalStateType) => globalState.user);

  return (
    <header>
      <p data-testid="email-field">{email}</p>
      <span data-testid="total-field">0</span>
      <span data-testid="header-currency-field">BRL</span>
    </header>
  );
}
export default Header;
