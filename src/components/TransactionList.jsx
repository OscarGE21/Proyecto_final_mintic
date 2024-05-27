import React from 'react';
import './TransactionList.css'; // Importamos el archivo de estilos CSS

const TransactionList = ({ transactions, onDeleteTransaction }) => {
    // Calcular el saldo sumando todas las transacciones
    const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    return (
        <div className="transaction-list-container">
            <h3>Historial</h3>
            <ul className="transaction-list">
                {transactions.map(transaction => (
                    <div className="transaction-item" key={transaction.id}>
                        <div className="transaction-date">{transaction.date}</div>
                        <div className="transaction-description">{transaction.text}</div>
                        <div className="transaction-details">
                            <div className={`transaction-amount ${transaction.amount >= 0 ? 'income' : 'expense'}`}>
                                {transaction.amount.toLocaleString()}
                            </div>
                            <div className="transaction-category">{transaction.category}</div>
                        </div>
                        <button onClick={() => onDeleteTransaction(transaction.id)}>Eliminar</button>
                    </div>
                ))}
            </ul>
            <p><strong>Saldo: {total.toLocaleString()}</strong></p>
        </div>
    );
};

export default TransactionList;
