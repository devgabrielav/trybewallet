// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';

export const actionCreator = (email = '') => ({
  type: ADD_EMAIL,
  payload: email,
});
