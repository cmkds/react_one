import "./App.css";
import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  // {
  //   id: 1,
  //   emotion: 1,
  //   content:
  //     "오늘의 일기 1번 먀ㅣ럳먀더 ㄻ덜 ㅣ먿 ㄹ먿;ㅁ디ㅏ러 ㅁ다리ㅓ ㅁ다ㅣㅓㄹ ㅁ더;리ㅏ먿 ㅁ러듀;ㅣ러 ㅁ다ㅣ러 ㅁ젇라ㅓㅁㅈㄷ;라ㅓ",
  //   date: 1674562583205,
  // },
  // {
  //   id: 2,
  //   emotion: 2,
  //   content: "오늘의 일기 2번",
  //   date: 1674562583206,
  // },
  // {
  //   id: 3,
  //   emotion: 3,
  //   content: "오늘의 일기 3번",
  //   date: 1674562583207,
  // },
  // {
  //   id: 4,
  //   emotion: 4,
  //   content: "오늘의 일기 4번",
  //   date: 1674562583208,
  // },
  // {
  //   id: 5,
  //   emotion: 5,
  //   content: "오늘의 일기 5번",
  //   date: 1674562583209,
  // },
];

function App() {
  // 로컬 스토리지에 데이터 넣기
  useEffect(() => {
    // localStorage.setItem("item1", 10);
    // localStorage.setItem("item2", "20");
    // // JSON으로 직렬화 시켜줘야함
    // localStorage.setItem("item3", JSON.stringify({ value: 30 }));
    // 로컬스토리지에서 데이터 가져오기
    // const item1 = localStorage.getItem("item1");
    // const item2 = localStorage.getItem("item2");
    // // JSON 을 다시 객체로 만들기.
    // const item3 = JSON.parse(localStorage.getItem("item3"));
    // console.log({ item1, item2, item3 });
  }, []);

  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      dataId.current = parseInt(diaryList[0].id) + 1;

      console.log(diaryList);
      console.log(dataId);

      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);

  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
