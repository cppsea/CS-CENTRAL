import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Article from "../../Components/Article/Article.jsx";
import { useGetArticleByID } from "../../hooks/useGetArticleByID.jsx";

export default function ArticleView() {
  const [article, setArticle] = useState();
  const params = useParams();
  const { getArticleByID } = useGetArticleByID();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        let fetchedArticle = await getArticleByID(params.articleID);
        console.log("Fetched article:", fetchedArticle);

        if (fetchedArticle) {
          setArticle(fetchedArticle);
        }
      } catch (err) {
        console.log(err);
        console.log("Error fetching article ");
      }
    };

    fetchArticle();
  }, [params.articleID]);
  return (
    <>
      {/*conditional rendering based on data being fetched*/}
      {article && <Article article={article} />}
    </>
  );
}
