import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { useContext, useEffect, useState } from "react";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);

  // 타이틀 바꾸기
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    // console.log(titleElement);
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  });

  //다이어리 리스트에서 아이디 값과 일치하는 아이디 값을 꺼내주기
  // eidt 컴포넌트가 마운트 됐을 때 수행한다.
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {/* 데이터가 있으면 다이어리 에디터를 렌더하도록함 */}
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
