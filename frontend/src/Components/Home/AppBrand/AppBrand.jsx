import "./AppBrand.scss";
import BrandName from "./BrandName";

export default function AppTitle() {
  return (
    <>
      <div className="outer-app-title-container d-flex align-items-center gap-4">
        <div className="title-divider"></div>
        <BrandName />
        <div className="title-divider"></div>
      </div>
    </>
  );
}
