import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  cart: any;
}

const initialState: CounterState = {
  value: 0,
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      console.log(action.payload);

      if (state.cart.some((itemOld: any) => itemOld.id === action.payload.id)) {
        state.cart = state.cart.map((itemOld: any) => {
          if (itemOld.id === action.payload.id) {
            return {
              ...itemOld,
              count: itemOld.count + 1,
            };
          }
          return itemOld;
        });
      } else {
        state.cart = [
          ...state.cart,
          { count: 1, id: action.payload.id, data: action.payload },
        ];
      }
    },
    removeFromCart: (state, action) => {
      if (Number(action.payload.count) === 1) {
        state.cart = state.cart.filter(
          (item: any) => item.id !== action.payload.id
        );
      } else {
        state.cart = state.cart.map((item: any) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              count: item.count - 1,
            };
          } else {
            return item;
          }
        });
      }
    },
  },
});

export const { addCart, removeFromCart } = cartSlice.actions;
