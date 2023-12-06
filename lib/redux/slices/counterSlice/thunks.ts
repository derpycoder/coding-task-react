/* Instruments */
import { incrementRowByAmount, type ReduxThunkAction } from "@/lib/redux";

export const incrementRowIfOddAsyn =
  (id: number, amount: number = 0): ReduxThunkAction =>
  (dispatch) => {
    // update only if currentValue is odd
    if(amount % 2 !== 0) {
      dispatch(incrementRowByAmount({id, amount}))
    }
  };
