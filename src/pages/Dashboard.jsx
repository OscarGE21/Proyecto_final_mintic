import React, { useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import SummaryChart from '../components/SummaryChart';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);

    const addTransaction = (transaction) => {
        const newTransactions = [...transactions, transaction];
        setTransactions(newTransactions);
    };

    const onDeleteTransaction = (id) => {
        const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
        setTransactions(updatedTransactions);
    };

  const exportTransactions = () => {
    const data = transactions.map(transaction => `${transaction.text},${transaction.amount},${transaction.date},${transaction.category}`).join('\n');
    const blob = new Blob([data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

    const handleLoadTransactions = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const parsedData = parseCSV(text);
            setTransactions(parsedData);
        };
        reader.readAsText(file);
    };

    const parseCSV = (csv) => {
        const lines = csv.split('\n');
        const transactions = [];
        for (let line of lines) {
            const [text, amount, date, category] = line.split(',');
            transactions.push({ text, amount: parseFloat(amount), date, category });
        }
        return transactions;
    };

    return (
        <div>
            <TransactionForm onAddTransaction={addTransaction} />
            <TransactionList transactions={transactions} onDeleteTransaction={onDeleteTransaction} />
            <SummaryChart transactions={transactions} />
            <input type="file" accept=".csv" onChange={handleLoadTransactions} />
            <button onClick={exportTransactions}>Descargar Transacciones</button>
        </div>
    );
};

export default Dashboard;
