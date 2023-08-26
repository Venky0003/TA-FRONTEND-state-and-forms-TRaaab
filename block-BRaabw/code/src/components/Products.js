import React from 'react';
import OrderBy from './OrderBy';
import Product from './Product';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrder: '',
    };
  }

  handleOrderBy = (event) => {
    this.setState({ selectedOrder: event.target.value });
  };

  hanleOrderProducts = (order, sizes, products) => {
    let sortedProducts = [...products];
    if (sizes.length > 0) {
      sortedProducts = sortedProducts.filter((p) => {
        for (const size of sizes) {
          if (p.availableSizes.includes(size)) {
            return true;
          }
        }
        return false;
      });
    }
    // console.log({ sortedProducts });

    if (order === 'lowest') {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    if (order === 'highest') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    return sortedProducts;
  };

  render() {
    let { selectedOrder } = this.state;
    let products = this.hanleOrderProducts(
      selectedOrder,
      this.props.selectedSizes,
      this.props.data
    );

    return (
      <div>
        <div>
          <p>{`${products.length} Product${products.length > 1 ?"s":""} found.`}</p>
        </div>
        <OrderBy
          selectedOrder={selectedOrder}
          handleOrderBy={this.handleOrderBy}
        />
        <div className="grid">
          {products.map((product) => (
            <Product
            // key={product.id}
              {...product}
              handleAddToCart={this.props.handleAddToCart}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Products;
