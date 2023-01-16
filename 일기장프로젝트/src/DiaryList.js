import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList, onRemove, onEdit }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length} 개의 일기가 있습니다.</h4>
      {/* 다이어리 리스트의 길이가 얼마인지 {}안에 담아 표시 할 수 있다. */}

      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onRemove={onRemove} onEdit={onEdit} />
          // 다이어리 아이템은 데이터를 모두 받아서 렌더링 해야 한다.
          // 리스트의 아이템 이기 때문에 key를 전달해줘야 한다.
          // 모든 데이터는 스프레드 연산자를 통해서 전달해준다.
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
