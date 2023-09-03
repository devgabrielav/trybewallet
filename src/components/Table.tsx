import { useSelector } from 'react-redux';
import './Table.css';
import { ExpenseTypeCurr, GlobalStateType } from '../types';
import { deleteExpense } from '../redux/actions';

function Table() {
  const { expenses } = useSelector((globalState: GlobalStateType) => globalState.wallet);

  const deleteEx = (id: number, expenseS: ExpenseTypeCurr[]) => {
    console.log('clicou');
    deleteExpense(id, expenseS);
  };

  return (
    <table
      style={ { width: '100%', marginTop: '20px' } }
    >
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
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
            <td><button>Editar</button></td>
            <td>
              <button onClick={ () => deleteEx(expense.id, expenses) }>
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
