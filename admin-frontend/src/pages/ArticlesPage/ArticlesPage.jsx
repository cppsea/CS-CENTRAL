import ArticlesList from "../../Components/ListView/ArticlesList";
import ArticleSearchBar from "../../Components/SearchBar/ArticleSearchBar";
import { useState, useEffect } from "react";
import { useSearchArticles } from "../../hooks/useSearchArticles";
import { useSearchParams } from "react-router-dom";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const { searchArticles } = useSearchArticles();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = {
      id: searchParams.get("id") ? parseInt(searchParams.get("id")) : null,
      author_id: searchParams.get("author_id")
        ? parseInt(searchParams.get("author_id"))
        : null,
      title: searchParams.get("title") || null,
    };
    (async () => {
      const results = await searchArticles(query);
      setArticles(results?.articles || []);
    })();
  }, [searchParams]);

  const handleSearch = (results, paramsObject) => {
    setArticles(results?.articles || []);

    const cleanParams = {};
    for (const [key, value] of Object.entries(paramsObject)) {
      if (value !== null && value !== "") {
        cleanParams[key] = value;
      }
    }
    setSearchParams(cleanParams);
  };

  return (
    <>
      <ArticleSearchBar onSearch={handleSearch} />
      <ArticlesList articles={articles} setArticles={setArticles} />
    </>
  );
}
