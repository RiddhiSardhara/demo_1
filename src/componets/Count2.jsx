import React, { useState, useEffect } from 'react';
import '../App'; // Import your CSS file for styling

function App() {
  const [items, setItems] = useState([]);
  const [inputName, setInputName] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  const addItem = () => {
    if (inputName.trim() !== '' && inputDescription.trim() !== '') {
      const newItem = {
        id: Date.now(),
        name: inputName.trim(),
        description: inputDescription.trim()
      };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      localStorage.setItem('items', JSON.stringify(updatedItems));
      setInputName('');
      setInputDescription('');
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  return (
    <div className="container">
      <h1>CRUD Application</h1>
      <div className="form">
        

<input
  type="text"
  value={inputName}
  onChange={(e) => setInputName(e.target.value)}
  placeholder="Enter item name"
  className="input-field"
/>
<textarea
  value={inputDescription}
  onChange={(e) => setInputDescription(e.target.value)}
  placeholder="Enter item description"
  className="textarea-field"
/>
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className="item">
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
