import { useSelector } from 'react-redux';
import './Table.css';
import { GlobalStateType } from '../types';

function Table() {
  const { expenses } = useSelector((globalState: GlobalStateType) => globalState.wallet);

  return (
    <table
      style={ { width: '100%', marginTop: '20px' } }
    >
      <th>Descrição</th>
      <th>Tag</th>
      <th>Método de pagamento</th>
      <th>Valor</th>
      <th>Moeda</th>
      <th>Câmbio utilizado</th>
      <th>Valor convertido</th>
      <th>Moeda de conversão</th>
      <th>Editar/Excluir</th>
      <tbody>
        {expenses.map((expense) => (
          <tr key={ expense.id }>
            <td className="expenseBorder">{expense.description}</td>
            <td className="expenseBorder">{expense.tag}</td>
            <td className="expenseBorder">{expense.method}</td>
            <td className="expenseBorder">{Number(expense.value).toFixed(2)}</td>
            <td className="expenseBorder">
              {expense.exchangeRates[expense.currency].name}
            </td>
            <td className="expenseBorder">
              {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
            </td>
            <td className="expenseBorder">
              {(Number(expense.value)
            * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
            </td>
            <td className="expenseBorder">Real</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
