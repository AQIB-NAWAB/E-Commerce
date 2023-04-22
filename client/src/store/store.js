import {configureStore,combineReducers} from "@reduxjs/toolkit"
import ProductReducer from "./reducers/ProductReducer"
import UserReducer from "./reducers/UserReducer"
import CartReducer from "./reducers/CartReducer"
const reducer=combineReducers({
    Products:ProductReducer,
    User:UserReducer,
    Cart:CartReducer

})

const store =configureStore({
reducer
})

export default store