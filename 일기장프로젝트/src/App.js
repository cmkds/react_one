import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo,
  useReducer,
} from "react";
import "./App.css";
import DiaryEditor2 from "./DiaryEditor2";
import DiaryList from "./DiaryList";

// reducer 함수는 별도의 함수가 있는게 아니라 우리가 만들어 줘야한다.
// useState대신 useReducer을 사용하는 이유는
// 복잡한 상태변화 로직을 컴포넌트 밖으로 분리하기 위함.
// 그래서 컴포넌트 밖에 reducer 함수를 만들어 준다.

const reducer = (state, action) => {
  //파라미터는 2개 (상태변화직전의 state, 어떤 상태변화를 일으켜야 하는지 정보가 담겨있는 action 객체)
  switch (action.type) {
    case "INIT": {
      return action.data;
      //왜 action.data냐
      //getData 함수에서 dispatch를 일으켰을 때 type을  INIT으로 전달하면서
      //어떤 데이터로 초기화 할것이냐를 지칭하는 data 프로퍼티에 initData를
      //넣어 놨기 때문에
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
    //default 일때는 아무것도 동작 안하도록 state를 다시 준다.
  }
};

//context 만듦.
//context도 export해줘야 다른 컴포넌트들이 context에 접근해서 사용할 수 있다.
//export하는 이유?
// export default는 파일하나당 하나밖에 쓸 수 없다.
export const DiaryStateContext = React.createContext();

export const DiaryDispatchContext = React.createContext();

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);

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

    // setData(initData);
    dispatch({ type: "INIT", data: initData });
    //reducer는 액션 객체를 받는데 액션의 타입은 INIT 이고 액션에 필요한 data는
    // initData 이다.
  };

  // API 를 호출하는 getData 함수를 마운트 되자마자 호출하기
  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    //data는 newItem을 그대로 전달하면 된다.

    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  //useMemo 활용해서 함수 묶어주기
  //절대 재생성될 일이 없도록 2번째 인자에 []을 넣어준다.
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
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
    // Context적용하기
    // 리턴부분의 최상위 태그를 바꿔준다.
    // 만든 Context명.Provider로

    //데이터 내려주기. value라는 프롭으로 데이터를 내려줘야한다.
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor2 />
          <div>전체일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
