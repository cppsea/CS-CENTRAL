import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Article from "../Components/Article/Article.jsx";
import { useGetArticleByID } from "../hooks/useGetArticleByID.jsx";

export default function ArticleView() {
  const [article, setArticle] = useState();
  const { articleID = "" } = useParams();
  const { getArticleByID } = useGetArticleByID();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        let fetchedArticle = await getArticleByID(articleID);
        console.log(fetchedArticle);
        if (fetchedArticle) {
          setArticle(fetchedArticle);
        }
      } catch (err) {
        console.log(err);
        console.log("Error fetching article ");
      }
    };

    fetchArticle();
  }, [articleID]);
  return (
    <>
      {/*conditional rendering based on data being fetched*/}
      {article && <Article article={article} />}
    </>
  );
}
