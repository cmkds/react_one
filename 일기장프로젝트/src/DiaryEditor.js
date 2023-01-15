import {useState} from "react";


const DiaryEditor = () => {

  const [author, setAuthor] = useState("");
  
  const [content, setContent] = useState("")


  return <div className="DiaryEditor">
    <h2>오늘의 일기</h2>
    <div>
      <input
        name="author"
        value= {author} // input 의 value를 author로 지칭
        onChange= {(e) => { //onChange 이벤트. 이벤트 객체 e를 매개변수로 전달 받음. author의 변화를 감지하기 위한 함수
                            //onChange 는 값이 바뀌었을 때 수행 하는 이벤트. 값이 바뀌면 onChange 프롭에 전달한 콜백함수를 수행한다고 생각하면 된다.
          console.log(e.target.value); // 이벤트 객체의 값 출력
          console.log(e.target.name); // 이벤트 객체의 name 출력.
          setAuthor(e.target.value); //이벤트 객체의 값으로 setAuthor 실행.
      }}
      />
    </div>
    <div>
      <textarea
        value={content}
        onChange={e => {
          setContent(e.target.value);
        }}
        />
    </div>
  </div>;
}; 

export default DiaryEditor;