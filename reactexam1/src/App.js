import './App.css';

function App() {

  let name ="이정환"
  //함수 안에 지역변수를 만든 후

  return (
    <div className="App">
      <header className="App-header">
      <h2>안녕 리액트 {name} </h2>
      {/* 중괄호를 써서 값을 집어넣으면 사용 할 수 있다.
      이렇게 js, html 을 합쳐서 사용 할 수 있는 문법을 jsx 라고 한다. */}

      </header>
    </div>
  );
}


export default App;
//새로운 ex 모듈 시스템을 사용하여 내보내는 기능
// 다른 파일에서 import해서 사용 할 수 있다.

//export default는 한개만 사용 할 수 있다.