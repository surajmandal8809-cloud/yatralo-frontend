import { configureStore } from "@reduxjs/toolkit";
import { authService } from "../services/authService"
import { userService } from "../services/userService"
import { flightService } from "../services/flightService"
import { couponService } from "../services/couponService"
import { bookingService } from "../services/bookingService"
import userReducer from '../slices/userSlice';
export const store = configureStore({
        reducer: {
                [authService.reducerPath]: authService.reducer,
                [userService.reducerPath]: userService.reducer,
                user: userReducer,
                [flightService.reducerPath]: flightService.reducer,
                [couponService.reducerPath]: couponService.reducer,
                [bookingService.reducerPath]: bookingService.reducer,
        },
        middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(
                        authService.middleware,
                        userService.middleware,
                        flightService.middleware,
                        couponService.middleware,
                        bookingService.middleware
                )
})
