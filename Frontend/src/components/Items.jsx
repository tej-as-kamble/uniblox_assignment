import React from 'react';

function Items() {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      image: 'https://www.w3schools.com/w3images/lights.jpg', // Replace with actual image URL
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://www.w3schools.com/w3images/fjords.jpg', // Replace with actual image URL
    },
    {
      id: 3,
      name: 'Product 3',
      image: 'https://www.w3schools.com/w3images/mountains.jpg', // Replace with actual image URL
    },
    {
        id: 1,
        name: 'Product 1',
        image: 'https://www.w3schools.com/w3images/lights.jpg', // Replace with actual image URL
      },
      {
        id: 2,
        name: 'Product 2',
        image: 'https://www.w3schools.com/w3images/fjords.jpg', // Replace with actual image URL
      },
      {
        id: 3,
        name: 'Product 3',
        image: 'https://www.w3schools.com/w3images/mountains.jpg', // Replace with actual image URL
      },{
        id: 1,
        name: 'Product 1',
        image: 'https://www.w3schools.com/w3images/lights.jpg', // Replace with actual image URL
      },
      {
        id: 2,
        name: 'Product 2',
        image: 'https://www.w3schools.com/w3images/fjords.jpg', // Replace with actual image URL
      },
      {
        id: 3,
        name: 'Product 3',
        image: 'https://www.w3schools.com/w3images/mountains.jpg', // Replace with actual image URL
      },
  ];

  return (
    <div className="items-container">
      {products.map((product) => (
        <div key={product.id} className="item">
          <img src={product.image} alt={product.name} className="item-image" />
          <h3 className="item-name">{product.name}</h3>
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
