/* Core */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: CounterSliceState = {
  values: [0],
  status: "idle",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // increment, decrement, incrementByAmount logic here
    addCounter(state) {
      state.values.push(0);
    },
    incrementRow(state, action: PayloadAction<number>) {
      state.values[action.payload] += 1;
    },
    decrementRow(state, action: PayloadAction<number>) {
      state.values[action.payload] -= 1;
    },
    incrementRowByAmount(state, action: PayloadAction<{id: number, amount: number}>) {
      // Object destructuring
      const {id, amount} = action.payload;

      state.values[id] += amount;
    },
  },
});

/* Types */
export interface CounterSliceState {
  values: Array<number>,
  status: "idle" | "loading" | "failed";
}

export const { addCounter, incrementRow, decrementRow, incrementRowByAmount } = counterSlice.actions
