import SavedArticleItem from "../../Settings/SavedArticles/SaveArticleItem/SavedArticleItem";
import "./RecentArticles.scss";

import ai_computing from "../../../assets/Article_Images/ai_computing.png";
import devin_ai from "../../../assets/Article_Images/devin_ai.png";
import ai_in_business from "../../../assets/Article_Images/ai_in_business.png";
import quantum from "../../../assets/Article_Images/quantum.png";
import ai_brain from "../../../assets/ml_brain.jpg";
import { useEffect, useState } from "react";

export default function RecentArticles() {
  const recent_articles = [
    {
      id: 0,
      title: "Devin AI - World's First AI Software Engineer",
      article_img: devin_ai,
    },
    {
      id: 1,
      title: "Deep Learning and Neural Networks",
      article_img: ai_brain,
    },
    {
      id: 2,
      title: "Supervised, Unsupervised, and Reinforcement Learning Techniques",
      article_img: ai_computing,
    },
    {
      id: 3,
      title: "Machine Learning in Business and Marketing",
      article_img: ai_in_business,
    },
    {
      id: 4,
      title: "Quantum Computing",
      article_img: quantum,
    },
  ];

  //array all the articles currently not deleted
  const [articles, setArticles] = useState([]);

  //the state of the articles of whether they are being deleted or not, is object, key = article id, value = whether it is selected orn ot
  const [isDeletedArticles, setIsDeletedArticles] = useState({});

  //toggler of selected state for a specific article
  //this returns a FUNCTION that toggles an article's state with the provided id
  const articleToggleHandler = (id) => () =>
    setIsDeletedArticles((prevArticles) => {
      return { ...prevArticles, [id]: !prevArticles[id] };
    });

  //use effect to get articles upon page load once, also init selected state of every article as false
  //just simulating retrieving articles
  useEffect(() => {
    let initArticles = async () => {
      let retrieved_articles = await recent_articles;
      setArticles(retrieved_articles);

      let initIsDeletedArticles = {};
      retrieved_articles.forEach(({ id }) => {
        initIsDeletedArticles[id] = false;
      });
      setIsDeletedArticles(initIsDeletedArticles);
    };

    initArticles();
  }, []);

  return (
    <>
      <div>
        <div className="articles-divider mt-4 mb-3"></div>
        <h3 className="fw-medium">Recent Articles</h3>
        <div className="d-flex flex-wrap gap-5">
          {recent_articles.map((article) => (
            <SavedArticleItem
              key={article.id}
              articleTitle={article.title}
              articleImg={article.article_img}
              toBeDeleted={isDeletedArticles[article.id]}
              deleteToggler={articleToggleHandler(article.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
