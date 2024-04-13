import "./NumberArrowMarker.scss";

export default function NumberArrowMarker({ number }) {
  return (
    <>
      <div className="popular-arrow-marker-point">
        <div className="popular-article-number">{number}</div>
      </div>
    </>
  );
}
