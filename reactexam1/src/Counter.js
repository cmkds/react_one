import React, {useState} from 'react';
import OddEvenResult from './OddEvenResult';
// 상태를 사용하겠다는 메소드를 사용해서 임포트 해줘야 한다.

const Counter = ({initialValue}) => {
  //부모에게서 받은 props를 props로 받아 출력 할 수 있다

  const [count, setCount] = useState(initialValue)

  const onIncrease = () => {
    setCount(count +1);
  };

  const onDecrease = () => {
    setCount(count -1);
  }


  return(
    <div>
      <h2>{count}</h2>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
      <OddEvenResult count = {count}  /> 
    </div>
  )
}

Counter.defaultProps = {
  initialValue: 0,
}


export default Counter;