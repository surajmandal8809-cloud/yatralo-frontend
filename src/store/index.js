import { configureStore } from "@reduxjs/toolkit";
import { authService } from "../services/authService"
import { userService } from "../services/userService"

export const store = configureStore({
        reducer: {
                [authService.reducerPath]: authService.reducer,
                [userService.reducerPath]: userService.reducer,
                
        },
        middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(
                        authService.middleware,
                        userService.middleware,
                        
                )
})
