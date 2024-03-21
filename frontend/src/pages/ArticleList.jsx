import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import RelatedTags from "../Components/ArticleResult/SideSections/RelatedTopicTags/RelatedTopicTags.jsx";

const dummy_topic_tags = [
  { label: "Deep Learning" },
  { label: "Artifical Intelligence" },
  { label: "Computer Vision" },
  { label: "Data Science" },
];
export default function ArticleList({}) {
  const [data, setData] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [specificArticle, setSpecificArticle] = useState();
  const titleQuery = searchParams.get("title");
  //console.log(titleQuery);

  useEffect(() => {
    fetch(`http://localhost:3002/api/articles/?title=${titleQuery}`)
      .then((res) => res.json().then((data) => setData(data)))
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
    </div>
  );
}
