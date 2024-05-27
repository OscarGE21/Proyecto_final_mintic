import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const SummaryChart = ({ transactions }) => {
    const [chart, setChart] = useState(null);

    useEffect(() => {
        if (!transactions.length) return;

        const labels = ['Ingresos', 'Gastos', 'Saldo Actual'];
        const incomes = transactions.filter(transaction => transaction.category === 'Ingreso').reduce((acc, curr) => acc + curr.amount, 0);
        const expenses = -transactions.filter(transaction => transaction.category === 'Egreso').reduce((acc, curr) => acc + curr.amount, 0);
        const balance = incomes - expenses;

        const data = [incomes, expenses, balance];

        if (!chart) {
            const ctx = document.getElementById('summary-chart');
            const newChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Monto',
                        data: data,
                        backgroundColor: ['#36A2EB', '#FF6384', '#4CAF50'],
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            setChart(newChart);
        } else {
            chart.data.labels = labels;
            chart.data.datasets[0].data = data;
            chart.update();
        }

    }, [transactions, chart]);

    return (
        <div>
            <h3>Resumen Financiero</h3>
            <canvas id="summary-chart" width="400" height="200"></canvas>
        </div>
    );
};

export default SummaryChart;
