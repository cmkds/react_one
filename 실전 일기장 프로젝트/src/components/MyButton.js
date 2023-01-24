const MyButton = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  //type이 정해둔 값으로 안들어 오는 경우 default를 전달하는 코드

  return (
    <button
      // join을 이용해서 클래스 네임 2개를 전달.
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

//타입이 없는 경우 default 전달.
MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
