// src/components/AIAssistant.tsx
import React, { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface AIAssistantProps {
  expenses: Array<{
    id: number;
    description: string;
    amount: number;
    category: string;
  }>;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ expenses }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente financiero. Puedo ayudarte a analizar tus gastos y darte consejos financieros. ¿En qué puedo ayudarte?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const generateAIResponse = (userMessage: string): string => {
    // Análisis básico de los gastos
    const totalGastos = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const gastosPorCategoria = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    // Respuestas predefinidas basadas en palabras clave
    if (userMessage.toLowerCase().includes('gasto')) {
      return `Tus gastos totales son $${totalGastos}. La distribución por categoría es: ${Object.entries(gastosPorCategoria).map(([cat, amount]) => `${cat}: $${amount}`).join(', ')}`;
    }
    if (userMessage.toLowerCase().includes('consejo')) {
      return "Te sugiero seguir la regla 50/30/20: 50% para necesidades básicas, 30% para deseos y 20% para ahorro e inversión.";
    }
    if (userMessage.toLowerCase().includes('ahorro')) {
      return "Para mejorar tus ahorros, considera: 1) Establecer metas específicas, 2) Automatizar tus ahorros, 3) Reducir gastos innecesarios.";
    }
    return "¿Puedes ser más específico sobre qué información financiera necesitas?";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    // Generar respuesta del asistente
    const aiResponse: Message = {
      id: Date.now() + 1,
      text: generateAIResponse(inputMessage),
      sender: 'assistant',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInputMessage('');
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '20px auto',
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    header: {
      backgroundColor: '#0066cc',
      color: 'white',
      padding: '10px 20px',
    },
    chatArea: {
      height: '400px',
      overflowY: 'auto' as const,
      padding: '20px',
      backgroundColor: '#f5f5f5',
    },
    messageContainer: {
      marginBottom: '10px',
    },
    message: {
      maxWidth: '70%',
      padding: '10px 15px',
      borderRadius: '15px',
      marginBottom: '5px',
    },
    userMessage: {
      backgroundColor: '#0066cc',
      color: 'white',
      marginLeft: 'auto',
    },
    assistantMessage: {
      backgroundColor: 'white',
      marginRight: 'auto',
    },
    inputArea: {
      display: 'flex',
      padding: '20px',
      backgroundColor: 'white',
      borderTop: '1px solid #ddd',
    },
    input: {
      flex: 1,
      padding: '10px',
      marginRight: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#0066cc',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Asistente Financiero AI</h2>
      </div>
      
      <div style={styles.chatArea}>
        {messages.map((message) => (
          <div key={message.id} style={styles.messageContainer}>
            <div style={{
              ...styles.message,
              ...(message.sender === 'user' ? styles.userMessage : styles.assistantMessage)
            }}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Escribe tu pregunta aquí..."
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.button}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;