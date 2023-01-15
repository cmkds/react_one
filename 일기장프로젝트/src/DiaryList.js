const DiaryList = ({ diaryList }) => {
  console.log(diaryList);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length} 개의 일기가 있습니다.</h4>
      {/* 다이어리 리스트의 길이가 얼마인지 {}안에 담아 표시 할 수 있다. */}

      <div>
        {diaryList.map((it) => (
          // 얘는 {}이아닌 ()로 감쌈.
          <div>
            <div>작성자 : {it.author}</div>
            <div>일기 : {it.content}</div>
            <div>감정 : {it.emotion}</div>
            <div>작성 시간(ms) : {it.created_date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
