import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  // 날짜 표현을 위한 변수 설정. 알아보기 쉬운 년월일로 바꾸기
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  return (
    <div className="DiaryItem">
      {/* 이미지 스타일링 진행. 이미지를 네모 모양으로 변형시키기 위해 
      디비전의 백그라운드 속성을 변경해야 한다.
      감정에 따라서 동적으로 클래스 네임을 지정하기 위해.
      2개의 클래스네임을 설정 해주고 조인으로 묶어준다.
      {[]} 으로 묶어준다.*/}
      {/* <div className="emotion_img_wrapper"> */}
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
        ></img>
      </div>
      <div onClick={goDetail} className="info_wrapper">
        {/* 위에서 str로 바꾼 날짜 넣기 */}
        <div className="diary_date">{strDate}</div>
        {/* 내용이 길면 자르도록 slice 처리 */}
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;
