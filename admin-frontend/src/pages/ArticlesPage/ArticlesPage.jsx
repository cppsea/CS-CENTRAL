import ArticlesList from "../../Components/ListView/ArticlesList";
import ArticleSearchBar from "../../Components/SearchBar/ArticleSearchBar";
import { useState, useEffect } from "react";
import { useSearchArticles } from "../../hooks/useSearchArticles";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const { searchArticles } = useSearchArticles();

  useEffect(() => {
    (async () => {
      const results = await searchArticles({
        username: null,
        first_name: null,
        last_name: null,
        id: null,
        email: null,
      });
      setArticles(results?.articles || []);
    })();
  }, []);

  return (
    <>
      <ArticleSearchBar
        onSearch={(results) => setArticles(results.articles || [])}
      />
      <ArticlesList articles={articles} />
    </>
  );
}
