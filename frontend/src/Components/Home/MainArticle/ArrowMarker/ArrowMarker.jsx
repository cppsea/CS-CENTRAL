import "./ArrowMarker.scss";

export default function ArrowMaker() {
  return (
    <>
      <div className="d-inline-flex h-100 flex-row flex-nowrap">
        <div className="vertical-line me-2"></div>
        <div className="rectangle"></div>
        <div className="arrow-marker"></div>
      </div>
    </>
  );
}
