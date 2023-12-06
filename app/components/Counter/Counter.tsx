"use client";

/* Core */
import { useState } from "react";

/* Instruments */
import { useSelector, selectCountArray, useDispatch, incrementRow, decrementRow, incrementRowByAmount, incrementRowIfOddAsyn, addCounter } from "@/lib/redux";
import styles from "./counter.module.css";

export const Counter = () => {
  const counts = useSelector(selectCountArray);
  const dispatch = useDispatch();

  // Create a state named incrementAmount
  const [incrementAmountRow, setIncrementAmountRow] = useState([0]);

  const surgicallyAddIncrementAmount = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    // Utilized callback to create a new array based on previous array.
    setIncrementAmountRow((prevArray: Array<number>) => {
      prevArray[id] = parseInt(event.target.value)

      // Destructuring array for change detection to kick in
      return [...prevArray];
    })
  }

  return (
    <>
      {counts.map((count, id) => (
        <div className={styles.row} key={id}>
          <div>
            <div className={styles.row}>
              <button
                className={styles.button}
                aria-label="Decrement value"
                onClick={() => {
                  // dispatch event to decrease count by 1
                  dispatch(decrementRow(id))
                }}
              >
                -
              </button>
              <span className={styles.value}>{count}</span>
              <button
                className={styles.button}
                aria-label="Increment value"
                onClick={() => {
                  // dispatch event to increment count by 1
                  dispatch(incrementRow(id))
                }}
              >
                +
              </button>
            </div>
            <div className={styles.row}>
              <input className={styles.textbox} aria-label="Set increment amount" type="number" onChange={(event) => surgicallyAddIncrementAmount(event, id)} /> {/* Used arrow function to pass in event as well as id */}
              <button
                className={styles.button}
                onClick={() => {
                  // dispatch event to add incrementAmount to count
                  dispatch(incrementRowByAmount({ id, amount: incrementAmountRow[id] || 0 }))
                }}
              >
                Add Amount
              </button>
              <button
                className={styles.button}
                onClick={() => {
                  // dispatch event to add incrementAmount only if count is odd
                  dispatch(incrementRowIfOddAsyn(id, incrementAmountRow[id] || 0))
                }}
              >
                Add If Odd
              </button>
            </div>
          </div>
        </div>
      ))}
      <button className={styles.button} onClick={() => dispatch(addCounter())}>Add Counter</button>
    </>
  );
};
