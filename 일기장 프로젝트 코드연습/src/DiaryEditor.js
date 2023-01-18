import React, { useState, useRef, useContext } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
  //Context Props
  const { onCreate } = useContext(DiaryDispatchContext);

  //useRef
  const authorInput = useRef();
  const contentInput = useRef();

  //useState
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  ////////////
  //함수

  //변동사항 state에 전달
  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  //제출
  const handleSubmit = () => {
    if (!state.author.length) {
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    //onCreate함수에 author, content, emotion 넣어서 실행시키기
    onCreate(state.author, state.content, state.emotion);
    alert("저장성공");

    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
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
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);
