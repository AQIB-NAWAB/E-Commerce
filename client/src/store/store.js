import {configureStore,combineReducers} from "@reduxjs/toolkit"
import ProductReducer from "./reducers/ProductReducer"
import UserReducer from "./reducers/UserReducer"
import CartReducer from "./reducers/CartReducer"
import ProfileReducer from "./reducers/ProfileReducer"
import AllUsersReducer from "./reducers/AllUserReducer"
import  getAllProductsReducer  from "./reducers/AllProductReducer"
import  getAllOrdersReducer from "./reducers/AllOrdersReducer"
import  createNewProductReducer  from "./reducers/NewProductReducer"
import  UpdateProductReducer from "./reducers/ProductUpdateReducer"
import UserDetailsReducer from "./reducers/UserDetailsReducer"
import productReviewsSlice from "./reducers/productReviewsReducer"
import  getMyOrdersSlice  from "./reducers/OrderReducer"
const reducer=combineReducers({
    Products:ProductReducer,
    User:UserReducer,
    Cart:CartReducer,
    Profile:ProfileReducer,
    AllUsers:AllUsersReducer,
    AllProducts:getAllProductsReducer,
    AllOrders:getAllOrdersReducer,
    NewProduct:createNewProductReducer,
    ProductUpdate:UpdateProductReducer,
    UserDetails:UserDetailsReducer,
    ProductReviews:productReviewsSlice,
    Orders:getMyOrdersSlice


})

const store =configureStore({
reducer
})

export default store