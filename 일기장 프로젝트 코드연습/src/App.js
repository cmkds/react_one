import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo,
  useReducer,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

////////////////
//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "EDIT": {
      return state.map(it=>
        it.id === action.targetId ? {...it, content :action.newContent} : it)
    }
    case "REMOVE": {
      return state.filter(it => it.id !== action.targetId)

    }
    default:
      return state;
  }
};

////////////
//export
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

////////////////////////
//main
function App() {
  //useReducer
  const [data, dispatch] = useReducer(reducer, []);

  //////////
  //useRef
  const dataId = useRef(0);

  //////
  //API
  const getData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments").then(res=>res.json())
  
    const initData = res.slice(0, 20).map(it => {
      return {
        author : it.email,
        content: it.body,
        emotion: Math.floor(Math.random()*5) +1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      }
    })

    dispatch({ type:"INIT", data: initData});
  }
  //API mount 후 호출
  useEffect(() => {
    getData();
  }, []);


  ///////////////////////////
  //function
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  //
  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent)=> {
    dispatch({ type: "EDIT", targetId, newContent})
  }, []);

  //useMemo 함수 묶기
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);
  //////////////////////////

  //일기 분석
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter(it => it.emotion >=3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio}
  },[data.length]);

  //분석값 정의
  const { goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />
          <div>전체일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
