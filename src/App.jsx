import React, { useState } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const App = () => {
    const [transactions, setTransactions] = useState([]);

    const addTransaction = (transaction) => {
        setTransactions([...transactions, transaction]);
    };

    // Lógica para decidir qué página mostrar
    const currentPage = 'dashboard'; // Cambia esto a 'home' para mostrar la página de inicio

    return (
        <div>
            {currentPage === 'home' ? <Home /> : <Dashboard transactions={transactions} addTransaction={addTransaction} />}
        </div>
    );
};

export default App;
