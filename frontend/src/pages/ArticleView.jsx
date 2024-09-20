import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Article from "../Components/Article/Article.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

export default function ArticleView() {
  const [article, setArticle] = useState();
  const { name = "" } = useParams();

  useEffect(() => {
    const authUser = localStorage.getItem("user");

    const user = (authUser ? JSON.parse(authUser):undefined);

    fetch(`http://localhost:3002/api/articles/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (user ? `Bearer ${user.token}` : undefined),
      },
    })
      .then((res) =>
        res.json().then((data) => {
          let article = data[0];
          article.isBookmarked = (article.isBookmarked ? article.isBookmarked : false);
          console.log(data);
          setArticle(article);
        })
      )
      .catch((error) => {
        console.error("error fetching data");
      });
  }, [name]);
  return (
    <>
      {/*conditional rendering based on data being fetched*/}
      {article && <Article article={article} />}
    </>
  );
}
