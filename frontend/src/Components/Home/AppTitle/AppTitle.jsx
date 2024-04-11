import "./AppTitle.scss";

export default function AppTitle() {
  return (
    <>
      <div className="outer-app-title-container d-flex align-items-center gap-4">
        <div className="title-divider"></div>
        <div className="app-title-container align-items-center text-between-divider-light px-lg-4 fw-light">
          <div className="big-cs">CS</div>
          <div className="horizontal-bar"></div>
          <div className="central-bottom-title">Central</div>
        </div>
        <div className="title-divider"></div>
      </div>
    </>
  );
}
