import ArticleHeader from "../Components/Article/ArticleHeader/ArticleHeader";
import BodySection from "../Components/Article/Section/BodySection";
import Header from "../Components/Header";
import TopicList from "../Components/Article/Topics/TopicList";
import TableOfContents from "../Components/Article/Section/TableOfContents";
//ONLY for displaying article components until we can construct the full page
export default function ArticleExample() {
  return (
    <>
      <Header />

      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          flexDirection: "column",
          padding: "0 1rem",
        }}
      >
        <div style={{ width: "100%" }}>
          <ArticleHeader
            title={"Intro to Machine Learning"}
            description={
              "Embark on a journey through the basics; explore what machine learning entails and how one can apply it in the real world."
            }
            author={"David Lam"}
            date={"October 29, 2023"}
          />
        </div>

        <div style={{ display: "flex", marginTop: "2rem" }}>
          <div
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <TableOfContents
              content_headings={[
                "Introduction to Machine Learning",
                "The Fundamentals of Machine Learning",
                "Types of Machine Learning Algorithms",
                "Real-World Applications of Machine Learning",
                "Challenges and Limitations in Machine Learning",
                "Ethical Considerations in Machine Learning",
                "Future Prospects and Developments in Machine Learning",
                "Conclusion and Key Takeaways",
              ]}
            />
            <BodySection
              title={"Introduction"}
              body={
                "Machine Learning has rapidly become a cornerstone of modern technological advancement, permeating various sectors and reshaping the way we perceive and interact with data. In this era of big data, understanding the basics of Machine Learning has become imperative for professionals across diverse fields, from business to healthcare and beyond. By harnessing the power of algorithms and data, Machine Learning enables systems to learn from experience and improve their performance over time without explicit programming.This introductory guide aims to provide a comprehensive overview of the fundamental concepts of Machine Learning, delving into its significance, various algorithms, real-world applications, challenges, ethical considerations, and the promising future it holds."
              }
            />
          </div>

          <div style={{ width: "30%" }}>
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
      </div>
    </>
  );
}
