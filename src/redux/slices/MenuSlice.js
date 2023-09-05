import { createSlice } from '@reduxjs/toolkit';

export const MenuSlice = createSlice({
    name: 'menu',
    initialState: {
        image: null,
        size: '',
        price: '',
        name: '',
        edit : 'No',
        id : ''
    },
    reducers: {
        add: (state, action) => {
            return action.payload
        },
        update: (state, action) => {
            return {
                image: null,
                size: '',
                price: '',
                name: '',
                edit : 'No',
                id : ''
            }
        }
    }
});

export const { add, update } = MenuSlice.actions;
export default MenuSlice.reducer;
