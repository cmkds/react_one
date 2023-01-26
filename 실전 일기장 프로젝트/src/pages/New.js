import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

// 날짜를 String으로 표현하기 위한 변수
// date객체의 toISOString은 ISO 형식의 문자열을 반환한다.
// YYYY-MM-DDTHH:mm:ss.sssZ 형식. 0~10으로 끊으면  연-월-일 까지 표시 된다.
const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const New = () => {
  // 날짜 정보 저장을 위한 State
  const [date, setDate] = useState();

  const navigate = useNavigate();

  return (
    <div>
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />

      <div>
        {/* section 태그는 div와 똑같지만 의미를 가지는 시맨틱 태그 */}
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input-box">
            {/* input type=date는 날짜 선택을 제공하는 html 태그이다 */}
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default New;
