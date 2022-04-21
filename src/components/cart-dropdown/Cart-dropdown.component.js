import React from 'react';
import CartItem from '../cart-item/Cart-item.component';
import { connect } from 'react-redux';
import { toggleCartHidden } from './../../redux/cart/cart.actions';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { useNavigate } from 'react-router-dom';
import './cart-dropdown.scss';


const CartDropdown = ({ cartItems, dispatch }) => {
   let navigate = useNavigate();
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {  cartItems.length ? (
                    cartItems.map(cartItem => 
                    <CartItem key={cartItem.id} i={cartItem} />)
                ): 
                <span className='empty-message'>Your cart is empty</span>
    
                }
            </div>
            <button className='cart-dropdown-button' 
            onClick={() => {navigate('/checkout');
             dispatch(toggleCartHidden())}}>GO TO CHECKOUT</button>
        </div>
    )
    

}

const mapInitialStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})

export default connect(mapInitialStateToProps)(CartDropdown);