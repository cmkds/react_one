import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RouteTest from "./components/RouteTest";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary" element={<Diary />} />
          {/* 라우트 컴포넌트는 실질적으로 URL 경로와 컴포넌트를
          매핑시켜주는 컴포넌트이다. */}
        </Routes>
        <RouteTest />
        {/* <a href="{/new">NEW로 이동</a> */}
        {/* a태그를 이용한 페이지 이동은 MPA 방식이라
        리액트에서 이 방법을 사용하지 않을 것. 
        페이지 외부로 나가는 url을 사용할 때만 사용한다.*/}
      </div>
    </BrowserRouter>
  );
}

export default App;
