import React from 'react';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCartPopup: false,
      filteredItems: [],
      selectedSizes: [],
      filterByPrice: [],
      cartItems: props.cartItems || [],
    };
  }

  render() {
    let { cartItems } = this.props;

    const subtotal = cartItems.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);

    return (
      <>
        <div id="cart" className="cart-overlay">
          <div className="cart-popup">
            <ul>
              {cartItems.map((item, index) => {
                return (
                  <li className="flex justify-between" key={index}>
                    <div>
                      <img
                        src={`./static/products/${item.sku}_2.jpg`}
                        alt="T shirts"
                      />
                    </div>
                    <div>
                      <p>{item.title}</p>

                      {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                      <p>{item.count}</p>
                    </div>
                    <div>
                      <button onClick={() => this.props.delete(item)}>x</button>
                      <p>
                        <span>{item.currencyFormat}</span>
                        {item.price * item.count}
                      </p>
                      <button onClick={() => this.props.addMore(item)}>
                        +
                      </button>
                      <button onClick={() => this.props.reduceItems(item)}>
                        -
                      </button>
                    </div>
                  </li>
                );
              })}
              <div>
                {subtotal > 0 ? (
                  <div>
                    <div className=" sub-total flex justify-between">
                      <h3>SUBTOTAL</h3>
                      <h3>$ {subtotal}</h3>
                    </div>
                    <button className="btn-checkout">Checkout</button>
                  </div>
                ) : (
                  <p>Hey Bag Feels so empty Add products</p>
                )}
              </div>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Cart;
