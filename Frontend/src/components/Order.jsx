import { useEffect, useState } from 'react';

function Order() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://uniblox-assignment.onrender.com/api/users/get-orders', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const orderData = await response.json();
        const orderDetails = await Promise.all(orderData.orders.map(async (item) => {
          const itemResponse = await fetch(`https://uniblox-assignment.onrender.com/api/items/${item}`, {
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
            quantity: item.quantity || 1,
            _id: item.item
          };
        }));
        console.log(orderDetails);
        setProducts(orderDetails);
      } catch (error) {
        console.error('Error fetching orders or item details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);


  return (
    <div className="cart-container">
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <h1 className='main-content-heading'>Your Order</h1>
        {products.map((product, index) => (
          <div key={product._id || index} className="cart-item">
            <img src={product.imgUrl} alt={product.itemName} className="product-img" />
            <div className="product-info">
              <h2>{product.itemName}</h2>
              <p className="product-price">₹{product.price}/-</p>
              <ul>
                {product.description?.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="order-status">
              On the way...
            </div>
          </div>
        ))}
    </div>
  );
}

export default Order;
