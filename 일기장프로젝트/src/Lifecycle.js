import React, { useEffect, useState } from "react";

const Lifecycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  //리액트의 기능 useEffect 사용

  // Mount
  // Mount가 되는 시점에 무언가를 하고 싶다면
  // 2번째  인자에 빈배열을 넣어주고
  // 1번째 인자 콜백함수에 하고 싶은 작업을 하면 된다.
  useEffect(() => {
    console.log("Mount!");
  }, []);

  // Update
  // 모든 Update
  // 2번째 인자에 아무것도 작성하지 않는다.
  useEffect(() => {
    console.log("Update!");
  });

  // Update
  // 특정 State 업데이트. count
  useEffect(() => {
    console.log(`count is update : ${count}`);
    if (count > 5) {
      alert("count가 5를 넘었습니다 따라서 1로 초기화합니다.");
      setCount(1);
      //setCount(실행)
    }
  }, [count]);

  // Update
  // 특정 State 업데이트. text
  useEffect(() => {
    console.log(`text is update ${text}`);
  }, [text]);

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
      <div>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Lifecycle;
