import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        
        // Definir opciones de subcategoría según la categoría seleccionada
        if (selectedCategory === 'Ingreso') {
            setSubCategoryOptions(['Recaudo trabajo', 'Recaudo préstamo', 'Recaudo extra']);
        } else if (selectedCategory === 'Egreso') {
            setSubCategoryOptions(['Pago arriendo', 'Comida', 'Transporte', 'Gasto extra']);
        } else {
            setSubCategoryOptions([]);
        }

        // Reiniciar la subcategoría seleccionada cuando cambia la categoría
        setSubCategory('');
    };

    const onSubmit = e => {
        e.preventDefault();

        if (!text || !amount || !date || !category || !subCategory) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const newAmount = category === 'Ingreso' ? +amount : -amount; // Convertir el monto a positivo o negativo según la categoría
        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            text,
            amount: newAmount,
            date,
            category,
            subCategory
        };

        onAddTransaction(newTransaction);

        setText('');
        setAmount('');
        setDate('');
        setCategory('');
        setSubCategory('');
    };

    return (
        <div>
            <h3>Agregar nueva transacción</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="text">Descripción</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Descripción..." required />
                </div>
                <div>
                    <label htmlFor="amount">Monto</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Monto..." required />
                </div>
                <div>
                    <label htmlFor="date">Fecha</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="category">Categoría</label>
                    <select value={category} onChange={handleCategoryChange} required>
                        <option value="">Selecciona una categoría</option>
                        <option value="Ingreso">Ingreso</option>
                        <option value="Egreso">Egreso</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="subCategory">Subcategoría</label>
                    <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} required>
                        <option value="">Selecciona una subcategoría</option>
                        {subCategoryOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <button>Agregar transacción</button>
            </form>
        </div>
    );
};

export default TransactionForm;
