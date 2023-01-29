import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";

// 해더와 버튼 임포트
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  console.log(diaryList);

  //월별로 일기를 가공해서 관리하기 위해서 쓰는 코드

  const [data, setData] = useState([]);

  // 날짜를 입력하기 위핸 useState
  const [curDate, setCurDate] = useState(new Date());

  // Date 객체의 시간의 연도 가져오기
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  /////
  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      // console.log(new Date(firstDay));//현재월의 첫날을 firstDay로 가진다.

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
        //월을 한달 뒤로 보낸다음에 일을 0으로 한다.
      ).getTime();
      // console.log(new Date(lastDay)); 해당월 말일이 나옴

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
        //firtDay와 lastDay 사이
      );
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  // 날짜 1달씩 증가 시키는 함수
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  // 날짜 1달씩 감소 시키는 함수
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />

      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
