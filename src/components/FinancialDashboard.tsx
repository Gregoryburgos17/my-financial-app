import React, { useState } from 'react';
import AIAssistant from './AIAssistant';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// Definimos las interfaces para nuestros tipos
interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface NewExpense {
  description: string;
  amount: string;
  category: string;
}

const FinancialDashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<NewExpense>({
    description: '',
    amount: '',
    category: 'general'
  });

  // Categorías predefinidas
  const categories = [
    'Alimentos',
    'Transporte',
    'Vivienda',
    'Entretenimiento',
    'Otros'
  ];

  // Colores para el gráfico
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.description && newExpense.amount) {
      setExpenses([
        ...expenses,
        {
          id: Date.now(),
          description: newExpense.description,
          amount: Number(newExpense.amount),
          category: newExpense.category
        }
      ]);
      setNewExpense({ description: '', amount: '', category: 'general' });
    }
  };

  // Datos para el gráfico
  const chartData = categories.map(category => ({
    name: category,
    value: expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  }));

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    form: {
      marginBottom: '20px',
      display: 'flex',
      gap: '10px',
    },
    input: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    select: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#0066cc',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    expenseList: {
      marginTop: '20px',
    },
    expenseItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
      borderBottom: '1px solid #eee',
    },
    chartContainer: {
      height: '300px',
      marginTop: '20px',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Asistente Financiero</h1>
      
      <form onSubmit={handleAddExpense} style={styles.form}>
        <input
          type="text"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          placeholder="Descripción"
          style={styles.input}
        />
        <input
          type="number"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          placeholder="Monto"
          style={{ ...styles.input, width: '120px' }}
        />
        <select
          value={newExpense.category}
          onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
          style={styles.select}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit" style={styles.button}>
          Agregar Gasto
        </button>
      </form>

      <div style={styles.expenseList}>
        <h2>Gastos Registrados</h2>
        {expenses.map(expense => (
          <div key={expense.id} style={styles.expenseItem}>
            <span>{expense.description} ({expense.category})</span>
            <span>${expense.amount}</span>
          </div>
        ))}
      </div>

      <div style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <AIAssistant expenses={expenses} />
      </div>
    </div>
  );
};

export default FinancialDashboard;