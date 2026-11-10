
const { useState, useMemo } = React;

export function CurrencyConverter() {
  const currencymap = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    JPY: 156.7
  };

  const [fromm, setFromm] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [amount, setAmount] = useState('');

  // Convert the input amount into the base currency (USD)
  const convertedAmount = useMemo(() => {
    if (amount === '') return 0;

    return Number(amount) / currencymap[fromm];
  }, [amount, fromm]);

  // Convert USD into the selected target currency
  const result = convertedAmount * currencymap[to];

  return (
    <div className="container">
      <input
        type="number"
        min="0"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        id="from"
        value={fromm}
        onChange={(e) => setFromm(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>

      <select
        id="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>

      <h2>
        {amount !== ''
          ? `${result.toFixed(2)} ${to}`
          : ''}
      </h2>
    </div>
  );
}
