import SectionHeader from "../Components/Article/SectionHeader";
import Header from "../Components/Header";

//ONLY for displaying article components until we can construct the full page
export default function ArticleExample() {
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "3rem 0",
        }}
      >
        <SectionHeader header={"Table Of Contents"} />
      </div>
    </>
  );
}
