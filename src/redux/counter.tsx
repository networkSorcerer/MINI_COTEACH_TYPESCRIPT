import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store'; // store 위치에 맞게 경로 조정

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
};

export default Counter;
