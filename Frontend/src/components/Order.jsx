import { useState } from 'react';

function Order() {
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
    }
  ]);

  return (
    <div className="cart-container">
      <h1 className='main-content-heading'>Your Order</h1>
      {products.length === 0 ? (
        <p> </p>
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
              <div className="order-status">
                On the way...
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Order;
