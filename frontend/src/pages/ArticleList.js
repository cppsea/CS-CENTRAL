import ArticleCard from "../Components/ArticleCard";
import ML_logo from "../assets/ml_brain.jpg";

export default function ArticleList({ title, children, width, height, fluid }) {
  let top = 0;
  return (
    <>
      <Stack gap={3}>
        <div>
          <Header />
        </div>
        <div className="position-absolute w-100 pb-2" style={{ top: top = top + 100 }}>
          <DescriptionBox
            title={title}
            imgSrc={ML_logo}
            width={width}
            height={height}
            fluid={fluid}
          >
            {children}
          </DescriptionBox>
        </div>
      </Stack>
    </>
  );
}
