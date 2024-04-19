import "./AppBrand.scss";

export default function BrandName({ color }) {
  return (
    <>
      <div className="app-title-container align-items-center text-between-divider-light px-lg-4 fw-light">
        <div style={{ color: color }} className="big-cs">
          CS
        </div>
        <div style={{ background: color }} className="horizontal-bar"></div>
        <div style={{ color: color }} className="central-bottom-title">
          Central
        </div>
      </div>
    </>
  );
}
