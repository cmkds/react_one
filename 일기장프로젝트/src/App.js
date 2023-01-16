import { useEffect, useRef, useState } from "react";
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
  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res)=> res.json())
    //res를 0~19까지 자름
    //여기선 api를 우리가 만든 일기 툴에 넣기 위해 map을 이용
    const initData = res.slice(0,20).map((it)=>{
      return {
        
        author :it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5)+1,
        //자바스크립트의 내장 객체 사용.
        // Math.random()은 0~1까지 랜덤 난수 생성
        // Math.floor() 소수점을 전부 버려주는 함수
        created_date : new Date().getTime(),
        id : dataId.current++ // dataId를 현재 current값으로 넣고 나서 1증가
      }
    })

    setData(initData)
  }

  // API 를 호출하는 getData 함수를 마운트 되자마자 호출하기
  useEffect(()=> {
    getData()
  }, [])



  const onCreate = (author, content, emotion) => {
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
      //id 값은 useRef로 설정한 dataId.current 값으로 해주고
    };
    dataId.current += 1;
    //dataId.current의 값을 1 증가 시켜 준다.
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    // console.log(`${targetId}가 삭제되었습니다.`)
    const newDiaryList = data.filter((it) => it.id !== targetId);
    // console.log(newDiaryList)
    setData(newDiaryList);
  };

  //state는 App에 있으므로
  //수정 함수는 App.js에 작성한다.
  const onEdit = (targetId, newContent) => {
    setData(
      //map을 이용해서 data를 전부 확인하고 tartgetId와 같을 때 content를 newContent로 변경해주는 코드
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };


  const getDiaryAnalysis = () =>{
    console.log("일기 분석 시작")

    const goodCount = data.filter((it) => it.emotion >=3).length
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100
    return {goodCount, badCount, goodRatio}
  }

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis();

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
