import { useState, useEffect } from 'react';

function Cart() {
  const [products, setProducts] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [status, setStatus] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://uniblox-assignment.onrender.com/api/users/get-cart', {
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
          const itemResponse = await fetch(`https://uniblox-assignment.onrender.com/api/items/${item.item}`, {
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
        setProducts(productDetails);
      } catch (error) {
        console.error('Error fetching cart items or item details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);


  const increaseQuantity = async (_id) => {
    try {
      setLoading(true);
      const response = await fetch('https://uniblox-assignment.onrender.com/api/users/increase-quantity', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId: _id })
      });
      if (!response.ok) {
        throw new Error('Failed to increase quantity');
      }
      const data = await response.json();
      // console.log(data);
      setProducts(products.map(p =>
        p._id === _id ? { ...p, quantity: p.quantity + 1 } : p 
      ));
    } catch (error) {
      console.error('Error increasing quantity:', error);
      alert('Error increasing quantity');
    } finally {
      setLoading(false);
    }
  };

  const decreaseQuantity = async (_id) => {
    try {
      setLoading(true);
      const response = await fetch('https://uniblox-assignment.onrender.com/api/users/decrease-quantity', {
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
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (_id) => {
    try {
      setLoading(true);
      const response = await fetch('https://uniblox-assignment.onrender.com/api/users/remove-item', {
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
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://uniblox-assignment.onrender.com/api/users/verify-coupon?code=${coupon.trim()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      if(data.verification){
        setStatus(`✅ Coupon applied successfully! You saved ${totalDiscount}.`);
        setDiscountApplied(true);
      } else {
        setStatus('❌ Invalid coupon code. Please try again later.');
        setDiscountApplied(false);
      }
    } catch (error) {
      console.error('Error in verification:', error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const totalPrice = calculateTotal();
  const discountedTotal = totalPrice * 0.9;
  const totalDiscount = totalPrice - discountedTotal;

  const handleOrderNow = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://uniblox-assignment.onrender.com/api/users/order-now', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          totalPrice,
          totalDiscount,
          coupon
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Order failed');
      }

      alert(data.message);
    } catch (err) {
      console.error('Error:', err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-container">
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <h1 className="main-content-heading">Your Cart</h1>
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
            <button onClick={handleOrderNow}>Order Now</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
