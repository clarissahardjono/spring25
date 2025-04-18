import { useState } from 'react';
import './App.css';
import ShoppingList from './ShoppingList';

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const budget = 100; // fixed budget

  const addItem = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());
    formDataObj.cost = parseFloat(formDataObj.cost) || 0;

    setShoppingList([...shoppingList, formDataObj]);
    form.reset();
  };

  const removeItem = (event) => {
    const name = event.target.value;
    setShoppingList(shoppingList.filter(item => item.name !== name));
  };

  return (
    <>
      <h1>🛒 Shopping List Manager</h1>
      <div className="card">
        <form onSubmit={addItem} className="flex-apart">
          <input type="text" name="name" placeholder="Item name" required />
          <input type="number" name="cost" placeholder="Item cost" step="0.01" />
          <button className="btn purple" type="submit">Add</button>
        </form>
      </div>

      <ShoppingList
        shoppingList={shoppingList}
        removeItem={removeItem}
        budget={budget}
      />
    </>
  );
}

export default App;
