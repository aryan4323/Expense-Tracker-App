import React, { useState, useEffect } from "react";

const App = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });



  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");


  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);



  const addTransaction = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: +amount,
    };

    setTransactions([newTransaction, ...transactions]);
    setText("");
    setAmount("");
  };



  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };
 


  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);


  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">💰 Expense Tracker</h1>

      <div className="bg-white/20 p-4 rounded-lg mb-6 text-center w-64">
        <h2 className="text-lg">Balance</h2>
        <p className="text-2xl font-bold">₹{(income + expense).toFixed(2)}</p>
      </div>

      <div className="flex gap-6 mb-6">
        <div className="bg-green-400 text-black p-4 rounded-lg w-28 text-center">
          <h3>Income</h3>
          <p className="font-bold">₹{income.toFixed(2)}</p>
        </div>
        <div className="bg-red-400 text-black p-4 rounded-lg w-28 text-center">
          <h3>Expense</h3>
          <p className="font-bold">₹{Math.abs(expense).toFixed(2)}</p>
        </div>
      </div>

    
      <form
        onSubmit={addTransaction}
        className="bg-white/20 p-4 rounded-lg w-80 mb-6"
      >
        <input
          type="text"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full mb-2 px-3 py-2 rounded-lg text-black"
        />
        <input
          type="number"
          placeholder="Enter amount (use - for expense)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-2 px-3 py-2 rounded-lg text-black"
        />
        <button className="bg-yellow-400 text-black px-4 py-2 w-full rounded-lg font-semibold hover:bg-yellow-500">
          Add Transaction
        </button>
      </form>

      <ul className="w-80">
        {transactions.map((t) => (
          <li
            key={t.id}
            className={`flex justify-between items-center mb-2 p-2 rounded-lg ${
              t.amount > 0 ? "bg-green-500/80" : "bg-red-500/80"
            }`}
          >
            <span>{t.text}</span>
            <div className="flex gap-2 items-center">
              <span>₹{t.amount}</span>
              <button
                onClick={() => deleteTransaction(t.id)}
                className="bg-black text-white px-2 rounded"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;    