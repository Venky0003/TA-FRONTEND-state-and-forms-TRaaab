import React from 'react';

function Product(props) {
  return (
    <div>
      <div className="grid-item" key={props.id}>
        <div>
          <img src={`./static/products/${props.sku}_1.jpg`} alt="T shirts" />
        </div>
        <div className="flex flex-column">
          <h2>{props.title}</h2>
          <p className="line"></p>
          <p className="m-top-20">
            <span>{props.currencyFormat}</span>
            {props.price}
          </p>      
          <button
            onClick={() => props.handleAddToCart(props)}
            className="btn btn-primary"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
