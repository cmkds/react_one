import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import "./App.css";
import DiaryEditor2 from "./DiaryEditor2";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]);
  //일기 데이터를 넣을 것이기 때문에 useState는 배열로 초기값 설정.

  const dataId = useRef(0);
  //@@@ API 호출하기
  //async 코드를 붙혀서 getData객체를 포로미스를 반환하는 비동기 함수로 만든다.
  //await fetch('api 주소').then((res)=> res.json())
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    //res를 0~19까지 자름
    //여기선 api를 우리가 만든 일기 툴에 넣기 위해 map을 이용
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        //자바스크립트의 내장 객체 사용.
        // Math.random()은 0~1까지 랜덤 난수 생성
        // Math.floor() 소수점을 전부 버려주는 함수
        created_date: new Date().getTime(),
        id: dataId.current++, // dataId를 현재 current값으로 넣고 나서 1증가
      };
    });

    setData(initData);
  };

  // API 를 호출하는 getData 함수를 마운트 되자마자 호출하기
  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    //객체에 담을 값들은 파라미터로 받아 온다.
    const created_date = new Date().getTime();
    // new Date().getTime() 현재시간 받아오기.
    // 현재시간도 여기서 만들어서 객체에 담아 준다.

    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;

    //함수형 업데이트 활용
    // setData([newItem, ...data]);
    setData((data) => [newItem, ...data]);
  }, []);

  const onRemove = useCallback((targetId) => {
    //항상 최신 data를 사용하기 위해서
    // data를 다루는 부분을 전달해서 리턴하는 식으로 작성해야 한다.
    // setData의 인자부분의 데이터를 사용해야 한다.
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }, []);

  // 글을 수정 할 때는 감정의 변화가 없기 때문에
  // 변경될 값이 없는 데 리액트의 기능으로 인해 리렌더링 될 때마다
  // getDiaryAnalysis가 실행된다. 이는 비효율 적이다.

  // 기존 콜백함수를 useMemo 함수로 감싸 useMemo 함수의 인자로 넣는다.
  // useMemo 함수는 첫번째 인자로 콜백함수를 받아서 콜백함수가 리턴하는 값.
  // 연산을 최적화 할 수 있도록 도와 준다.
  const getDiaryAnalysis = useMemo(
    () => {
      const goodCount = data.filter((it) => it.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;
      return { goodCount, badCount, goodRatio };
    },
    [data.length]
    // 2번째 인자. 2번째가 변화 할 때만 첫번째 인자의 콜백 함수가 다시 수행된다.
    // 수정시는 일기 분석을 안하고
    // 삭제시는 일기 분석 한다.
  );

  //useMemo를 사용하면 getDiaryAnalysis는 함수가 아니라 값이 된다.
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor2 onCreate={onCreate} />
      <div>전체일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
