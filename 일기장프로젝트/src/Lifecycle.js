import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  //컴포넌트가 언마운트 되는 순간 제어 하기
  //기본적으로 useEffect(() => {},[])를 사용하면 업데이트 될 때 동작한다.
  useEffect(()=> {
    console.log("Mount!");

    //리턴값에 원하는 것을 콜백함수로 넣으면 
    //Unmount 시점에 실행 시킬 수 있다.
    return () =>{
      // Unmount 시점에 실행되게 됨
      console.log("Unmount!"); 
    }
  },[])
}

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest/>}
      {/* 단락회로 평가 isVisible이 false면 뒤에껄 확인안하기에 UnmontTest가
      안나옴. True면 뒤의걸 확인하기 때문에 UnmountTest 컴포넌트가 나타남 */}
    </div>
  );
};

export default Lifecycle;
