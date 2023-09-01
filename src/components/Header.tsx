import { useSelector } from 'react-redux';
import { ExpenseTypeCurr, GlobalStateType } from '../types';

function Header() {
  const { email } = useSelector((globalState: GlobalStateType) => globalState.user);
  const { expenses } = useSelector((globalState: GlobalStateType) => (
    globalState.wallet));
  const total = (expense: ExpenseTypeCurr[]) => expense
    .reduce((acc, curr) => acc + (Number(curr.exchangeRates[curr.currency].ask)
      * Number(curr.value)), 0);
  return (
    <header>
      <p data-testid="email-field">{email}</p>
      <span data-testid="total-field">{total(expenses).toFixed(2)}</span>
      <span data-testid="header-currency-field">BRL</span>
    </header>
  );
}
export default Header;
