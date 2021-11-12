import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

//action
let  cities = [ ]
export const fetchWeatherAction = createAsyncThunk(
    'weather/fetch',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const API_KEY = '652a52f728d9fb3e93ddcead3f7b780a';
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=${API_KEY}&units=metric`;
        
        try {
            const { data } = await axios.get(URL);
            // console.log(data)
            // cities = await data.weather.name;
            // data.cities = cities;
            // console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error
            }
            return rejectWithValue(error?.response?.data)
        }
    } 
);

//slice
const weatherSlice = createSlice({
    name: 'weather',
    initialState: {data: 'Loaded'},
    extraReducers: builder => {
        //pending
        builder.addCase(fetchWeatherAction.pending, (state, action) => {
            state.loading = true; 

            state.cities = state.cities = Object.assign({}, cities);
        });
        //fulfilled
        builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
            state.weather = action && action.payload;
            state.loading = false;
            state.error = undefined;

            console.log(state.weather.name)
            let a = state.weather.name;
            cities.unshift(a)
            cities.splice(10, 1)
            console.log(cities)
            
            state.cities = Object.assign({}, cities);
        });
        //rejected
        builder.addCase(fetchWeatherAction.rejected, (state, action) =>{
            state.loading = false;
            state.weather = undefined;
            state.error = action && action.payload;
        })
    }
})

export default weatherSlice.reducer;

