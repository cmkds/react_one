import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor2 from "./DiaryEditor2";
import DiaryList from "./DiaryList";
import Lifecycle from "./Lifecycle";

// const dummyList = [
//   {
//     id: 1,
//     author: "김동수",
//     content: "하이1",
//     emotion: 5,
//     created_date: new Date().getTime(), // new는 생성자를 생성 할 때 쓰인다. new로 시간 객체를 생성한 것.
//     //Date.getTime()은 시간을 숫자로 반환해주는 함수.
//   },
//   {
//     id: 2,
//     author: "서동수",
//     content: "하이2",
//     emotion: 3,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "박동수",
//     content: "하이3",
//     emotion: 4,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 4,
//     author: "이동수",
//     content: "하이4",
//     emotion: 2,
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  const [data, setData] = useState([]);
  //일기 데이터를 넣을 것이기 때문에 useState는 배열로 초기값 설정.

  const dataId = useRef(0);

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

  return (
    <div className="App">
      <Lifecycle />

      <DiaryEditor2 onCreate={onCreate} />
      {/* onCreate 함수를 diaryEditor의 프롭으로 내려줌 */}
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
      {/* DiaryItem에서 ondelete를 실행시키기 위해서 DiaryList에 프롭스로 보내준다. */}
    </div>
  );
}

export default App;
