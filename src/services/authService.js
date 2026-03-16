import {createApi} from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi'


export const authService = createApi({
    reducerPath : "AuthAPI",
    baseQuery:baseQuery,
    endpoints : builder => ({
         register : builder.mutation({
            query : (body) => ({
                url :"/auth/register",
                method:"POST",
                body
            })
        }),
        login : builder.mutation({
            query : (body) => ({
                url :"/auth/login",
                method:"POST",
                body
            })
        }),
         verify : builder.mutation({
            query : (body) => ({
                url :"/auth/verify",
                method:"POST",
                body
            })
        }),
        forgotPassword : builder.mutation({
            query : (body) => ({
                url :"/auth/forgotpassword",
                method:"POST",
                body
            })
        }),
            resetPassword : builder.mutation({
            query : ({body,token}) => ({
                url :"/auth/resetpassword",
                method:"POST",
                body,
                headers : { Authorization : `${token}` }
               
            })  
        })
        
       
               
        })

})

export const {useLoginMutation, useVerifyMutation, useRegisterMutation, useForgotPasswordMutation, useResetPasswordMutation  } = authService