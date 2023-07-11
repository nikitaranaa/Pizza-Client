import { createSlice } from "@reduxjs/toolkit";
export const CartSlice = createSlice({
    name : 'cart',
    initialState : [],
    reducers : {
        add : (state,action) => {
            state.push(action.payload)
        },
        remove : (state,action) => {
             return state.filter((item) => item._id !== action.payload._id)
        },
        update: (state, action) => {
            return state.map(item => {
                if (item._id === action.payload._id) {
                    return {
                        ...item,
                        qty: action.payload.qty
                    };
                } else {
                    return item;
                }
            })
        },
        deleteAll : (state) => {
            return []
        }
    }
})

export const {add,remove,update,deleteAll} = CartSlice.actions
export default CartSlice.reducer