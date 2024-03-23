import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import RelatedTags from "../Components/ArticleResult/SideSections/RelatedTopicTags/RelatedTopicTags.jsx";
import ArticleResultsList from "../Components/ArticleResults/ArticleResultsList.jsx";
const dummy_topic_tags = [
  { label: "Deep Learning" },
  { label: "Artifical Intelligence" },
  { label: "Computer Vision" },
  { label: "Data Science" },
];
const dummmy_articles = [
  {
    id: 1,
    image:
      "https://emeritus.org/in/wp-content/uploads/sites/3/2023/03/types-of-machine-learning.jpg.optimal.jpg",
    title: "Machine Learning in Business and Marketing",
    author: "Jeff",
    date: "October 24, 2023",
    isBookmarked: true,
  },
  {
    id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8QfYW-Re6kMIo_i9D5x4KUHVStLYWGuK4vg&usqp=CAU",
    title: "Intro to Machine Learning",
    author: "Darren",
    date: "October 24, 2023",
    isBookmarked: false,
  },
];

export default function ArticleList({}) {
  const [articles, setArticles] = useState(dummmy_articles);
  const [searchParams, setSearchParams] = useSearchParams();
  const [specificArticle, setSpecificArticle] = useState();
  const titleQuery = searchParams.get("title");
  //console.log(titleQuery);

  //bookmark toggler creator function, returns function that toggles bookmark for certain id
  const bookmarkTogglerCreator = (id) => () => {
    let articleIndex = articles.findIndex((article) => article.id === id);
    if (articleIndex !== -1) {
      const newArticles = [...articles];
      newArticles[articleIndex].isBookmarked =
        !newArticles[articleIndex].isBookmarked;
      setArticles(newArticles);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3002/api/articles/?title=${titleQuery}`)
      .then((res) => res.json().then((data) => setArticles(data)))
      .catch((error) => {
        console.error("error fetching data");
      });

    /**     if(data && data.length > 0 ){
        const specificArticleId = data[0].id;
      fetch(`http://localhost:3002/api/articles/${specificArticleId}`)
        .then((res) => res.json())
        .then((specificArticle) => {
          setSpecificArticle(specificArticle);
          console.log("Specific article:", specificArticle);
        })
        .catch((error) =>{
          console.error("error fetching specific article");
        });
      } */
  }, [titleQuery, setSearchParams]);

  const { id } = useParams();

  /* const fetchArticle = async () => {
    fetch(`http://localhost:3002/api/articles/?title=${titleQuery}`)
    .then((res) => res.json())
    .then((data) => {
      setData(data);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching item data:", error);
    });
  } */

  return (
    <div className="flex-grow-1">
      <RelatedTags tags={dummy_topic_tags} />
      <ArticleResultsList
        articles={dummmy_articles}
        bookmarkTogglerCreator={bookmarkTogglerCreator}
      />
    </div>
  );
}
