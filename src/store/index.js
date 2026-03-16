import { configureStore } from "@reduxjs/toolkit";
import { authService } from "../services/authService"
import { userService } from "../services/userService"
import { flightService } from "../services/flightService"

export const store = configureStore({
        reducer: {
                [authService.reducerPath]: authService.reducer,
                [userService.reducerPath]: userService.reducer,
                [flightService.reducerPath]: flightService.reducer,
        },
        middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(
                        authService.middleware,
                        userService.middleware,
                        flightService.middleware
                )
})
