function ShoppingList({ shoppingList, removeItem }) {
    return (
      <>
        {shoppingList.map((item, index) => (
          <div className="card flex-apart" key={index}>
            <span>
              {item.name} - ${item.cost.toFixed(2)} ({item.category})
            </span>
            <button className="btn" onClick={removeItem} value={item.name}>
              x
            </button>
          </div>
        ))}
      </>
    );
  }
  
  export default ShoppingList;
  