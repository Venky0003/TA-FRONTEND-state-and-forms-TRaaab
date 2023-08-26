import React from 'react';

function CartItems(props) {
  return (
    <div className="cart-item" key={props.id}>
      <div className="flex flex-column justify-center">
        <img src={`./static/products/${props.sku}_2.jpg`} alt="T shirts" />
      </div>
      <div className="flex flex-column justify-center">
        <p className="cart-item-title">{props.title}</p>
        <p>Size: {props.availableSizes[0]}</p>
        <p>{props.style}</p>
        <p>Quantity:{props.quantity}</p>
      </div>
      <div className="flex flex-column justify-center">
        <button
          className="item-dlt-btn"
          onClick={() => props.deleteItem(props.id)}
        >
          x
        </button>
        <p>{`${props.currencyFormat + props.price}`}</p>
        <div  className="inc-dec-btn flex  align-center">
          <Increment
            incrementQuantity={() => props.incrementQuantity(props.id)}
          />
          <Decrement
            decrementQuantity={() => props.decrementQuantity(props.id)}
          />
        </div>
      </div>
    </div>
  );
}

function Increment(props) {
  return <button onClick={props.incrementQuantity}>+</button>;
}

function Decrement(props) {
  return <button onClick={props.decrementQuantity}>-</button>;
}

export default CartItems;
