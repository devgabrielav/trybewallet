import { ChangeEvent, FormEvent, useState } from 'react';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InputType } from '../types';
import { actionCreatorEmail } from '../redux/actions';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDisabeled, setIsDisabeled] = useState(true);
  const [inputValue, setInputValue] = useState<InputType>({
    email: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const validateEmail = validator.isEmail(inputValue.email);
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    if (inputValue.email.length > 0 && inputValue.password.length >= 5 && validateEmail) {
      setIsDisabeled(false);
    } else {
      setIsDisabeled(true);
    }
  };

  const handleClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(actionCreatorEmail(inputValue.email));
    navigate('/carteira');
  };

  return (
    <form onSubmit={ handleClick }>
      <input
        type="email"
        data-testid="email-input"
        name="email"
        onChange={ handleChange }
      />
      <input
        type="password"
        name="password"
        onChange={ handleChange }
        data-testid="password-input"
      />
      <button disabled={ isDisabeled } type="submit">Entrar</button>
    </form>
  );
}

export default Login;
