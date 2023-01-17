import React, { useState, useEffect } from "react";

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA Update - count : ${count}`);
  });

  return <div>{count}</div>;
});

const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`CounterB Update - count : ${obj.count}`);
  });

  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  // if (prevProps.obj.count === nextProps.obj.count) {
  //   return true; // 이전 프롭스 현재 프롭스가 같다 -> 리렌더링을 일으키지 않게됨
  // }
  // return false; // 이전과 현재가 다르다. -> 리렌더링 일어남.

  return prevProps.obj.count === nextProps.obj.count;
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
        {/* setCount로 상태변화를 일으키지만 원래 count 값이 들어가도록 처리. */}
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        {/* <CounterB obj={obj} /> */}
        {/* obj와 똑같은 값을 할당 해준다. */}
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B Button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
