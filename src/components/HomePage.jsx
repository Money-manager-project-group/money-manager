const HomePage = () => {
  return (
    <div>
      <h1 className="font-sans-serif font-bold text-3xl px-4 py-10">
        React 가계부
      </h1>
      <h3 className="font-sans font-semibold text-2xl px-5 py-8">기능</h3>
      <ul>
        <li className="text-xl px-10 py-3">
          - 수입 및 지출 추적 (가계부 기능) [CRUD]
        </li>
        <li className="text-xl px-10 py-3">
          - 캘린더 또는 목록에서 거래 내역 보기 [Context, 커스텀 훅]
        </li>
        <li className="text-xl px-10 py-3">
          - 세션에서 벗어나도 로컬에서 유지되는 기록 [local storage]
        </li>
        <li className="text-xl px-10 py-3">
          - 상단의 네비게이션 바를 통해 원하는 기능으로 이동 [React Router]
        </li>
        <li className="text-xl px-10 py-3">
          - 직관적이고 깔끔한 디자인 [Tailwind CSS]
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
