import { configureStore, createSlice } from "@reduxjs/toolkit";
import { authService } from "./services/authService"
import { userService } from "./services/userService"
import { flightService } from "./services/flightService"
import { couponService } from "./services/couponService"
import { bookingService } from "./services/bookingService"
import { hotelService } from "./services/hotelService"
import { busService } from "./services/busService"
import { trainService } from "./services/trainService"

// Consolidated user slice within store for speed and simplicity
const getUserToken = () => {
    try { return localStorage.getItem("token") || null; } 
    catch(e) { return null; }
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: getUserToken(),
        isAuthenticated: !!getUserToken(),
        userInfo: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
            if (action.payload) localStorage.setItem("token", action.payload);
            else localStorage.removeItem("token");
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.userInfo = null;
            localStorage.removeItem("token");
        },
    },
});

export const { setToken, logout, setUserInfo } = userSlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        [authService.reducerPath]: authService.reducer,
        [userService.reducerPath]: userService.reducer,
        [flightService.reducerPath]: flightService.reducer,
        [couponService.reducerPath]: couponService.reducer,
        [bookingService.reducerPath]: bookingService.reducer,
        [hotelService.reducerPath]: hotelService.reducer,
        [busService.reducerPath]: busService.reducer,
        [trainService.reducerPath]: trainService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ 
            serializableCheck: false,
            immutableCheck: false // Faster for large updates
        }).concat(
            authService.middleware,
            userService.middleware,
            flightService.middleware,
            couponService.middleware,
            bookingService.middleware,
            hotelService.middleware,
            busService.middleware,
            trainService.middleware
        )
})
