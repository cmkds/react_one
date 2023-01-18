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
    case "": {
      return;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
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

  const onEdit = useCallback((targetId, newContent));

  //useMemo 함수 묶기
  const memoizedDispatches = useMemo(() => {
    return { onCreate };
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />

          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
