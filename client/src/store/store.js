import {configureStore,combineReducers} from "@reduxjs/toolkit"
import ProductReducer from "./reducers/ProductReducer"
import UserReducer from "./reducers/UserReducer"
const reducer=combineReducers({
    Products:ProductReducer,
    User:UserReducer

})

const store =configureStore({
reducer
})

export default store