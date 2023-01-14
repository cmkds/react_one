import {useState} from "react";


const DiaryEditor = () => {

  const [author, setAuthor] = useState("김동수");

  return <div className="DiaryEditor">
    <h2>오늘의 일기</h2>
    <div>
      <input
        name="author"
        value= {author} // input 의 value를 author로 지칭
        onChange= {(e) => { //author의 변화를 감지하기 위한 함수
          console.log(e.target.value);
          console.log(e.target.name);
          setAuthor(e.target.value);
      }}
      />
    </div>
  </div>;
}; 

export default DiaryEditor;