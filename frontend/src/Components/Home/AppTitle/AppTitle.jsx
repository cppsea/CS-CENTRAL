import "./AppTitle.scss";

export default function AppTitle() {
  return (
    <>
      <div className="d-flex align-items-center gap-4">
        <div className="title-divider"></div>
        <div className="d-flex align-items-center text-between-divider-light px-lg-4 fw-light">
          <span className="big-cs me-2">CS</span> Catalog
        </div>
        <div className="title-divider"></div>
      </div>
    </>
  );
}
