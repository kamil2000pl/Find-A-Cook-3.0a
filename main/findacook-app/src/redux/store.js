import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import messageReducer from './reducers/messageReducer';
import loadingReducer from './reducers/loadingReducer';
import categoryReducer from './reducers/categoryReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducers';
import cookReducer from './reducers/cookReducer';
import userReducer from './reducers/userReducer';



const reducer = combineReducers({
	loading: loadingReducer,
	messages: messageReducer,
	categories: categoryReducer,
  cart: cartReducer,
  products: productReducer,
  cooks: cookReducer,
  users: userReducer,
})

const initialState = {}

const middleware = [thunk]

const store = configureStore({
    reducer,
    initialState,
    middleware: middleware,
    devTools: process.env.NODE_ENV !== 'production' && composeWithDevTools,
});

export default store;