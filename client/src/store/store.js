import {configureStore,combineReducers} from "@reduxjs/toolkit"
import ProductReducer from "./reducers/ProductReducer"
const reducer=combineReducers({
    Products:ProductReducer,

})

const store =configureStore({
reducer
})

export default store