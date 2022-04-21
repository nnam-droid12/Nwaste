import React from 'react';

import './cart-item.scss';

const CartItem = ({ i: { imageUrl,title, location, price, quantity } }) =>{
    return (
        <div className='cart-item'>
            <img src={imageUrl} alt='product' />
            <div className='item-details'>
                <span className='title'>{title}</span>
                <span className='location'>{location}</span>
                <span className='price'>
                {quantity} x ${price}
                </span>
            </div>
        </div>
    )
}

export default CartItem;