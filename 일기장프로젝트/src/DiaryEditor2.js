import React, { useEffect, useRef, useState } from "react";

const DiaryEditor2 = ({ onCreate }) => {
  useEffect(() => {
    console.log("DiaryEditor 렌더");
  });

  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!state.author.length) {
      authorInput.current.focus();

      return;
    }
    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    // 여기서 onCreate()함수를 실행시키고 파라미터에 state에서 해당 값을 넣어준다.
    console.log(state);
    alert("저장성공");

    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor2">
      <h2>오늘의 일기</h2>

      {/* 인풋 텍스트 */}
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>

      {/* 텍스트 에이리어 */}
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>

      {/* 점수 버튼 */}
      <div>
        <span>오늘의 감정점수 : </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      {/* 저장하기 버튼 */}
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor2);
