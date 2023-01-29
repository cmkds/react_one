import DiaryEditor from "../components/DiaryEditor";
import { useEffect } from "react";
const New = () => {
  // 타이틀 바꾸기
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    // console.log(titleElement);
    titleElement.innerHTML = `감정 일기장 - 새일기 쓰기`;
  });
  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
