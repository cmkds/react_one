import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log("id: ", id);

  const mode = searchParams.get("mode");
  console.log("mode: ", mode);
  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정 페이지 입니다.</p>
      <button onClick={() => setSearchParams({ who: "김동수" })}>
        QS 바꾸기
      </button>

      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        홈으로 이동
      </button>

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
