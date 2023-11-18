import SectionHeader from "../Components/Article/SectionHeader";
import TopicList from "../Components/Article/Topics/TopicList";
import Header from "../Components/Header";

//ONLY for displaying article components until we can construct the full page
export default function ArticleExample() {
  return (
    <>
      <Header />
      <div
        style={{ display: "flex", justifyContent: "center", padding: "3rem 0" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "30%",
          }}
        >
          <TopicList
            topicCategory={"Foundational Concepts"}
            topicList={[
              {
                topic:
                  "Artificial Intelligence (AI) and its Intersection with Machine Learning",
                link: "/",
              },
              {
                topic:
                  "Data Preprocessing and Feature Engineering in Machine Learning",
                link: "/",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
