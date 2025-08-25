const Home = () => {
  return (
    <div>
      <h1 className="font-sans-serif font-bold text-3xl px-4 py-10">
        React 가계부
      </h1>
      <h3 className="font-sans font-semibold text-2xl px-5 py-8">기능</h3>
      <ul>
        <li className="text-xl px-10 py-3">✔수입 및 지출 추적. (CRUD)</li>
        <li className="text-xl px-10 py-3">
          ✔캘린더 또는 목록에서 거래 내역 보기.
        </li>
        <li className="text-xl px-10 py-3">✔지출 내역 통계 확인</li>
        <li className="text-xl px-10 py-3">
          ✔브라우저 Local storage를 활용한 저장
        </li>
        <li className="text-xl px-10 py-3">
          ✔상단의 네비게이션 바를 통해 원하는 기능으로 이동!
        </li>
      </ul>
    </div>
  );
};

export default Home;