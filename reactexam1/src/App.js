// import React from 'react'
// import './App.css';
import Counter from "./Counter"

import MyHeader  from './MyHeader';
import Container from './Container'


function App() {

  const counterProps = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
  }

  return(
    <Container>
      <div>
        <MyHeader/>
        <Counter {...counterProps} />
      </div>
    </Container>
  );
}


export default App;
