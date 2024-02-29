import "./ArrowMarker.scss";

//IMPORTANT: will expand to fit container, so size this using container
export default function ArrowMarker() {
  return (
    <div className="settings-arrow-marker">
      <div className="settings-arrow-marker-base"></div>
      <div className="settings-arrow-marker-gap"></div>
      <div className="settings-arrow-marker-point"></div>
    </div>
  );
}
