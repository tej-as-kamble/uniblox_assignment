import React, { useState, useEffect } from 'react';

function Items() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://uniblox-assignment.onrender.com/api/items');
        const data = await response.json();
        setProducts(data); // Set the fetched data to state
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);  // Stop loading when done
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (itemId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please log in to add items to the cart');
      return;
    }

    try {
      const response = await fetch('https://uniblox-assignment.onrender.com/api/users/add-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Item added to cart successfully!');
      } else {
        alert(data.message || 'Failed to add item to cart');
      }
    } catch (error) {
      alert('Error adding item to cart');
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="items-container">
      {products.map((product) => (
        <div key={product._id} className="item">
          <img src={product.imgUrl} alt={product.itemName} className="item-image" />
          <h3 className="item-name">{product.itemName}</h3>
          <p className="item-price">₹{product.price}</p>
          <div className="item-actions">
            <button className="btn">More Details</button>
            <button className="btn" onClick={() => handleAddToCart(product._id)}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Items;
