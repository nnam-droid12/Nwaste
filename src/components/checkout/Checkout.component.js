import React from 'react';
import Header from '../header/Header';
import { connect } from 'react-redux';
import CheckoutItem from '../checkout-item/Checkout-item.component';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import './Checkout.scss';

const CheckoutPage = ({ cartItems, total }) =>(
        <div>
        <Header />
          <div style={{marginTop:'180px'}} className='checkout-page'>
             <div className='checkout-header'>
                 <div className='header-block'>
                  <span>Product</span>
                 </div>
                 <div className='header-block'>
                  <span>Description</span>
                 </div>
                 <div className='header-block'>
                  <span>Quantity</span>
                 </div>
                 <div className='header-block'>
                  <span>Price</span>
                 </div>
                 <div className='header-block'>
                  <span>Remove</span>
                 </div>
             </div>
             {
                 cartItems.map(cartItem =>
                 <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
             }
             <div className='total'>
                 <span>TOTAL: ${total}</span>
             </div>
          </div>
        </div>
    )


 const mapInitialStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
 })   
export default connect(mapInitialStateToProps)(CheckoutPage);