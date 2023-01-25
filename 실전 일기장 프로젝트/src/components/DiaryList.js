import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

//정렬을 위한 변수
const sortOptionList = [
  { value: "latest", name: "최신 순" },
  { value: "oldest", name: "오래된 순" },
];

// 감정 필터링에 사용할 필터 옵션
const filterOptionList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정 만" },
  { value: "bad", name: "안 좋은 감정 만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  // value는 컨트롤 메뉴가 셀렉트 하고 있는것
  // onChange는 셀렉트가 선택한게 변화했을 때 바꿀 기능
  // optionList는 셀렉트 태그 안에 들어갈 옵션
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
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
  // useNavigate()함수를 이용해서 navigate 호출
  const navigate = useNavigate();

  //정렬용 state
  const [sortType, setSortType] = useState("latest");
  //감정 상태를 저장할 filterState
  const [filter, setFilter] = useState("all");

  //최신순 대로 데이터 정렬
  const getProcessedDiaryList = () => {
    // 감정으로 필터링 하기 위한 콜백함수
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    //비교용 함수.
    const compare = (a, b) => {
      if (sortType === "latest") {
        // 문자열이 들어올 수 도 있기 때문에 parseInt 로 형변환 해줌.
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    //빠른 얕은 복사를 위해 Json으로 만들었다가 다시 파싱.
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // 감정에 따른 필터 적용
    const filteredList =
      // return ture를 반환하는 애들만 리턴을 해라.
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col ">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />{" "}
        </div>
      </div>

      {/* 리액트 돔이아니라 온클릭 이벤트라서 페이지 이동을 하려면 
      리액트의 기능을 이용해야한다
      리액트 라우터 돔의 useNavigate 이용 */}

      {/* 정렬된 리스트를 화면에 보여줌 */}
      {getProcessedDiaryList().map((it) => (
        // <div key={it.id}>
        //   {it.content} {it.emotion}
        // </div>

        // div를 다이어리 아이템으로 대체

        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
