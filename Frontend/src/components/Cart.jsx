import { useState } from 'react';

function Cart() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      details: ["Bluetooth over-ear", "Noise cancellation", "Long battery life"],
      image: "https://www.w3schools.com/w3images/lights.jpg",
      quantity: 1
    },
    {
      id: 2,
      name: "Smart Watch",
      details: ["Heart-rate monitor", "Water-resistant", "GPS tracking"],
      image: "https://www.w3schools.com/w3images/fjords.jpg",
      quantity: 2
    },
    {
      id: 1,
      name: "Wireless Headphones",
      details: ["Bluetooth over-ear", "Noise cancellation", "Long battery life"],
      image: "https://www.w3schools.com/w3images/lights.jpg",
      quantity: 1
    },
    {
      id: 2,
      name: "Smart Watch",
      details: ["Heart-rate monitor", "Water-resistant", "GPS tracking"],
      image: "https://www.w3schools.com/w3images/fjords.jpg",
      quantity: 2
    },
    {
      id: 1,
      name: "Wireless Headphones",
      details: ["Bluetooth over-ear", "Noise cancellation", "Long battery life"],
      image: "https://www.w3schools.com/w3images/lights.jpg",
      quantity: 1
    },
    {
      id: 2,
      name: "Smart Watch",
      details: ["Heart-rate monitor", "Water-resistant", "GPS tracking"],
      image: "https://www.w3schools.com/w3images/fjords.jpg",
      quantity: 2
    }
  ]);

  const [coupon, setCoupon] = useState("");
  const [status, setStatus] = useState('');

  const handleApplyCoupon = () => {
    if (coupon.trim() === 'SAVE20OFF') {
      setStatus('✅ Coupon applied successfully! You saved 10%.');
    } else {
      setStatus('❌ Invalid coupon code. Please try again later.');
    }
  };

  const increaseQuantity = (id) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, quantity: p.quantity + 1 } : p
    ));
  };

  const decreaseQuantity = (id) => {
    setProducts(products.map(p =>
      p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
    ));
  };

  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="cart-container">
      <h1 className="main-content-heading">Your Order</h1>
      {products.length === 0 ? (
        <p>No products in your order.</p>
      ) : (
        <>
          {products.map(product => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.name} className="product-img" />
              <div className="product-info">
                <h2>{product.name}</h2>
                <ul>
                  {product.details.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className="cart-actions">
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(product.id)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => increaseQuantity(product.id)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeProduct(product.id)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="coupon-section">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="coupon-input"
            />
            <button className="apply-coupon-btn" onClick={handleApplyCoupon}>Apply</button>
          </div>

          {status && <div className="coupon-status">
            <p>{status}</p>
          </div>}

          <div className="order-btn">
            <button>Order Now</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
