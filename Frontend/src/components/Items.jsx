import React from 'react';

function Items() {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      image: 'https://www.w3schools.com/w3images/lights.jpg',
      price: '10.00', // Add price
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://www.w3schools.com/w3images/fjords.jpg', 
      price: '15.00', // Add price
    },
    {
      id: 3,
      name: 'Product 3',
      image: 'https://www.w3schools.com/w3images/mountains.jpg',
      price: '20.00', // Add price
    },
    {
      id: 4,
      name: 'Product 4',
      image: 'https://www.w3schools.com/w3images/lights.jpg',
      price: '25.00', // Add price
    },
    {
      id: 5,
      name: 'Product 5',
      image: 'https://www.w3schools.com/w3images/fjords.jpg',
      price: '30.00', // Add price
    },
    {
      id: 6,
      name: 'Product 6',
      image: 'https://www.w3schools.com/w3images/mountains.jpg',
      price: '35.00', // Add price
    },
  ];

  return (
    <div className="items-container">
      {products.map((product) => (
        <div key={product.id} className="item">
          <img src={product.image} alt={product.name} className="item-image" />
          <h3 className="item-name">{product.name}</h3>
          <p className="item-price">₹{product.price}</p>
          <div className="item-actions">
            <button className="btn">More Details</button>
            <button className="btn">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Items;
