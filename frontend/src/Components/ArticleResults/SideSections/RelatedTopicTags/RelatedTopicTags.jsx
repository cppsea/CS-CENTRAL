import "./RelatedTopicTags.scss";
import "../ArticleResultSideSection.scss";
//tags : array of tag objects
export default function RelatedTags({ tags }) {
  return (
    <div
      className="article-results-side-section"
      id="related-topic-tags-section"
    >
      <h3
        id="related-topic-tags-section-title"
        className="text-uppercase article-results-side-section-title"
      >
        Related Topics
      </h3>
      <div className="article-results-section-content related-topic-tags-container">
        {tags.map((tag) => {
          return (
            <span
              key={tag.label}
              id={tag.label + "-topic"}
              className="related-topic-tag"
            >
              {tag.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
