import React from 'react';
import Products from './Products';

function Main(props) {
  return (
    <div className='flex-85'>
      <Products data={props.products} selectedSizes={props.selectedSizes} handleAddToCart ={props.handleAddToCart} />
    </div>
  );
}

export default Main;
