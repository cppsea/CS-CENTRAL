import "./ArrowMarker.scss";

//IMPORTANT: will expand to fit container, so size this using container
export default function ArrowMarker() {
  return (
    <div className="arrow-marker">
      <div className="arrow-marker-base"></div>
      <div className="arrow-marker-gap"></div>
      <div className="arrow-marker-point"></div>
    </div>
  );
}
