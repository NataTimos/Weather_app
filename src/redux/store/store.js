import { configureStore } from "@reduxjs/toolkit";
import weatherReduser from '../slices/weatherSlices'

const store = configureStore({
    reducer: weatherReduser,
})

export default store;