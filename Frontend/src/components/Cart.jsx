import { useState } from 'react';

function Cart() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      details: ["Bluetooth over-ear", "Noise cancellation", "Long battery life"],
      image: "https://www.w3schools.com/w3images/lights.jpg",
      price: 5000, // price in INR
      quantity: 1
    },
    {
      id: 2,
      name: "Smart Watch",
      details: ["Heart-rate monitor", "Water-resistant", "GPS tracking"],
      image: "https://www.w3schools.com/w3images/fjords.jpg",
      price: 8000, // price in INR
      quantity: 2
    },
    {
      id: 3,
      name: "Wireless Headphones",
      details: ["Bluetooth over-ear", "Noise cancellation", "Long battery life"],
      image: "https://www.w3schools.com/w3images/lights.jpg",
      price: 5000, // price in INR
      quantity: 1
    },
    {
      id: 4,
      name: "Smart Watch",
      details: ["Heart-rate monitor", "Water-resistant", "GPS tracking"],
      image: "https://www.w3schools.com/w3images/fjords.jpg",
      price: 8000, // price in INR
      quantity: 2
    },
  ]);

  const [coupon, setCoupon] = useState("");
  const [status, setStatus] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleApplyCoupon = () => {
    if (coupon.trim() === 'SAVE20OFF') {
      setStatus('✅ Coupon applied successfully! You saved 10%.');
      setDiscountApplied(true);
    } else {
      setStatus('❌ Invalid coupon code. Please try again later.');
      setDiscountApplied(false);
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

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const calculateDiscountedTotal = (total) => {
    return total * 0.9;
  };

  const totalPrice = calculateTotal();
  const discountedTotal = calculateDiscountedTotal(totalPrice);

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
                <p className="product-price">₹{product.price}</p>
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

          <div className="total-price">
            {discountApplied ? (
              <div>
                <h3>
                  Total: <span style={{ textDecoration: 'line-through' }}>₹{totalPrice}</span>
                  <br />
                  <span style={{ color: 'rgb(0 177 9)'}}>Discounted Total: ₹{discountedTotal.toFixed(2)}</span>
                </h3>
              </div>
            ) : (
              <h3>Total: ₹{totalPrice}</h3>
            )}
          </div>

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
