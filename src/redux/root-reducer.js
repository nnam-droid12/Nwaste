import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import detailReducer from './detail/detail.reducer';

export default combineReducers({
    user: userReducer,
    cart: cartReducer,
    detail: detailReducer
});
