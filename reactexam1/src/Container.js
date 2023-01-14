const Container = ({children}) => {
  console.log(children)
  // Container는 children 이라는 props를 받는다.
  // 정확히 children 이라는 용어로 입력해야
  // Container이 등록된 App.js에서 Container로 감싼 하위의
  // 태그를 자식으로 받는다.
  return(  
  <div style={{margin:20, padding: 20, border: "1px solid gray"}}>
    {children}
  </div>
  );
};

export default Container;

