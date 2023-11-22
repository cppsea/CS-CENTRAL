import ArticleHeader from "../Components/Article/ArticleHeader/ArticleHeader";
import BodySection from "../Components/Article/BodySection";
import RelatedTopicsList from "../Components/Article/Topics/RelatedTopicsList";
import Header from "../Components/Header";

//dummy data for related topics list
const relatedTopicsList = [
  {
    topicCategory: "FOUNDATIONAL CONCEPTS",
    topicList: [
      {
        topic:
          "Artificial Intelligence (AI) and its Intersection with Machine Learning",
        link: "/",
      },
      {
        topic: "Data Preprocessing and Feature Engineering in Machine Learning",
        link: "/",
      },
    ],
  },
  {
    topicCategory: "TYPES OF MACHINE LEARNING",
    topicList: [
      {
        topic:
          "Supervised, Unsupervised, and Reinforcement Learning Techniques",
        link: "/",
      },
      {
        topic: "Deep Learning and Neural Networks",
        link: "/",
      },
      {
        topic: "Natural Language Processing (NLP) and Machine Learning",
        link: "/",
      },
    ],
  },
  {
    topicCategory: "APPLICATIONS",
    topicList: [
      {
        topic: "Machine Learning in Business and Marketing",
        link: "/",
      },
      {
        topic: "Machine Learning in Healthcare and Biotechnology",
        link: "/",
      },
      {
        topic: "The Role of Machine Learning in Automation and Robotics",
        link: "/",
      },
    ],
  },
];
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

        <div
          style={{
            display: "flex",
            marginTop: "2rem",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "60%" }}>
            <BodySection
              title={"Introduction"}
              body={
                "Machine Learning has rapidly become a cornerstone of modern technological advancement, permeating various sectors and reshaping the way we perceive and interact with data. In this era of big data, understanding the basics of Machine Learning has become imperative for professionals across diverse fields, from business to healthcare and beyond. By harnessing the power of algorithms and data, Machine Learning enables systems to learn from experience and improve their performance over time without explicit programming.This introductory guide aims to provide a comprehensive overview of the fundamental concepts of Machine Learning, delving into its significance, various algorithms, real-world applications, challenges, ethical considerations, and the promising future it holds."
              }
            />
          </div>

          <div style={{ width: "35%" }}>
            <RelatedTopicsList topicLists={relatedTopicsList} />
          </div>
        </div>
      </div>
    </>
  );
}
