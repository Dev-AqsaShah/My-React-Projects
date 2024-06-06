import React, { useState } from 'react';

function Product({ id, name, price, onAddToCart }) {
  return (
    <div style={{ border: '1px solid', padding: '24px', marginBottom: '24px' }}>
      <h3>{name}</h3>
      <p>{price}</p>
      <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => onAddToCart({ id, name, price, quantity: 1 })}>
        Add to Cart
      </button>
    </div>
  );
}

function ProductList({ products, onAddToCart }) {
  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

function CartItem({ id, name, price, quantity, onRemove, onIncrease, onDecrease }) {
  return (
    <div style={{ border: '1px solid', padding: '10px', marginBottom: '10px' }}>
      <h3>{name}</h3>
      <p>{price}</p>
      <p>Quantity: {quantity}</p>
      <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => onRemove(id)}>Remove</button>
      <button style={{ backgroundColor: 'blue', color: 'white', margin: '0 5px' }} onClick={() => onIncrease(id)}>+</button>
      <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => onDecrease(id)}>-</button>
    </div>
  );
}

function Cart({ items, onRemove, onIncrease, onDecrease }) {
  return (
    <div>
      <h2>Cart</h2>
      {items.map(item => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          onRemove={onRemove}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      ))}
    </div>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const products = [
    { id: 1, name: 'Galaxy A13', price: '55999 PKR' },
    { id: 2, name: 'iPhone 14 Pro Max', price: '599999 PKR' },
    { id: 3, name: 'Oppo F11 Pro', price: '69999 PKR' }
  ];

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      const updatedItems = cartItems.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
  };

  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const decreaseQuantity = (id) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'LightPink', padding: '20px' }}>
      <ProductList products={products} onAddToCart={addToCart} />
      <Cart
        items={cartItems}
        onRemove={removeFromCart}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
      />
    </div>
  );
}

export default App;
