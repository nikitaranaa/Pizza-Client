import {createSlice} from '@reduxjs/toolkit'

export const AdminSlice = createSlice({
    name : 'admin',
    initialState : 0,
    reducers : {
        update : (state, action) => {
            return action.payload
        }
    }
})

export const {update} = AdminSlice.actions
export default AdminSlice.reducer