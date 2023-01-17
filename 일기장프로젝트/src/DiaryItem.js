import React, { useEffect, useState, useRef } from "react";
const DiaryItem = ({
  onEdit,
  onRemove,
  author,
  content,
  emotion,
  created_date,
  id,
}) => {
  useEffect(() => {
    console.log(`${id}번 째 아이템 렌더!`);
  });

  //수정하기를 하기 위해서
  //DiaryItem에 State를 만들어 준다.
  //기본 값으로는 false를 넣어준다.
  //현재 수정 중인지 아닌지를 확인하기 위함.
  //수정 중이면 수정화면이 뜨도록하고 수정 중이 아니면 정상 화면이 뜨도록 한다.
  const [isEdit, setIsEdit] = useState(false);

  //toggleIsEdit은 호출되면 setIsEdit을 실행시켜 isEdit의 값을 반전시키는 코드로 작성
  const toggleIsEdit = () => setIsEdit(!isEdit);

  //수정 시에 새로 작성한 값을 담을 State
  const [localContent, setLocalContent] = useState(content);
  // 수정 시에 원래 값을 담아 주시 위해서 userState의 초기값을 content로 설정

  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  //수정 취소 눌렀을 때 함수
  const handleQuitEdit = () => {
    setIsEdit(false); //setIsEdit을 false로 바꿔준다.
    setLocalContent(content); //localContent를 기존의 content로 바꿔준다.
  };

  // 수정 완료 버튼 눌렀을 때
  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까? `)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="author_info">
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {/* 수정중일 때 content가 달라지도록 코드 변경 */}
        {isEdit ? (
          // 수정 중 일 때
          <>
            <textarea
              ref={localContentInput} //ref로 가르키기 위함
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          //수정 중이 아닐 때
          <>{content}</>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          {" "}
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}

      {/* 수정하기 버튼을 누르면 toggleIsEdit 함수 실행 하도록 함 */}
    </div>
  );
};

export default React.memo(DiaryItem);
