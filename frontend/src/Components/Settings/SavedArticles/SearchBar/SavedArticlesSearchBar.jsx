import { Search } from "react-bootstrap-icons";
import "./SavedArticlesSearchBar.scss";
import { Form } from "react-bootstrap";
export default function SavedArticlesSearchBar({
  textState,
  setText,
  searchHandler,
}) {
  const onChangeHandler = (e) => {
    const { value } = e.target;
    setText(value);
  };
  return (
    <div className="saved-articles-search-bar-container">
      <Form.Control
        className="saved-articles-search-bar"
        placeholder="Search article(s)"
        onChange={onChangeHandler}
        value={textState}
        id="saved-article-searchbar"
      />
      <Search
        id="saved-article-search-button"
        className="saved-articles-search-icon"
        onClick={searchHandler}
      />
    </div>
  );
}
