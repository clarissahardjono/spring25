import { useState } from 'react';
import './App.css';
import ShoppingList from "./ShoppingList.jsx";


function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [budget] = useState(100);

  const addItem = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());
    formDataObj.cost = parseFloat(formDataObj.cost || 0);
    formDataObj.category = formDataObj.category || 'uncategorized';

    setShoppingList([...shoppingList, formDataObj]);
    form.reset();
  };

  const removeItem = (e) => {
    const name = e.target.value;
    setShoppingList(shoppingList.filter((item) => item.name !== name));
  };

  const filteredList =
    categoryFilter === 'all'
      ? shoppingList
      : shoppingList.filter((item) => item.category === categoryFilter);

  const totalSpent = shoppingList.reduce(
    (acc, item) => acc + Number(item.cost),
    0
  );
  const remainingBudget = budget - totalSpent;

  return (
    <>
      <h1>🛒 Shopping List Manager</h1>

      <form onSubmit={addItem} className="flex-apart">
        <input type="text" name="name" placeholder="Item name" required />
        <input type="number" name="cost" placeholder="Item cost" required />
        <select name="category">
          <option value="grocery">Grocery</option>
          <option value="school">School</option>
          <option value="personal">Personal</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        <button onClick={() => setCategoryFilter('all')}>All</button>
        <button onClick={() => setCategoryFilter('grocery')}>Grocery</button>
        <button onClick={() => setCategoryFilter('school')}>School</button>
        <button onClick={() => setCategoryFilter('personal')}>Personal</button>
      </div>

      <h2>Remaining Budget: ${remainingBudget.toFixed(2)}</h2>

      <ShoppingList shoppingList={filteredList} removeItem={removeItem} />
    </>
  );
}

export default App;

