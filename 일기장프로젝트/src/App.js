import "./App.css";
import DiaryEditor2 from "./DiaryEditor2";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "김동수",
    content: "하이1",
    emotion: 5,
    created_date: new Date().getTime(), // new는 생성자를 생성 할 때 쓰인다. new로 시간 객체를 생성한 것.
    //Date.getTime()은 시간을 숫자로 반환해주는 함수.
  },
  {
    id: 2,
    author: "서동수",
    content: "하이2",
    emotion: 3,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "박동수",
    content: "하이3",
    emotion: 4,
    created_date: new Date().getTime(),
  },
  {
    id: 4,
    author: "이동수",
    content: "하이4",
    emotion: 2,
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor2 />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
