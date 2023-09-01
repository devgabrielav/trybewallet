export const currenciesFetch = async (currency: string) => {
  const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${currency}`);
  const coins = await response.json();
  return coins;
};
