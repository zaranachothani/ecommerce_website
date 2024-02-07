import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  cartproduct: [],
  item: 0 
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.cartproduct.findIndex(item => item.id === action.payload.id);
      // state.cartproduct.qty=1;

      if (existingItemIndex !== -1) {
        state.cartproduct[existingItemIndex].qty += 1;
        console.log(state);
      } else { 
        const newItem = { ...action.payload, qty: 1 };
        state.cartproduct = [...state.cartproduct, newItem];
        state.item += 1; 
      }

    },
    increment: (state,action) => {
      const index = state.cartproduct.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.cartproduct[index].qty += 1;
      }
      state.value += 1
    },
    incrementVal: (state,action) => {
      state.value += 1
    },
    decrement: (state,action) => {
      const index = state.cartproduct.findIndex(item => item.id === action.payload.id);
      if (index !== -1 && state.cartproduct[index].qty > 1) {
        state.cartproduct[index].qty -= 1;
      }
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    removeFromCart: (state, action) => {
      state.cartproduct = state.cartproduct.filter(item => item.id !== action.payload.id);
      state.item -=1;
    },
  },
})

// Action creators are generated for each case reducer function
export const { incrementVal,increment, decrement, incrementByAmount, addToCart, removeFromCart } = counterSlice.actions

export default counterSlice.reducer