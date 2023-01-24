import { useState } from "react";

//정렬을 위한 변수
const sortOptionList = [
  { value: "latest", name: "최신 순" },
  { value: "oldest", name: "오래된 순" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  // value는 컨트롤 메뉴가 셀렉트 하고 있는것
  // onChange는 셀렉트가 선택한게 변화했을 때 바꿀 기능
  // optionList는 셀렉트 태그 안에 들어갈 옵션
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

//home.js에서 월마다 갱신된 diaryList를 props로 받음
const DiaryList = ({ diaryList }) => {
  //정렬용 state
  const [sortType, setSortType] = useState("lastest");

  //최신순 대로 데이터 정렬
  const getProcessedDiaryList = () => {
    //비교용 함수.
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    //빠른 얕은 복사를 위해 Json으로 만들었다가 다시 파싱.
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {/* 정렬된 리스트를 화면에 보여줌 */}
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
