import React from 'react';
import CartItems from './CartItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCartPopup: false,
      isOpen: false,
    };
  }

  open = () => {
    // console.log('Open cart clicked');
    this.setState({ isOpen: true });
  };

  close = () => {
    // console.log('close clicked');
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;
    const totalQuantity = this.props.cartItems.reduce((acc, cv) => {
      acc = acc + cv.quantity;
      return acc;
    }, 0);


    const subtotal = this.props.cartItems.reduce((total, item) => {
      total = total + item.price * item.quantity;
      return total;
    }, 0);

    if (!isOpen) {
      return <ClosedCart open={this.open} totalQuantity={totalQuantity} />;
    }
    return (
      <>
        <div
          id="cart"
          className={`cart-overlay ${isOpen ? 'open' : ''} scrollable`}
        >
          <div className="close-button" onClick={this.close}>
            X
          </div>
          <div className="cart-items">
            <div className="text-center fs-25 m-top-50">
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
            {this.props.cartItems.map((item) => (
              <CartItems
                key={item.id}
                {...item}
                incrementQuantity={this.props.incrementQuantity}
                decrementQuantity={this.props.decrementQuantity}
                deleteItem={this.props.deleteItem}
              />
            ))}
            <div>
            <div className="flex justify-between padding-10 cart-total">
              <p className="sub-total">subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className='flex justify-center align-center'>
            <button className='btn-checkout' onClick={() => alert(`Total amount is: $ ${subtotal}`)}>Checkout</button>
            </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function ClosedCart(props) {
  return (
    <div onClick={props.open} className="closed-cart">
      <FontAwesomeIcon className="margin-center" icon={faShoppingCart} />
      <span className="quantity-on-icon-cart">{props.totalQuantity}</span>
    </div>
  );
}

export default Cart;
