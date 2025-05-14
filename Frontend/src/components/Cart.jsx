import { useState, useEffect } from 'react';

function Cart() {
  const [products, setProducts] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [status, setStatus] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/get-cart', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const cartData = await response.json();
        const productDetails = await Promise.all(cartData.cart.map(async (item) => {
          const itemResponse = await fetch(`http://localhost:5000/api/items/${item.item}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!itemResponse.ok) {
            throw new Error(`Failed to fetch details for item ${item.item}`);
          }

          const itemData = await itemResponse.json();
          return {
            ...itemData,
            quantity: item.quantity,
            _id: item.item
          };
        }));
        console.log(productDetails);
        setProducts(productDetails);
      } catch (error) {
        console.error('Error fetching cart items or item details:', error);
      }
    };

    fetchProducts();
  }, [token]);

  const handleApplyCoupon = () => {
    if (coupon.trim() === 'SAVE20OFF') {
      setStatus('✅ Coupon applied successfully! You saved 10%.');
      setDiscountApplied(true);
    } else {
      setStatus('❌ Invalid coupon code. Please try again later.');
      setDiscountApplied(false);
    }
  };

  const increaseQuantity = async (_id) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/increase-quantity', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId: _id }) // Use _id here
      });
      if (!response.ok) {
        throw new Error('Failed to increase quantity');
      }
      const data = await response.json();
      // console.log(data);
      setProducts(products.map(p =>
        p._id === _id ? { ...p, quantity: p.quantity + 1 } : p // Use _id here
      ));
    } catch (error) {
      console.error('Error increasing quantity:', error);
      alert('Error increasing quantity');
    }
  };

  const decreaseQuantity = async (_id) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/decrease-quantity', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId: _id })
      });
      if (!response.ok) {
        throw new Error('Failed to decrease quantity');
      }
      const data = await response.json();
      setProducts(products.map(p =>
        p._id === _id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
      ));
    } catch (error) {
      console.error('Error decreasing quantity:', error);
      alert('Error decreasing quantity');
    }
  };

  const removeProduct = async (_id) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/remove-item', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId: _id })
      });
      if (!response.ok) {
        throw new Error('Failed to remove product');
      }
      const data = await response.json();
      setProducts(products.filter(p => p._id !== _id));
      alert('Product removed successfully!');
    } catch (error) {
      console.error('Error removing product:', error);
      alert('Error removing product');
    }
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
      {products && products.length === 0 ? (
        <p>No products in your order.</p>
      ) : (
        <>
          {products && products.length > 0 && products.map(product => (
            <div key={product._id} className="cart-item">
              <img src={product.imgUrl} alt={product.name} className="product-img" />
              <div className="product-info">
                <h2>{product.itemName}</h2>
                <p className="product-price">₹{product.price}/-</p>
                <ul>
                  {product.description && product.description.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className="cart-actions">
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(product._id)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => increaseQuantity(product._id)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeProduct(product._id)}>Remove</button>
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
