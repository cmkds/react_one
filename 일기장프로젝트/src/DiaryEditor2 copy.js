import { useRef, useState } from "react";


const DiaryEditor2 = ({onCreate}) => {
//props으로 전달 받은 onCreate 작성
  const authorInput = useRef();
  const contentInput = useRef();
  // useRef()를 사용하면 그 값은 React.MutableRefObject에 저장되는데 htmlDOM 요소에 접근하는 기능을 한다.
  // 돔요소를 선택하는 레퍼턴스 객체이다.

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  ///
  const handleChangeState = (e) => {
    console.log(e.target.name); //onChange 이벤트가 발생한 타겟의 네임이 출력되는 것을 확인
    console.log(e.target.value); // onChange 이벤트가 발생한 타겟의 값이 출력되는 것을 확인.
    setState({
      ...state,
      [e.target.name]: e.target.value, // 괄호 표기법으로 써야함!!!!!!
      // js는 객체의 ket값을 어떤 객체의 값으로 쓸 때 [] 로 묶어줘서 써야한다.
    });
  };

  const handleSubmit = () => {
    if (!state.author.length) {
      //focus
      authorInput.current.focus(); //포커스가 이동하도록 하는 기능.
      //현재 가르키는 값을 프로퍼티로 불러와 사용한다.

      return; //리턴을 하면 더이상 코드가 실행되지 않고 끝난다.
    }
    if (state.content.length < 5) {
      //focus
      contentInput.current.focus();

      return;
    }
    console.log(state);
    alert("저장성공");
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

export default DiaryEditor2;
