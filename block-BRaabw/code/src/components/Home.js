import React from 'react';
import data from '../data.json';
import Cart from './Cart';
import { FaCartPlus } from 'react-icons/fa6';
console.log('Data:', data);
console.log('Data[0]:', data[0]);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCartPopup: false,
      cartItems: [],
      filteredItems: [],
      selectedSizes: [],
      filterByPrice: [],
      details: data.products.map((info, index) => ({
        title: info.title,
        price: info.price,
        currency: info.currencyId,
        isFree: info.isFreeShipping,
        sku: info.sku,
        currencyFormat: info.currencyFormat,
        sizes: info.availableSizes,
        selectedSize: '',
        id: info.id,
        selectedSortOrder: '',
      })),
    };
  }

  handleSizesFilter = (size) => {
    const filteredItems = this.state.details.filter((product) =>
      product.sizes.includes(size)
    );
    console.log('clcicked on sizes', filteredItems);
    this.setState({
      filteredItems,
    });
  };

  handleSort = (event) => {
    const selectedSortOrder = event.target.value;
    const filterByPrice = this.state.details.sort((a, b) => a.price - b.price);

    if (selectedSortOrder === 'highToLow') {
      filterByPrice.reverse(); // Reverse the order for high to low
    }
    this.setState({
      selectedSortOrder,
      filterByPrice,
    });
  };

  handleSizeChange(event, item, filteredItem, filterprice) {
    const newSize = event.target.value;
    if (item) {
      this.setState((prevState) => ({
        details: prevState.details.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, selectedSize: newSize }
            : prevItem
        ),
      }));
    } else if (filterprice) {
      this.setState((prevState) => ({
        filterByPrice: prevState.filterByPrice.map((prevItem) =>
          prevItem.id === filterprice.id
            ? { ...prevItem, selectedSize: newSize }
            : prevItem
        ),
      }));
    } else {
      this.setState((prevState) => ({
        filteredItems: prevState.filteredItems.map((prevItem) =>
          prevItem.id === filteredItem.id
            ? { ...prevItem, selectedSize: newSize }
            : prevItem
        ),
      }));
    }
  }

  handleAddToCart = (item) => {
    const selectedSize = item.selectedSize;
    if (!item.selectedSize) {
      alert('Please select a size before adding to the cart.');
      return;
    }
    const updateCartItems = [...this.state.cartItems];
    const index = updateCartItems.findIndex(
      (cartItem) =>
        cartItem.sku === item.sku && cartItem.selectedSize === selectedSize
    );

    if (index !== -1) {
      updateCartItems[index].count += 1; // Increment the count if item exists
    } else {
      updateCartItems.push({
        ...item,
        count: 1,
        sizes: item.sizes,
        selectedSize: selectedSize,
      }); // Add item with count 1 if not in cart
    }

    this.setState({
      cartItems: updateCartItems,
    });
  };

  handleRemoveFromCart = (item) => {
    const updateCartItems = [...this.state.cartItems];
    const index = updateCartItems.findIndex(
      (cartItem) => cartItem.sku === item.sku
    );

    if (index !== -1) {
      if (updateCartItems[index].count === 1) {
        updateCartItems.splice(index, 1); // Remove the item if count is 1
      } else {
        updateCartItems[index].count -= 1; // Decrement the count if count > 1
      }

      this.setState({
        cartItems: updateCartItems,
      });
    }
  };

  handleDelete = (item) => {
    const updateCartItems = this.state.cartItems.filter(
      (cartItem) => cartItem.sku !== item.sku
    );
    console.log('Updated Cart Items:', updateCartItems);
    this.setState({
      cartItems: updateCartItems,
    });
  };

  totalCartItemsCount = () => {
    let totalCount = 0;
    this.state.cartItems.forEach((item) => {
      totalCount += item.count;
    });
    return totalCount;
  };

  toggleCartPopup = () => {
    this.setState((prevState) => ({
      showCartPopup: !prevState.showCartPopup,
    }));
  };

  render() {
    const { filteredItems, details, filterByPrice } = this.state;
    console.log('filteredItems:', filteredItems);
    console.log('filterByPrice:', filterByPrice);
    return (
      <>
        <section id="home" className="container height-full">
          <div className="flex justify-between">
            <div className=" aside flex-15">
              <div className="flex flex-column">
                <div className="grid-3-row">
                  <button
                    onClick={() => this.handleSizesFilter('S')}
                    className="sizes"
                  >
                    S
                  </button>
                  <button
                    onClick={() => this.handleSizesFilter('XS')}
                    className="sizes"
                  >
                    XS
                  </button>
                  <button
                    onClick={() => this.handleSizesFilter('M')}
                    className="sizes"
                  >
                    M
                  </button>
                  <button
                    onClick={() => this.handleSizesFilter('X')}
                    className="sizes"
                  >
                    X
                  </button>
                  <button
                    onClick={() => this.handleSizesFilter('L')}
                    className="sizes"
                  >
                    L
                  </button>
                  <button
                    onClick={() => this.handleSizesFilter('XL')}
                    className="sizes"
                  >
                    XL
                  </button>
                  <button
                    onClick={() => this.handleSizesFilter('XXL')}
                    className="sizes"
                  >
                    XXL
                  </button>
                </div>
                <div className="m-top-20">
                  <h3>Sort By Price</h3>
                  <select
                    value={this.state.selectedSortOrder}
                    onChange={this.handleSort}
                  >
                    <option value="">Select</option>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex-85">
              {filteredItems.length > 0 ? (
                <ul className="grid">
                  {filteredItems.map((filteredItem, index) => (
                    <li className="grid-item" key={index}>
                      <div>
                        <img
                          src={`./static/products/${filteredItem.sku}_1.jpg`}
                          alt="T shirts"
                        />
                      </div>
                      <div className='flex flex-column'>
                        <h2>{filteredItem.title}</h2>
                        <p className="line"></p>
                        <p className="m-top-20">
                          <span>{filteredItem.currencyFormat}</span>
                          {filteredItem.price}
                        </p>
                        <select
                         className='size-select'
                          value={filteredItem.selectedSize}
                          onChange={(event) =>
                            this.handleSizeChange(
                              event,
                              null,
                              filteredItem,
                              null
                            )
                          }
                        >
                          <option value="">Select Size</option>
                          {filteredItem.sizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => this.handleAddToCart(filteredItem)}
                          className="btn btn-primary"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : filterByPrice.length > 0 ? (
                <ul className="grid">
                  {filterByPrice.map((filterprice, index) => (
                    <li className="grid-item" key={index}>
                      <div>
                        <img
                          src={`./static/products/${filterprice.sku}_1.jpg`}
                          alt="T shirts"
                        />
                      </div>
                      <div className='flex flex-column'>
                        <h2>{filterprice.title}</h2>
                        <p className="line"></p>
                        <p className="m-top-20">
                          <span>{filterprice.currencyFormat}</span>
                          {filterprice.price}
                        </p>
                        <select
                         className='size-select'
                          value={filterprice.selectedSize}
                          onChange={(event) =>
                            this.handleSizeChange(
                              event,
                              null,
                              null,
                              filterprice
                            )
                          }
                        >
                          <option value="">Select Size</option>
                          {filterprice.sizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => this.handleAddToCart(filterprice)}
                          className="btn btn-primary"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="grid">
                  {details.map((item, index) => (
                    <li className="grid-item" key={index}>
                      <div>
                        <img
                          src={`./static/products/${item.sku}_1.jpg`}
                          alt="T shirts"
                        />
                      </div>
                      <div className='flex flex-column'>
                        <h2>{item.title}</h2>
                        <p className="line"></p>
                        <p className="m-top-20">
                          <span>{item.currencyFormat}</span>
                          {item.price}
                        </p>
                        <select
                        className='size-select'
                          value={item.selectedSize}
                          onChange={(event) =>
                            this.handleSizeChange(event, item, null, null)
                          }
                        >
                          <option value="">Select Size</option>
                          {item.sizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => this.handleAddToCart(item)}
                          className="btn btn-primary"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
        <button className="cart-button" onClick={this.toggleCartPopup}>
          <FaCartPlus />
          <span className="cart-count">
            {this.totalCartItemsCount() > 0 ? this.totalCartItemsCount() : ''}
          </span>
        </button>
        {this.state.showCartPopup && (
          <Cart
            cartItems={this.state.cartItems}
            onClose={this.toggleCartPopup}
            addMore={this.handleAddToCart}
            reduceItems={this.handleRemoveFromCart}
            delete={this.handleDelete}
          />
        )}
      </>
    );
  }
}

export default Home;
