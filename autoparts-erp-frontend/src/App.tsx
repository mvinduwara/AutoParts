import { useEffect, useState } from 'react';
import { getParts, Part } from './api/inventory.api';
import './App.css';

function App() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const data = await getParts();
        setParts(data);
      } catch (error) {
        console.error("Failed to fetch parts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParts();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>AutoParts ERP - Inventory</h2>
      
      {loading ? (
        <p>Loading parts from backend...</p>
      ) : (
        <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th>ID</th>
              <th>SKU</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
              <tr key={part.id}>
                <td>{part.id}</td>
                <td>{part.sku}</td>
                <td>{part.name}</td>
                <td>{part.brand}</td>
                <td>Rs. {part.sellingPrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;